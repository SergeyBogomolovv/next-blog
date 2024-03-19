import Suggestion from '@/components/blog/suggestion'
import { auth } from '@/lib/auth'
import { getDeclinedSuggestionsByUserId } from '@/data/suggestions'
import EmptySuggestionsCard from '../../_components/empty-suggestions-card'
export const tags = ['posts']
const Declined = async () => {
  const session = await auth()
  const suggestions = await getDeclinedSuggestionsByUserId(session?.user.id)
  return (
    <div className='w-full flex flex-col gap-10'>
      {suggestions.length ? (
        <>
          {suggestions.map((post) => (
            <Suggestion key={post.id} post={post} author={post.author} />
          ))}
        </>
      ) : (
        <EmptySuggestionsCard variant='declined' />
      )}
    </div>
  )
}

export default Declined
