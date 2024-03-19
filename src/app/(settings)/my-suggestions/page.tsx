import Suggestion from '@/components/blog/suggestion'
import { auth } from '@/lib/auth'
import { getWaitingSuggestionsByUserId } from '@/data/suggestions'
import EmptySuggestionsCard from '../_components/empty-suggestions-card'
export const tags = ['posts']

const MyPostsPage = async () => {
  const session = await auth()
  const suggestions = await getWaitingSuggestionsByUserId(session?.user.id)
  return (
    <div className='w-full flex flex-col gap-10'>
      {suggestions.length ? (
        <>
          {suggestions.map((post) => (
            <Suggestion key={post.id} post={post} author={post.author} />
          ))}
        </>
      ) : (
        <EmptySuggestionsCard variant='default' />
      )}
    </div>
  )
}

export default MyPostsPage
