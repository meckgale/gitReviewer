import { useNavigate } from 'react-router-native'
import useCreateUser from '../../hooks/useCreateUser'
import useSignIn from '../../hooks/useSignIn'
import SignUpForm from './SignUpForm'

const SignUp = () => {
  const [createUser] = useCreateUser()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async ({ username, password }) => {
    try {
      await createUser({ username, password })
      await signIn({ username, password })
      navigate('/')
    } catch (e) {
      console.log('Sign up failed:', e)
    }
  }

  return <SignUpForm onSubmit={onSubmit} />
}

export default SignUp
