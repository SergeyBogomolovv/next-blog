import { revalidatePath } from 'next/cache'

export const postRevalidate = () => {
  revalidatePath('/my-suggestions')
  revalidatePath('/my-suggestions/published')
  revalidatePath('/my-suggestions/declined')
  revalidatePath('/admin')
  revalidatePath('/admin/accepted')
  revalidatePath('/admin/declined')
  revalidatePath('/posts')
}
