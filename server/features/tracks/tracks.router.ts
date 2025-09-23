
import { Router } from 'express';
import { uploadTrack, getTrackFeed } from './tracks.controller';
import { authenticateToken } from '../../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

const uploadsDir = path.join(process.env.DATA_DIRECTORY || 'data', 'uploads', 'tracks');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  '/upload',
  authenticateToken,
  upload.single('track'),
  uploadTrack,
);
router.get('/feed', authenticateToken, getTrackFeed);

export default router;
