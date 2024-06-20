import { USER_ROLE } from './user.contant';

export type TUser = {
  employeeId: string;
  name: {
    firstName: string;
    lastName: string;
  };
  picture?: string;
  phone: string;
  email: string;
  dob: string;
  gender: 'male' | 'female' | 'others';
  role: 'admin' | 'manager' | 'editor';
  department: Array<'content' | 'hotel' | 'restaurant'>;
  password: string;
  otp: string;
  otpExpires: Date;
  status: 'active' | 'blocked';
};

export type TUserRole = keyof typeof USER_ROLE;
