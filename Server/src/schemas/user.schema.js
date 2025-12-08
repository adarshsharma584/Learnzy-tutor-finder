import { z } from  "zod"

const registerSchema = z.object({
  body: z.object({
    name:  z.string().min(3),
    email: z.string().email(),
    phone: z.string().length(10),
    password:  z.string().min(6),
    role: z.enum(["student", "teacher", "parent"]).optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

const verifySchema = z.object({
  body:  z.object({
    email: z.string().email(),
    verificationCode: z.string().length(6)
  })
});

const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    phone: z.string().length(10).optional(),
    role: z.enum(["student", "teacher", "parent"]).optional(),
  }).strict(),   // prevents unknown fields
  
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id"),
  }),
});


export {
  registerSchema,
  loginSchema,
  verifySchema,
  updateUserSchema
}