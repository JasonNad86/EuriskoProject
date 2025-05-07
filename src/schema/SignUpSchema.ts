import {z} from 'zod'

export const signupSchema = z.object({
    name: z.string().trim().min(1, 'First Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters'),
    phoneNumber: z.string()
      .min(8, 'Invalid phone number')
      .regex(/^[0-9]+$/, 'Input Numbers only')
  });
  
  export type SignupFormData = z.infer<typeof signupSchema>;