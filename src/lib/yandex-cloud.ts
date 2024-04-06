import EasyYandexS3 from 'easy-yandex-s3'

const accessKeyId = process.env.YANDEX_CLOUD_KEY_ID!
const secretAccessKey = process.env.YANDEX_CLOUD_KEY_SECRET!

export const s3 = new EasyYandexS3({
  auth: {
    accessKeyId,
    secretAccessKey,
  },
  Bucket: 'next-blog',
  debug: true,
})
