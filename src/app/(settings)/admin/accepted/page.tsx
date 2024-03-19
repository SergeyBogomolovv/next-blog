import Suggestion from '@/components/blog/suggestion'
import { getAllAcceptedSuggestions } from '@/data/suggestions'
import EmptyAdminCard from '../../_components/empty-admin-card'

export const tags = ['posts']

export default async function AcceptedPosts() {
  const suggestions = await getAllAcceptedSuggestions()
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
        <EmptyAdminCard type='accepted' />
      )}
    </>
  )
}
