'use server'
import { NewPostSchema } from '@/schemas'
import { saveFile } from '@/service/file-service'
import * as z from 'zod'

export const addpost = async (
  values: z.infer<typeof NewPostSchema>,
  fileData: FormData
) => {
  console.log(fileData.get('image'))
  const validateFields = NewPostSchema.safeParse(values)
  if (!validateFields) {
    return { error: 'Error' }
  }
  return { succes: 'Post sent' }
}
