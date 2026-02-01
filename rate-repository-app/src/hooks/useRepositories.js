import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState()
//   const [loading, setLoading] = useState(false)

//   const fetchRepositories = async () => {
//     setLoading(true)

//     // Replace the IP address part with your own IP address!
//     const response = await fetch('<OWNIP>')
//     const json = await response.json()

//     setLoading(false)
//     setRepositories(json)
//   }

//   useEffect(() => {
//     fetchRepositories()
//   }, [])

//   return { repositories, loading, refetch: fetchRepositories }
// }

const useRepositories = ({
  first = 8,
  orderBy,
  orderDirection,
  searchKeyword = '',
} = {}) => {
  const { data, loading, fetchMore, refetch, error, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { first, orderBy, orderDirection, searchKeyword },
      fetchPolicy: 'cache-and-network',
    },
  )

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage

    if (!canFetchMore) return

    fetchMore({
      variables: {
        first,
        orderBy,
        orderDirection,
        searchKeyword,
        after: data.repositories.pageInfo.endCursor,
      },
    })
  }

  const repositories = data?.repositories ?? null

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    refetch,
    error,
    ...result,
  }
}

export default useRepositories
