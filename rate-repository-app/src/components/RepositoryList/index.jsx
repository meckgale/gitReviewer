import { useState, useCallback } from 'react'
import { Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from '../RepositoryItem'
import useRepositories from '../../hooks/useRepositories'
import RepositoryListHeader from './RepositoryListHeader'
import theme from '../../theme'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.backgroundColor.colorSecondary,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const getOrderVariables = (order) => {
  switch (order) {
    case 'HIGHEST':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
    case 'LOWEST':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
    case 'LATEST':
    default:
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
  }
}

export const RepositoryListContainer = ({
  repositories,
  order,
  setOrder,
  setSearchKeyword,
  onEndReach,
}) => {
  const navigate = useNavigate()

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
      <RepositoryItem item={item} />
    </Pressable>
  )

  const renderHeader = useCallback(
    () => (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        setSearchKeyword={setSearchKeyword}
      />
    ),
    [order, setOrder, setSearchKeyword],
  )

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={renderHeader}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      // other props
    />
  )
}

const RepositoryList = () => {
  const [order, setOrder] = useState('LATEST')
  const [searchKeyword, setSearchKeyword] = useState(undefined)

  const { orderBy, orderDirection } = getOrderVariables(order)
  const { repositories, fetchMore } = useRepositories({
    first: 8,
    orderBy,
    orderDirection,
    searchKeyword,
  })

  const onEndReach = () => {
    console.log('You have reached the end of the list')
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
