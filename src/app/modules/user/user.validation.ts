import { z } from 'zod';

const userSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
    }),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password required'),
    dob: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'Invalid date of birth'),
    gender: z.enum(['male', 'female', 'others'], {
      message: "Gender must be 'male', 'female', or 'others'",
    }),
    role: z.enum(['admin', 'manager', 'editor'], {
      message: "Role must be 'admin', 'manager', or 'editor'",
    }),
    department: z.array(
      z.enum(['content', 'hotel', 'restaurant'], {
        message: "Department must be 'content', 'hotel', or 'restaurant'",
      }),
    ),
  }),
});

export const UserSchemaValidation = { userSchema };
