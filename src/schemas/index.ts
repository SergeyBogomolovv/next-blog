import { UserRole } from '@prisma/client'
import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
})
export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  password: z.string().min(6),
})
export const ResetShema = z.object({
  email: z.string().email(),
})
export const NewPasswordSchema = z.object({
  password: z.string().min(6),
  passwordAgain: z.string().min(6),
})
export const SettingsSchema = z.object({
  name: z.optional(z.string().min(3)),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
})
export const NewPostSchema = z.object({
  title: z.string().min(4),
  content: z.string().min(10),
})
