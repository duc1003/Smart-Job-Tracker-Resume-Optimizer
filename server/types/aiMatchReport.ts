import { Document, Schema } from 'mongoose';

export interface IAIMatchReport extends Document {
  applicationId: Schema.Types.ObjectId; // Reference to the specific application
  cvId: Schema.Types.ObjectId; // CV used for the report
  jobId: Schema.Types.ObjectId; // JD used for the report
  reportDate: Date;
  matchScore: number; // Final score
  feedbackSummary: string; // Condensed feedback
  detailedFeedback: string; // Full detailed feedback from AI
  suggestedKeywords: string[]; // Keywords suggested by AI
  suggestedSkills: string[]; // Skills suggested by AI
  rawAIResponse?: any; // Store the raw JSON response from GPT-4 for debugging/analysis
  reportVersion?: number; // If AI model/prompts change
  createdAt: Date;
  updatedAt: Date;
}