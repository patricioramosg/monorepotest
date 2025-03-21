import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Film } from '@/types/interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FAVORITES_KEY } from '@/constants/keys'
import { COLORS } from '@/constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'

const Page = () => {
  const [favorites, setFavorites] = useState<Film[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchFavorites = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY)
      if (favorites) {
        setFavorites(JSON.parse(favorites))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setRefreshing(false)
    }
  }

  //* esto se ejecutara cada vez que se regrese a esta pantalla.
  useFocusEffect(
    useCallback(() => {
      fetchFavorites()
    }, [])
  )

  const onRefresh = () => {
    setRefreshing(true)
    fetchFavorites()
  }

  const removeFavorite = async (film: Film) => {
    const updatedFavorites = favorites.filter((f) => f.episode_id !== film.episode_id)
    setFavorites(updatedFavorites)

    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
    } catch (error) {
      console.error(error)
    }
  }

  const renderItem = ({ item }: { item: Film }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity onPress={() => removeFavorite(item)}>
        <Ionicons name="trash-outline" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.episode_id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.text} />
        }
      />
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.itemBackground,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text
  }
})
