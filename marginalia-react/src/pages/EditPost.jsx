import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import usePosts from '../hooks/usePosts'
import PageHeader from '../components/PageHeader'
import PostForm from '../components/PostForm'

export default function EditPost() {
  const { id } = useParams()
  const { user } = useAuth()
  const { posts, updatePost } = usePosts()
  const navigate = useNavigate()
  const post = posts.find((p) => p.id === id)

  if (!post || post.authorId !== user.id) {
    return (
      <main>
        <PageHeader eyebrow="Edit post" title="Post not found">
          This post doesn't exist, or it isn't yours to edit.
        </PageHeader>
        <section className="category-page">
          <div className="wrap stories__more"><Link to="/dashboard" className="btn">Back to dashboard</Link></div>
        </section>
      </main>
    )
  }

  const handleSubmit = (values, status) => {
    updatePost(post.id, { ...values, status })
    navigate('/dashboard')
  }

  return (
    <main>
      <PageHeader eyebrow="Edit post" title="Make it better">
        Update your post, change who can read it, or move it back to drafts.
      </PageHeader>
      <PostForm initial={post} onSubmit={handleSubmit} />
    </main>
  )
}
