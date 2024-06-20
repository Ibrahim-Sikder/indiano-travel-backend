import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();
router.post('/login', AuthController.userLogin);
router.post('/verify-otp', AuthController.verifyOTP);
router.post('/refresh-token', AuthController.refreshToken);
export const AuthRoutes = router;
