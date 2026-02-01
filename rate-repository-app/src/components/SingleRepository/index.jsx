import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native'
import { useParams } from 'react-router-native'
import useRepository from '../../hooks/useRepository'
import RepositoryItem from '../RepositoryItem'
import Text from '../Text'
import theme from '../../theme'
import { format } from 'date-fns'

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
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingCircle}>
        <Text fontWeight="bold" color="primary">
          {review.rating}
        </Text>
      </View>

      <View style={styles.content}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams()
  const { repository, reviews, loading } = useRepository(id)

  if (loading) return <ActivityIndicator />
  if (!repository) return null

  const openInGitHub = () => {
    Linking.openURL(repository.url)
  }

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <RepositoryItem
          item={repository}
          showGithubButton
          onOpenInGitHub={openInGitHub}
        />
      }
      // other props
    />
  )
}

export default SingleRepository
