'use server'
import { getUserById } from '@/data/user'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { NewPostSchema } from '@/schemas'
import { saveFile } from '@/service/file-service'
import * as z from 'zod'

export const addpost = async (
  values: z.infer<typeof NewPostSchema>,
  fileData: FormData
) => {
  const image = fileData.get('image')
  if (!image) return { error: 'Image is required' }
  const fileName = await saveFile(image)
  const validateFields = NewPostSchema.safeParse(values)
  if (!validateFields) {
    return { error: 'Invalid fields' }
  }
  const session = await auth()
  const dbUser = await getUserById(session?.user.id)
  if (!dbUser) return { error: 'Something went wrong' }
  await db.post.create({
    data: {
      title: values.title,
      content: values.content,
      authorId: dbUser.id,
      image: fileName,
    },
  })
  return { succes: 'Post sent' }
}
