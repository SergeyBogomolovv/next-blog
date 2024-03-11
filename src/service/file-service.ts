import * as fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'

export async function saveFile(file: File | any): Promise<string> {
  try {
    const fileName = uuid() + '.jpg'
    const filePath = path.resolve(__dirname, '..', 'public', 'posts')
    const fileBytes = await file.arrayBuffer()
    const fileBuffer = Buffer.from(fileBytes)
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true })
    }
    console.log(filePath)
    fs.writeFileSync(path.join(filePath, fileName), fileBuffer)
    return fileName
  } catch (error) {
    throw new Error('Ошибка записи файла')
  }
}
export function deleteFile(fileName: string): void {
  try {
    const filePath = path.resolve(__dirname, '..', 'public', 'posts', fileName)
    fs.unlink(filePath, () => console.log('file deleted'))
  } catch (error) {
    throw new Error('Ошибка удаления файла')
  }
}
