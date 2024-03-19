import Suggestion from '@/components/blog/suggestion'
import { getAllDeclinedSuggestions } from '@/data/suggestions'
import EmptyAdminCard from '../../_components/empty-admin-card'
export const tags = ['posts']
export default async function DeclinedPostsAdmin() {
  const suggestions = await getAllDeclinedSuggestions()
  return (
    <>
      {suggestions.length ? (
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
      ) : (
        <EmptyAdminCard type='declined' />
      )}
    </>
  )
}
