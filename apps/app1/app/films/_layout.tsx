import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { COLORS } from '@/constants/colors'

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.background
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        contentStyle: {
          backgroundColor: COLORS.background //* podemos estilizar la vista del stack desde layout de la ruta.
        }
      }}
    >
      <Stack.Screen name="index" options={{ title: 'All films' }} />
      <Stack.Screen name="[id]" options={{ title: 'Film details' }} />
    </Stack>
  )
}

export default Layout
