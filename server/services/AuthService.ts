import { IUser } from "../interfaces/IUser";
import UserSchema from "../models/User.model";

export class AuthService {
    /**
     * find user by email
     * @param email - email of user
     * @return Promise<IUser | null> - user object or null if not found
     */
    public async findUserByEmail(email: string): Promise<IUser | null> {
        // Use Mongoose's findOne method
        return UserSchema.findOne({ email: email }).exec(); // .exec() returns a Promise
    }

    /**
     * create new user
     * @param userData - object containing user data
     * @return newly created user object
     */

    public async createUser(userData: Partial<IUser> & { email: string; role: 'job_seeker' | 'recruiter'; }): Promise<IUser> {
        // Ensure email and role are present, others are optional as per Partial<IUser>
        // Mongoose will handle saving all properties provided in userData that match the schema.
        const newUser = new UserSchema(userData);
        return newUser.save();
    }


}