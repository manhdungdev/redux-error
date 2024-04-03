import React from 'react'
import CreatePost from './components/create_post'
import PostList from './components/post_list'

export default function Blog() {
  return (
    <div>
      <CreatePost />
      <PostList />
    </div>
  )
}
