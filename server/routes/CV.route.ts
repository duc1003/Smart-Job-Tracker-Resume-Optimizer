import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authMiddleware } from '../middlewares/Auth.middleware'; // Import your auth middleware
import { CVController } from '../controllers/CV.controller'; // Import the class
import fs from 'fs';
const router = Router();
const cvController = new CVController(); // Instantiate the controller

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the directory exists
    const uploadDir = path.join(__dirname, '../uploads/cvs');
    // Đảm bảo thư mục tồn tại, nếu không có sẽ tự tạo
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // You might want to create the directory if it doesn't exist using fs.mkdirSync with { recursive: true }
    // but Multer often handles basic directory creation if the parent exists.
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Access userId from req *after* authMiddleware has run
    // const userId = (req as any).userId ? (req as any).userId.toString() : 'unknown';
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, `${userId}-${uniqueSuffix}${path.extname(file.originalname)}`);
    cb(null, file.originalname); 
  },
});

// Filter to accept only PDF and potentially other document types
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /pdf|doc|docx/; // Regex for allowed extensions
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new Error('Only PDF, DOC, and DOCX files are allowed!'));
};

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: fileFilter
});


// API routes for CVs
// For upload, authMiddleware must run *before* upload.single() to ensure req.userId is set
router.post('/upload', authMiddleware, upload.single('cvFile'), cvController.uploadCV);
router.get('/:user_id', authMiddleware, cvController.getCVsByUserId); // Assuming this is to get authenticated user's CVs
router.get('/', authMiddleware, cvController.getAllCVs); // Potentially for admin only
router.get('/:id', authMiddleware, cvController.getCVById);
router.put('/:id', authMiddleware, cvController.updateCVById);
router.delete('/:id', authMiddleware, cvController.deleteCVById);

// If you want an endpoint to get CVs for a *specific* user (potentially by admin)
// router.get('/cvs/user/:userId', authMiddleware, cvController.getCVsByUserId); // Uncomment if needed with proper auth

export default router;