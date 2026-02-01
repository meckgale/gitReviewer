import { StyleSheet, View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList/index'
import SignIn from './SignIn'
import AppBar from './AppBar'
import SingleRepository from './SingleRepository'
import CreateReview from './CreateReview'
import SignUp from './SignUpForm'
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repositories/:id" element={<SingleRepository />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
