import mongoose from 'mongoose';

export const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      dbName: 'smart-job-tracker-resume-optimizer', // You can omit this if already in your URI
    });

    console.log('✅ MongoDB connected.');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};
