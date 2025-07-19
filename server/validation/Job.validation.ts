import { z } from 'zod';
import mongoose from 'mongoose';


const objectIdRegex = /^[a-fA-F0-9]{24}$/;

const objectIdSchema = z.string().regex(objectIdRegex, {
  message: 'Invalid ObjectId format',
});

export const jobValidationSchema = z.object({
    recruiterId: objectIdSchema.optional(),
    title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
    companyName: z.string().min(1, 'Company name is required').max(100, 'Company name cannot exceed 100 characters'),
    location: z.string().min(1, 'Location is required').max(100, 'Location cannot exceed 100 characters'),
    description: z.string().min(20, 'Description is required'),
    externalUrl: z.string().url('Invalid URL format').optional(),
    source: z.enum(['internal', 'linkedin', 'indeed', 'other_scraper', 'manual'], {
      message: 'Source must be one of the predefined values'
    }),
    postedDate: z.date().optional(),
    applicationDeadline: z.date().optional(),
    isActive: z.boolean().default(true),
    aiScoreThreshold: z.number().min(0, 'AI score threshold must be at least 0').max(100, 'AI score threshold cannot exceed 100').optional()
})