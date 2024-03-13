'use server'

import { db } from '@/lib/db'

export const getWaitingSuggestionsByUserId = async (
  userId: string | undefined
) => {
  const suggestions = await db.post.findMany({
    where: { authorId: userId, status: 'waiting' },
    include: { author: true },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return suggestions
}
export const getAcceptedSuggestionsByUserId = async (
  userId: string | undefined
) => {
  const suggestions = await db.post.findMany({
    where: { authorId: userId, status: 'accepted' },
    include: { author: true },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return suggestions
}
export const getDeclinedSuggestionsByUserId = async (
  userId: string | undefined
) => {
  const suggestions = await db.post.findMany({
    where: { authorId: userId, status: 'declined' },
    include: { author: true },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return suggestions
}
export const getAllWaitingSuggestions = async () => {
  const suggestions = await db.post.findMany({
    where: { status: 'waiting' },
    include: { author: true },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return suggestions
}
export const getAllDeclinedSuggestions = async () => {
  const suggestions = await db.post.findMany({
    where: { status: 'declined' },
    include: { author: true },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return suggestions
}
export const getAllAcceptedSuggestions = async () => {
  const suggestions = await db.post.findMany({
    where: { status: 'accepted' },
    include: { author: true },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return suggestions
}
