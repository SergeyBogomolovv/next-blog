import Suggestion from '@/components/blog/suggestion'
import { getAllDeclinedSuggestions } from '@/data/suggestions'

export default async function DeclinedPostsAdmin() {
  const suggestions = await getAllDeclinedSuggestions()
  return (
    <>
      {suggestions.map((post) => (
        <Suggestion
          key={post.id}
          post={post}
          author={post.author}
          showAdminFeatures
        />
      ))}
    </>
  )
}
