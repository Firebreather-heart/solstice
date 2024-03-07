import * as z from "zod";
export const LoginSchema = z.object({
    username: z.string().min(2, {
        message: "Username is required",
    }),
      password: z.string().min(4, {
        message: "Password is required",
      }),
    
})
export const SignupSchema = z.object({
    username: z.string().min(2, {
        message: "Username is required",
    }),
      password: z.string().min(4, {
        message: "Password is required",
      }),
})