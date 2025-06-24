import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      dbName: 'smart-job-tracker', // You can omit this if already in your URI
    });

    console.log('✅ MongoDB connected.');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};
