import Suggestion from '@/components/blog/suggestion'
import { getAllWaitingSuggestions } from '@/data/suggestions'

const AdminPage = async () => {
  const suggestions = await getAllWaitingSuggestions()
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

export default AdminPage
