const {z} = require('zod');

const registerSchema = z.object( {
    username: z.string().min(1, "Username is required"),
    age:z.number().gt(18,"Minimum age must be 18"),
    password: z.string()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must be at most 20 characters long")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    phone: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
    email: z.string().email("Invalid email address"),
})

const loginSchema = z.object({
    username:z.string(),
    password: z.string()
})

module.exports = {
    registerSchema,
    loginSchema
};
