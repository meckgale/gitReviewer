import * as yup from 'yup'
import { Text, StyleSheet, TextInput, Pressable, View } from 'react-native'
import { useFormik } from 'formik'
import theme from '../../theme'

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string().optional(),
})

const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    validateOnChange: false,
  })

  const hasError = (name) => formik.touched[name] && formik.errors[name]

  return (
    <View>
      <TextInput
        placeholder="Repository owner name"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
        style={[
          styles.input,
          styles.inputSpacing,
          hasError('ownerName') && styles.inputError,
        ]}
        autoCapitalize="none"
      />
      {hasError('ownerName') && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        placeholder="Repository name"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
        style={[
          styles.input,
          styles.inputSpacing,
          hasError('repositoryName') && styles.inputError,
        ]}
        autoCapitalize="none"
      />
      {hasError('repositoryName') && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        placeholder="Rating between 0 and 100"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        style={[
          styles.input,
          styles.inputSpacing,
          hasError('rating') && styles.inputError,
        ]}
      />
      {hasError('rating') && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <TextInput
        placeholder="Review"
        placeholderTextColor={theme.colors.placeholder}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        style={[
          styles.input,
          styles.inputSpacing,
          hasError('text') && styles.inputError,
        ]}
        multiline
      />

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  )
}

export default CreateReviewForm
