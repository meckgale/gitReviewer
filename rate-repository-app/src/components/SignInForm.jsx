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
})

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  })

  return (
    <View>
      <TextInput
        placeholder="Username"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.input, styles.inputSpacing]}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
        style={[styles.input, styles.inputSpacing]}
      />
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

export default SignInForm
