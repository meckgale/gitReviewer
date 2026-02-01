import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import theme from '../../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
})

const OrderPicker = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Picker selectedValue={value} onValueChange={onChange}>
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="HIGHEST" />
        <Picker.Item label="Lowest rated repositories" value="LOWEST" />
      </Picker>
    </View>
  )
}

export default OrderPicker
