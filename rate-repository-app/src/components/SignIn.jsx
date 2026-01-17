import { View, StyleSheet } from 'react-native'
import theme from '../theme'
import SignInForm from './SignInForm'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: 16,
  },
})

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
    </View>
  )
}

export default SignIn
