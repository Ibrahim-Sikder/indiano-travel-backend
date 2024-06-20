import catchAsync from '../../../utils/catchAsync';
import successResponse from '../../../utils/successResponse';
import { UserServices } from './user.services';

// create users
const createUser = catchAsync(async (req, res) => {
  const response = await UserServices.createUser(req.body);
  successResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User created successfully',
    data: response,
  });
});

// update user profile
const updateProfile = catchAsync(async (req, res) => {
  const response = await UserServices.updateProfile(req);
  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: response,
  });
});

// get users
const getUsers = catchAsync(async (req, res) => {
  const response = await UserServices.getUsers();
  successResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: response,
  });
});
export const UserControllers = { createUser, updateProfile, getUsers };
