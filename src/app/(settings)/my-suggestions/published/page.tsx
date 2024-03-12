import Suggestion from '@/components/blog/suggestion'
import { auth } from '@/lib/auth'
import { getAcceptedSuggestionsByUserId } from '@/data/suggestions'
import EmptySuggestionsCard from '../../_components/empty-suggestions-card'

const Published = async () => {
  const session = await auth()
  const suggestions = await getAcceptedSuggestionsByUserId(session?.user.id)
  return (
    <div className='w-full flex flex-col gap-10'>
      {suggestions.length ? (
        <>
          {suggestions.map((post) => (
            <Suggestion key={post.id} post={post} author={post.author} />
          ))}
        </>
      ) : (
        <EmptySuggestionsCard variant='published' />
      )}
    </div>
  )
}

export default Published
