import { FlatList, StyleSheet, View, Pressable } from 'react-native'
import ReviewActions from './ReviewActions'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import { format } from 'date-fns'

import { ME } from '../../graphql/queries'
import Text from '../Text'
import theme from '../../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 16,
    flexDirection: 'row',
    gap: 14,
  },
  ratingCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 6,
  },
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColor.colorSecondary,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const MyReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingCircle}>
        <Text fontWeight="bold" color="primary">
          {review.rating}
        </Text>
      </View>

      <View style={styles.content}>
        <Text fontWeight="bold">{review.repository.fullName}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const MyReviews = () => {
  const navigate = useNavigate()

  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return null

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) ?? []

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <MyReviewItem review={item} />
          <ReviewActions
            review={item}
            refetch={refetch}
            onOpenRepository={() =>
              navigate(`/repositories/${item.repository.id}`)
            }
          />
        </View>
      )}
    />
  )
}

export default MyReviews
