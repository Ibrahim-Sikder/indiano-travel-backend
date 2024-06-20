import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri: process.env.DATABASE_URI,
  password_round_salt: process.env.PASSWORD_ROUND_SALT,
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_APP_PASSWORD,
  },
  aws: {
    aws_access_key: process.env.AWS_ACCESS_KEY,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_bucket_name: process.env.S3_BUCKET_NAME,
    aws_region: process.env.AWS_REGION,
  },
  jwt: {
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  },
};
