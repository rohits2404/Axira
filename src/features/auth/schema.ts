import { z } from 'zod';

export const signInFormSchema = z.object({
    email: z.email({
        error: 'Invalid Email.',
    }),
    password: z.string({
        error: 'Password Is Required.',
    }),
});

export const signUpFormSchema = z.object({
    name: z.string().trim().min(1, 'Full Name Is Required.'),
    email: z.email({
        error: 'Invalid Email.',
    }),
    password: z.string().min(8, 'Password Must be Atleast 8 Characters.').max(256, 'Password Cannot Exceed 256 Characters.'),
});