import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { Film } from '@/types/interfaces'
import { COLORS } from '@/constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
import { FAVORITES_KEY } from '@/constants/keys'

const Page = () => {
  const { id } = useLocalSearchParams()
  const [film, setFilm] = useState<Film | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchFilm = async () => {
      // setLoading(true)
      try {
        const response = await fetch(`https://swapi.dev/api/films/${id}`)
        const data = await response.json()
        console.log('🚀 ~ fetchFilm ~ data:', data)
        setFilm(data)
        checkFavoriteStatus(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
        // setRefreshing(false)
      }
    }
    fetchFilm()
  }, [id])

  const checkFavoriteStatus = async (film: Film) => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY)
      if (favorites) {
        const favoriteFilms = JSON.parse(favorites) as Film[]
        // console.log("🚀 ~ checkFavoriteStatus ~ favoriteFilms:", favoriteFilms)
        setIsFavorite(favoriteFilms.some((f) => f.episode_id === film.episode_id))
      }
    } catch (error) {
      console.error(error)
    }
    console.log(isFavorite)
  }

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY)
      let favoriteFilms = favorites ? JSON.parse(favorites) : []

      if (isFavorite) {
        favoriteFilms = favoriteFilms.filter((f: Film) => f.episode_id !== film?.episode_id)
      } else {
        favoriteFilms.push(film)
      }
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteFilms))
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <View>
        <Text style={{ color: '#fff' }}>Loading ...</Text>
      </View>
    )
  }

  if (!film) {
    return (
      <View>
        <Text style={{ color: '#fff' }}>Film was not found</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={20} color={COLORS.text} />
            </TouchableOpacity>
          )
        }}
      />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.detail}>Episode: {film.episode_id}</Text>
      <Text style={styles.detail}>Director: {film.director}</Text>
      <Text style={styles.detail}>Producer: {film.producer}</Text>
      <Text style={styles.detail}>Date: {film.release_date}</Text>
      <Text style={styles.crawl}>{film.opening_crawl}</Text>
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16
  },
  detail: {
    fontSize: 16,
    color: COLORS.text
  },
  crawl: {
    fontSize: 30,
    color: COLORS.text,
    marginTop: 16,
    fontStyle: 'italic'
  }
})
