import { z } from 'zod';

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

const objectIdSchema = z.string().regex(objectIdRegex, {
  message: 'Invalid ObjectId format',
});

export const cvValidationSchema = z.object({
  userId: objectIdSchema,
  name: z.string().min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
  content: z.string().min(1, 'Content is required'),
  filePath: z.string().optional(),
  googleDriveFileId: z.string().optional(),
  lastOptimizedForJobId: objectIdSchema.optional(),
});