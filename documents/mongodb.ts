// user.model.ts
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  name: String,
  profilePictureUrl: String,
  role: { type: String, enum: ['job_seeker', 'recruiter'], required: true },
}, { timestamps: true });

// oauth.model.ts
const OAuthAccountSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  provider: { type: String, enum: ['google', 'linkedin', 'indeed'], required: true },
  providerUserId: String,
  accessToken: String,
  refreshToken: String,
  expiresAt: Date,
}, { timestamps: true });

// job.model.ts
const JobSchema = new Schema({
  recruiterId: { type: mongoose.Types.ObjectId, ref: 'User' },
  title: String,
  companyName: String,
  location: String,
  description: String,
  externalUrl: String,
  source: { type: String, enum: ['internal', 'linkedin', 'indeed', 'manual'] },
  aiScoreThreshold: Number,
  postedDate: Date,
  applicationDeadline: Date,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// cv.model.ts
const CVSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  name: String,
  content: String,
  filePath: String,
  googleDriveFileId: String,
  lastOptimizedForJobId: { type: mongoose.Types.ObjectId, ref: 'Job' },
}, { timestamps: true });

// skill.model.ts
const SkillSchema = new Schema({
  name: { type: String, unique: true }
});

const CVSkillSchema = new Schema({
  cvId: { type: mongoose.Types.ObjectId, ref: 'CV' },
  skillId: { type: mongoose.Types.ObjectId, ref: 'Skill' },
});

// application.model.ts
const ApplicationSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  jobId: { type: mongoose.Types.ObjectId, ref: 'Job', required: true },
  cvId: { type: mongoose.Types.ObjectId, ref: 'CV', required: true },
  status: { type: String, enum: ['applied', 'interviewing', 'rejected', 'offered', 'accepted', 'withdrawn'], default: 'applied' },
  appliedDate: { type: Date, default: Date.now },
  aiMatchScore: Number,
  aiMatchFeedback: String,
  followUpEmailSentDate: Date,
  notes: String,
  rejectionReason: String,
  offerSalary: Number,
  offerBenefits: String,
  offerStartDate: Date,
}, { timestamps: true });

// matchReport.model.ts
const AIMatchReportSchema = new Schema({
  applicationId: { type: mongoose.Types.ObjectId, ref: 'Application', unique: true },
  cvId: { type: mongoose.Types.ObjectId, ref: 'CV' },
  jobId: { type: mongoose.Types.ObjectId, ref: 'Job' },
  matchScore: Number,
  feedbackSummary: String,
  detailedFeedback: String,
  suggestedKeywords: [String],
  suggestedSkills: [String],
  rawAIResponse: Schema.Types.Mixed,
  reportVersion: { type: Number, default: 1 },
}, { timestamps: true });
