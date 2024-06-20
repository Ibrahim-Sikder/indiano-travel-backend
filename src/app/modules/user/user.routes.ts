import express from 'express';
import upload from '../../../helpers/upload/upload';
import auth from '../../middlewares/auth';
import parseBodyData from '../../middlewares/parseBodyData';
import { requestValidation } from '../../middlewares/requestValidation';
import { UserControllers } from './user.controller';
import { UserSchemaValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create',
  requestValidation(UserSchemaValidation.userSchema),
  UserControllers.createUser,
);
router.patch(
  '/update-profile',
  upload(2, 'users').single('file'),
  parseBodyData,
  UserControllers.updateProfile,
);
// get users
router.get('/', auth('super_admin'), UserControllers.getUsers);
export const UserRoutes = router;
