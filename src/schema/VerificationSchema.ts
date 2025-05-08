import {z} from 'zod'

export const verificationSchema = z.object({
    verificationCode: z.string()
    .length(4, { message: "Code must be exactly 4 digits" })
    .regex(/^\d+$/, { message: "Code must contain only numbers" })
});

export type VerificationFormData = z.infer<typeof verificationSchema>