import * as yup from 'yup'
import { Text, StyleSheet, TextInput, Pressable, View } from 'react-native'
import { useFormik } from 'formik'
import theme from '../../theme'

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
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
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  })

  const usernameHasError = formik.touched.username && formik.errors.username
  const passwordHasError = formik.touched.password && formik.errors.password
  const passwordConfirmationHasError =
    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation

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
        onBlur={formik.handleBlur('password')}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
        style={[
          styles.input,
          styles.inputSpacing,
          passwordHasError && styles.inputError,
        ]}
        autoCapitalize="none"
      />
      {passwordHasError && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder="Password confirmation"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.passwordConfirmation}
        onBlur={formik.handleBlur('passwordConfirmation')}
        onChangeText={formik.handleChange('passwordConfirmation')}
        secureTextEntry={true}
        style={[
          styles.input,
          styles.inputSpacing,
          passwordConfirmationHasError && styles.inputError,
        ]}
        autoCapitalize="none"
      />
      {passwordConfirmationHasError && (
        <Text style={styles.errorText}>
          {formik.errors.passwordConfirmation}
        </Text>
      )}
      <Pressable
        testID="submitButton"
        onPress={formik.handleSubmit}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

export default SignUpForm
