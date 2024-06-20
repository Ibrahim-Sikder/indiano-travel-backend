import config from '../../../config';
import catchAsync from '../../../utils/catchAsync';
import successResponse from '../../../utils/successResponse';
import { AuthServices } from './auth.services';

// login route
const userLogin = catchAsync(async (req, res) => {
  const response = await AuthServices.userLogin(req.body);
  // res.redirect(`http://loacalhost:3000/verify?email=arafat@gmail.com`);
  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'OTP sent to your email',
    data: response,
  });
});

// verify otp
const verifyOTP = catchAsync(async (req, res) => {
  const response = await AuthServices.verifyOTP(req.body);
  const { refreshToken } = response;
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Logged in successfully',
    data: {
      accessToken: response.accessToken,
      needPasswordChange: response.needPasswordChange,
    },
  });
});

// refreshToken
const refreshToken = catchAsync(async (req, res) => {
  const response = await AuthServices.refreshToken(req.cookies.refreshToken);

  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Refresh token retrieved successfully',
    data: response,
  });
});
export const AuthController = { userLogin, verifyOTP, refreshToken };
