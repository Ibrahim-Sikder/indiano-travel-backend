import bcrypt from 'bcrypt';
import config from '../../../config';
import AppError from '../../../errors/appError';
import { sendEmail } from '../../../helpers/mail/sendEmail';
import otpTemplate from '../../../helpers/mail/templetes/otp';

import { generateOtp } from '../../../utils/generateOtp';
import { User } from '../user/user.model';
import { TAuth, TOtp } from './auth.interface';
import generateJwtToken, { verifyToken } from './auth.utils';

// user login
const userLogin = async (payload: TAuth) => {
  const isExistUser = await User.findOne({
    $or: [
      { email: payload.user },
      { employeeId: payload.user },
      { phone: payload.user },
    ],
  }).select('+password');

  if (!isExistUser) {
    throw new AppError(404, 'Invalid user or password');
  }

  const checkingPassword = await bcrypt.compare(
    payload.password,
    isExistUser.password,
  );

  if (!checkingPassword) {
    throw new AppError(404, 'Invalid user or password');
  }
  //generate otp
  const { otp, otpExpires } = generateOtp();
  isExistUser.otp = otp;
  isExistUser.otpExpires = otpExpires;
  // save otp
  await User.updateOne(
    { _id: isExistUser._id },
    {
      otp,
      otpExpires,
    },
  );
  sendEmail(isExistUser?.email, 'OTP Verification', otpTemplate(otp));
  return { url: `/verify?email=${isExistUser?.email}` };
};

// otp verification
const verifyOTP = async (payload: TOtp) => {
  const isExistUser = await User.findOne({
    email: payload.email,
  });
  if (
    !isExistUser ||
    isExistUser.otp !== payload.otp ||
    isExistUser.otpExpires < new Date()
  ) {
    throw new AppError(401, 'Invalid or expired OTP');
  }
  await User.updateOne(
    { _id: isExistUser._id },
    {
      $unset: { otp: '', otpExpires: '' },
    },
  );
  const jwtPayload = {
    _id: isExistUser._id,
    email: isExistUser.email,
    role: isExistUser.role,
    department: isExistUser.department,
  };
  const accessToken = generateJwtToken(
    jwtPayload,
    config.jwt.jwt_access_secret!,
    '25s',
  );
  const refreshToken = generateJwtToken(
    jwtPayload,
    config.jwt.jwt_refresh_secret!,
    '1h',
  );

  return { accessToken, refreshToken, needPasswordChange: true };
};

// refresh token
// refresh Token
// TODO: need more improve
const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt.jwt_refresh_secret as string);
  const { _id } = decoded;

  // check if user exist
  const user = await User.findById(_id);

  if (!user) {
    throw new AppError(404, 'User is not found !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(403, 'This user is blocked ! !');
  }
  const jwtPayload = {
    _id: user?._id,
    role: user?.role,
  };
  const accessToken = generateJwtToken(
    jwtPayload,
    config.jwt.jwt_access_secret!,
    '25s',
  );
  return {
    accessToken,
  };
};
export const AuthServices = { userLogin, verifyOTP, refreshToken };
