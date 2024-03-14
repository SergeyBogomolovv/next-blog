import { findPostById } from '@/data/posts'

const Post = async ({ searchParams }: any) => {
  console.log(searchParams)
  return <div>{searchParams.id}</div>
}

export default Post
