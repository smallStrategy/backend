import multer from 'multer';
import path from 'path';

// 이미지 파일 처리 미들웨어
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../media/user_profile'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const uniqueName = `${timestamp}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// 문서 파일 처리 미들웨어
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../media/user_document'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const uniqueName = `${timestamp}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

// 각 파일 타입에 맞는 필터링 설정
const fileFilter = (allowedTypes: string[]) => (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('올바르지 않은 파일 형식입니다.'));
  }
};

// 이미지 파일 필터
const imageFilter = fileFilter(['image/jpeg', 'image/png', 'image/gif']);

// 문서 파일 필터
const documentFilter = fileFilter(['application/pdf', 'text/plain']);

// multer 설정
export const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 예: 이미지 파일 크기 제한 5MB
});

export const uploadDocument = multer({
  storage: documentStorage,
  fileFilter: documentFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 예: 문서 파일 크기 제한 10MB
});
