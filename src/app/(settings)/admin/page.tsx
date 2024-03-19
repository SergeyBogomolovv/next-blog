import Suggestion from '@/components/blog/suggestion'
import { getAllWaitingSuggestions } from '@/data/suggestions'
import EmptyAdminCard from '../_components/empty-admin-card'
export const tags = ['posts']
const AdminPage = async () => {
  const suggestions = await getAllWaitingSuggestions()

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
        <EmptyAdminCard type='latest' />
      )}
    </>
  )
}

export default AdminPage
