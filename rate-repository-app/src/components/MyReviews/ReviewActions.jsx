import { View, Pressable, StyleSheet, Alert, Platform } from 'react-native'
import useDeleteReview from '../../hooks/useDeleteReview'
import Text from '../Text'
import theme from '../../theme'

const styles = StyleSheet.create({
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
  },
})

const ReviewActions = ({ review, refetch, onOpenRepository }) => {
  const [deleteReview] = useDeleteReview()

  const confirmDelete = (onConfirm) => {
    if (Platform.OS === 'web') {
      const ok = window.confirm('Are you sure you want to delete this review?')
      if (ok) onConfirm()
      return
    }

    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: onConfirm },
      ],
    )
  }

  const handleDelete = () => {
    confirmDelete(async () => {
      await deleteReview(review.id)
      await refetch()
    })
  }

  return (
    <View style={styles.actionsRow}>
      <Pressable
        style={[styles.button, styles.primary]}
        onPress={onOpenRepository}
      >
        <Text style={styles.buttonText}>View repository</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.danger]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete review</Text>
      </Pressable>
    </View>
  )
}

export default ReviewActions
