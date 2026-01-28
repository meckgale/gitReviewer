import { View, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import Constants from 'expo-constants'
import { useQuery } from '@apollo/client'

import Text from './Text'
import theme from '../theme'
import { ME } from '../graphql/queries'
import useSignOut from '../hooks/useSignOut'

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
  const navigate = useNavigate()
  const signOut = useSignOut()

  const { data } = useQuery(ME)
  const isSignedIn = !!data?.me

  const handleSignOut = async () => {
    await signOut()
    navigate('/signin')
  }

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

        {isSignedIn ? (
          <Pressable onPress={handleSignOut} style={styles.item}>
            <Text color="appBarText" fontSize="subheading" fontWeight="bold">
              Sign out
            </Text>
          </Pressable>
        ) : (
          <Link to="/signin" component={Pressable} style={styles.item}>
            <Text color="appBarText" fontSize="subheading" fontWeight="bold">
              Sign in
            </Text>
          </Link>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
