import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'
import OrderPicker from './OrderPicker'

const RepositoryListHeader = ({ order, setOrder, setSearchKeyword }) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 500)

  useEffect(() => {
    const keyword = debouncedQuery.trim()

    setSearchKeyword(keyword.length > 0 ? keyword : undefined)
  }, [debouncedQuery, setSearchKeyword])

  return (
    <View>
      <Searchbar placeholder="Search" value={query} onChangeText={setQuery} />

      <OrderPicker value={order} onChange={setOrder} />
    </View>
  )
}

export default RepositoryListHeader
