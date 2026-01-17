import { View, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroundColor.colorPrimary,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  item: {
    marginRight: 16,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
      >
        <Link to="/" component={Pressable} style={styles.item}>
          <Text color="appBarText" fontSize="subheading" fontWeight="bold">
            Repositories
          </Text>
        </Link>

        <Link to="/signin" component={Pressable} style={styles.item}>
          <Text color="appBarText" fontSize="subheading" fontWeight="bold">
            Sign in
          </Text>
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
