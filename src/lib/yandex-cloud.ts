import EasyYandexS3 from 'easy-yandex-s3'

const accessKeyId =
  process.env.YANDEX_CLOUD_KEY_ID || 'YCAJEoSjUACxliHEhXG5PXLXN'
const secretAccessKey =
  process.env.YANDEX_CLOUD_KEY_SECRET ||
  'YCNADadfCB_L_QasSChQbOC4uOteRvGcR0Ql9XNm'

export const s3 = new EasyYandexS3({
  auth: {
    accessKeyId,
    secretAccessKey,
  },
  Bucket: 'next-blog',
  debug: true,
})
