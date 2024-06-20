import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { TUser } from './user.interface';
const userSchema = new Schema<TUser>(
  {
    employeeId: { type: String, required: true, unique: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    picture: { type: String, default: null },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'editor'],
      required: true,
    },
    department: {
      type: [String],
      enum: ['content', 'hotel', 'restaurant'],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre<TUser>('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.password_round_salt),
  );
  next();
});
export const User = model<TUser>('User', userSchema);
