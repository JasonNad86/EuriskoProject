import { z } from "zod";

export const schema = z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string(),
    phoneNumber:z.number(),
});

export type UserSchema = z.infer<typeof schema>;