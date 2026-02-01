import { View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import theme from '../theme'
import SignInForm from './SignInForm/index'
import useSignIn from '../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: 16,
  },
})

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async ({ username, password }) => {
    try {
      const data = await signIn({ username, password })

      if (data?.authenticate?.accessToken) {
        navigate('/')
      }

      console.log('AUTHENTICATE mutation result:', data)
      console.log('accessToken:', data?.authenticate?.accessToken)
    } catch (e) {
      console.log('Sign in error:', e)
    }
  }

  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  )
}

export default SignIn
