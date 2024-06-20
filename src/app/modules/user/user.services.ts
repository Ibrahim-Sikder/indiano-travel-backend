/* eslint-disable no-undef */
import { Request } from 'express';
import AppError from '../../../errors/appError';
import { sendEmail } from '../../../helpers/mail/sendEmail';
import userWelcome from '../../../helpers/mail/templetes/userWelcome';
import generateEmployeeId from '../../../utils/generateEmployeeId';
import { TUser } from './user.interface';
import { User } from './user.model';

// create user
const createUser = async (payload: TUser) => {
  payload.employeeId = generateEmployeeId();
  const user = await User.create(payload);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { password, ...userWithoutPassword } = user.toObject();
  if (user._id) {
    await sendEmail(
      user.email,
      'Welcome',
      userWelcome(user.employeeId, user.email, payload.password),
    );
  }
  return userWithoutPassword;
};

// update profile

const updateProfile = async (req: Request) => {
  const file = req.file as Express.MulterS3.File;
  const data = req.body;

  // List of allowed fields based on the user model
  const allowedFields = [
    'name.firstName',
    'name.lastName',
    'picture',
    'phone',
    'dob',
    'gender',
  ];

  // If file is uploaded, add the picture field to data
  if (file) {
    data.picture = file.location;
  }
  // Filter the incoming data to allow only allowed fields
  const filteredData: any = {};
  allowedFields.forEach((field) => {
    if (field.includes('.')) {
      // Handle nested fields like name.firstName
      const [key, subKey] = field.split('.');
      if (data[key] && data[key][subKey] !== undefined) {
        if (!filteredData[key]) {
          filteredData[key] = {};
        }
        filteredData[key][subKey] = data[key][subKey];
      }
    } else if (data[field] !== undefined) {
      filteredData[field] = data[field];
    }
  });

  // Find the user and update the allowed fields
  const user = await User.findByIdAndUpdate(
    //TODO: user id make dynamic
    '664cc9365564d524f1dce5b6',
    filteredData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  return user;
};

// get users
const getUsers = async () => {
  const result = await User.find();
  const meta = {
    total: await User.countDocuments(),
    limit: 10,
    page: 1,
  };
  return { meta, result };
};
export const UserServices = { createUser, updateProfile, getUsers };
