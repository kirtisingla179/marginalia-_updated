import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import usePosts from '../hooks/usePosts'
import PageHeader from '../components/PageHeader'
import PostForm from '../components/PostForm'

export default function WritePost() {
  const { user } = useAuth()
  const { addPost } = usePosts()
  const navigate = useNavigate()

  const handleSubmit = (values, status) => {
    addPost({ ...values, status, authorId: user.id })
    navigate('/dashboard')
  }

  return (
    <main>
      <PageHeader eyebrow="New post" title="Write something worth reading">
        Save it as a draft any time, or publish it straight to your chosen audience.
      </PageHeader>
      <PostForm onSubmit={handleSubmit} />
    </main>
  )
}
