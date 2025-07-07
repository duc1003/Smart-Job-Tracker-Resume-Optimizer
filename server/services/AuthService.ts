import id from "zod/v4/locales/id.js";
import { IUser } from "../interfaces/IUser";
import UserSchema from "../models/User.model";
import { Document } from 'mongoose';

// Define a type for a Mongoose User Document to include methods like .save()
// This assumes IUser is already defined and matches your Mongoose Schema
type UserDocument = IUser & Document;

export class AuthService {
    /**
     * find user by email
     * @param email - email of user
     * @returns Promise<IUser | null> - user object or null if not found
     */
    public async findUserByEmail(email: string): Promise<IUser | null> {
        try {
            // No 'await' needed here as the function is async and will return the Promise directly
            return UserSchema.findOne({ email: email });
        } catch (error) {
            console.error(`[AuthService][findUserByEmail] Error finding user by email '${email}':`, error);
            // Re-throw a more generic error or a custom application-specific error
            throw new Error("Failed to retrieve user due to a server error.");
        }
    }

    /**
     * create new user
     * @param userData - object containing user data (email and role are required)
     * @returns Promise<IUser> - newly created user object
     */
    public async createUser(userData: Partial<IUser> & { email: string; role: 'job_seeker' | 'recruiter'; }): Promise<IUser> {
        try {
            const newUser: UserDocument = new UserSchema(userData);
            return await newUser.save();
        } catch (error: any) { // Using 'any' for error type to handle various Mongoose/MongoDB errors
            // Check for duplicate key error (MongoDB error code 11000)
            if (error.code === 11000) {
                console.warn(`[AuthService][createUser] Attempted to create user with existing email: '${userData.email}'`);
                throw new Error("User with this email already exists.");
            }
            // Handle Mongoose validation errors
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map((err: any) => err.message);
                console.error(`[AuthService][createUser] Mongoose Validation Error for user '${userData.email}':`, messages);
                throw new Error(`Validation failed: ${messages.join(', ')}`);
            }

            console.error(`[AuthService][createUser] Error creating user '${userData.email}':`, error);
            // Re-throw a more generic error for other unexpected issues
            throw new Error("Failed to create user due to a server error.");
        }
    }

    /**
     * find user by id
     * @param id - id of user
     * @returns Promise<IUser | null> - user object or null if not found
     */
    public async findUserById(id: string): Promise<IUser | null> {
        try {
            // No 'await' needed here as the function is async and will return the Promise directly
            return UserSchema.findById( id );
        } catch (error) {
            console.error(`[AuthService][findUserById] Error finding user by Id '${id}':`, error);
            // Re-throw a more generic error or a custom application-specific error
            throw new Error("Failed to retrieve user due to a server error.");
        }
    }

    /**
     * find user by id
     * @param id - id of user
     * @param updateData - data for update user
     * @returns Promise<IUser | null> - user object or null if not found
     */
    public async updateUser(id: string, updateData: Partial<IUser> ): Promise<IUser | null> {
        try {
            const updatedUser = await UserSchema.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
            return updatedUser;
        } catch (error:any) {
            console.error(`[AuthService][updateUser] Error updating user by Id '${id}':`, error);
            if (error.code === 11000 && error.keyPattern?.email) {
                throw new Error("DUPLICATE_EMAIL");
            }
            // Re-throw a more generic error or a custom application-specific error
            throw new Error("Failed to retrieve user due to a server error.");
        }
    
    }
    /**
     * find user by id
     * @param id - id of user
     * @param updateData - data for update user
     * @returns Promise<IUser | null> - user object or null if not found
     */
    public async deleteUser(id: string): Promise<IUser | null> {
        try {
            const deletedUser = await UserSchema.findByIdAndDelete(id);
            if (!deletedUser){
                throw new Error("User is not exist!");
            }
            return deletedUser;
        } catch (error:any) {
            console.error(`[AuthService][updateUser] Error deleting user by Id '${id}':`, error);
            // Re-throw a more generic error or a custom application-specific error
            throw new Error("Failed to retrieve user due to a server error.");
        }
    }
}