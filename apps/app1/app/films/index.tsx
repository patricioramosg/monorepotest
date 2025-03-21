import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '@/constants/colors'
import { Film } from '@/types/interfaces'
import ListEmptyComponent from '@/components/ListEmptyComponent'
import FilmItem from '@/components/FilmItem'

const Page = () => {
  const [films, setFilms] = useState<Film[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchFilms = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://swapi.dev/api/films/')
      const data = await response.json()
      // console.log("🚀 ~ fetchFilms ~ data:", data)
      setFilms(data.results)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchFilms()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchFilms()
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        keyExtractor={(item) => item.episode_id.toString()}
        // renderItem={renderItem} //* es mejor hacer una funcion aparate para el renderizado, asi mantenemos codigo limpio.
        renderItem={({ item }) => <FilmItem item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchFilms} tintColor={COLORS.text} />
        }
        // ListEmptyComponent={() => <Text style={{color: COLORS.text}}>no data</Text>}
        ListEmptyComponent={<ListEmptyComponent loading={loading} message="No films found" />}
      />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground
  }
})
