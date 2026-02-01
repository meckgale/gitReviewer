import { Image, StyleSheet, View, Pressable } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 10,
  },
  topRow: {
    flexDirection: 'row',
    gap: 15,
  },
  avatar: {
    width: 50,
    height: 50,
  },
  info: {
    gap: 5,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 3,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    alignItems: 'center',
    gap: 5,
  },
  githubButton: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius?.button ?? 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  githubButtonText: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
})

const formatCount = (value) =>
  value < 1000
    ? String(value)
    : `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`

const RowItem = ({ value, label }) => (
  <View style={styles.rowItem}>
    <Text fontWeight="bold">{formatCount(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
)

const RepositoryItem = ({ item, showGithubButton = false, onOpenInGitHub }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topRow}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.info}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.language}>
            <Text color="appBarText">{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <RowItem value={item.stargazersCount} label="Stars" />
        <RowItem value={item.forksCount} label="Forks" />
        <RowItem value={item.reviewCount} label="Reviews" />
        <RowItem value={item.ratingAverage} label="Rating" />
      </View>
      {showGithubButton && (
        <Pressable style={styles.githubButton} onPress={onOpenInGitHub}>
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  )
}

export default RepositoryItem
