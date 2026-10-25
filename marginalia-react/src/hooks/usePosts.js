import { useState, useCallback } from 'react'
import * as postService from '../services/postService'

// Holds the post list in state and keeps it in sync with localStorage.
export default function usePosts() {
  const [posts, setPosts] = useState(() => postService.getAllPosts())
  const refresh = () => setPosts(postService.getAllPosts())

  const addPost = useCallback((data) => {
    const created = postService.addPost(data)
    refresh()
    return created
  }, [])

  const updatePost = useCallback((id, changes) => {
    const updated = postService.updatePost(id, changes)
    refresh()
    return updated
  }, [])

  const deletePost = useCallback((id) => {
    postService.deletePost(id)
    refresh()
  }, [])

  return { posts, addPost, updatePost, deletePost }
}
