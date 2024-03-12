import Suggestion from '@/components/blog/suggestion'
import { getAllAcceptedSuggestions } from '@/data/suggestions'

export default async function AcceptedPosts() {
  const suggestions = await getAllAcceptedSuggestions()
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
