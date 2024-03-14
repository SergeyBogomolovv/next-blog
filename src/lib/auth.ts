import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from './db'
import authConfig from './auth.config'
import { getUserById } from '@/data/user'
import { getTwoFactorConformationByUserId } from '@/data/two-factor-conformation'
import { getAccountByUserId } from '@/data/account'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') {
        return true
      }
      const existingUser = await getUserById(user.id)
      if (!existingUser?.emailVerified) return false
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConformation = await getTwoFactorConformationByUserId(
          existingUser.id
        )
        if (!twoFactorConformation) return false
        await db.twoFactorConformation.delete({
          where: { id: twoFactorConformation.id },
        })
      }
      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            role: token.role,
            name: token.name,
            email: token.email,
            isOAuth: token.isOAuth as boolean,
            isTwoFactorEnabled: token.isTwoFactorEnabled as boolean,
            image: token.image as string,
          },
        }
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      const existingAccount = await getAccountByUserId(existingUser.id)
      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
      token.role = existingUser.role
      token.image = existingUser.image
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
