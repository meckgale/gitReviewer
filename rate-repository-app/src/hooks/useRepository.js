import { useQuery } from '@apollo/client'
import { GET_REPOSITORY } from '../graphql/queries'

const useRepository = (id) => {
  const { data, loading, refetch, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
    skip: !id,
  })

  const repository = data?.repository ?? null

  const reviews = repository?.reviews?.edges?.map((e) => e.node) ?? []

  return { repository, reviews, loading, refetch, error }
}

export default useRepository
