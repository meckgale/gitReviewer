import CreateReviewForm from './CreateReviewForm'
import useCreateReview from '../../hooks/useCreateReview'
import { useNavigate } from 'react-router-native'

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const { ownerName, repositoryName, rating, text } = values

      const result = await createReview({
        ownerName,
        repositoryName,
        rating,
        text,
      })

      if (result?.repositoryId) {
        navigate(`/repositories/${result.repositoryId}`)
      }
    } catch (e) {
      console.log('Create review failed:', e)
    }
  }

  return <CreateReviewForm onSubmit={onSubmit} />
}

export default CreateReview
