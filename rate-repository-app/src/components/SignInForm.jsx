import * as yup from 'yup'
import { Text, StyleSheet, TextInput, Pressable, View } from 'react-native'
import { useFormik } from 'formik'
import theme from '../theme'

const initialValues = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius?.input ?? 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: theme.fontSizes.subheading,
    backgroundColor: theme.colors.white,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputSpacing: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius?.button ?? 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 12,
  },
})

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username length must be greater or equal to 3')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be longer than 8 chracters')
    .required('Password is required'),
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  })

  const usernameHasError = formik.touched.username && formik.errors.username
  const passwordHasError = formik.touched.password && formik.errors.password

  return (
    <View>
      <TextInput
        placeholder="Username"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        style={[
          styles.input,
          styles.inputSpacing,
          usernameHasError && styles.inputError,
        ]}
        autoCapitalize="none"
      />
      {usernameHasError && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
        style={[
          styles.input,
          styles.inputSpacing,
          passwordHasError && styles.inputError,
        ]}
      />
      {passwordHasError && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

export default SignInForm
