import * as z from 'zod'

export const userSignUpSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email(),
    username: z.string().min(3, 'Username must be at least 3 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});