import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import config from '../../config';

// Initialize AWS S3Client
const s3 = new S3Client({
  region: config.aws.aws_region!,
  credentials: {
    accessKeyId: config.aws.aws_access_key!,
    secretAccessKey: config.aws.aws_secret_access_key!,
  },
});

// multer config
const upload = (fileSize?: number, path?: string) => {
  return multer({
    storage: multerS3({
      bucket: config.aws.aws_bucket_name!,
      s3: s3,

      key: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop(); // Extract file extension
        const filenameWithoutExtension = file.originalname.replace(
          /\.[^/.]+$/,
          '',
        ); // Remove extension from filename
        const timestamp = Date.now(); // Current timestamp
        const newFilename = `${path}/${filenameWithoutExtension}_${timestamp}.${fileExtension}`;
        cb(null, newFilename);
      },
    }),
    limits: {
      fileSize: (fileSize as number) * 1024 * 1024,
    },
  });
};
export default upload;
