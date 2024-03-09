import type { NextAuthConfig } from 'next-auth'
import Credential from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import bcrypt from 'bcryptjs'

export default {
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true,
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credential({
      async authorize(credentials, request) {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) {
            return null
          }
          const isPasswordsMatch = await bcrypt.compare(password, user.password)
          if (isPasswordsMatch) return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig
