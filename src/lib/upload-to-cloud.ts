import { s3 } from './yandex-cloud'

export const uploadPostImage = async (image: any): Promise<string | false> => {
  try {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const upload: any = await s3.Upload({ buffer }, '/posts/')
    return upload.key
  } catch (error) {
    return false
  }
}

export const uploadAvatar = async (image: any): Promise<string | false> => {
  try {
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const upload: any = await s3.Upload({ buffer }, '/avatars/')
    return upload.key
  } catch (error) {
    return false
  }
}
