import { COLORS } from '@/constants/colors'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.background
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopColor: COLORS.text,
          borderTopWidth: 1
        },
        tabBarActiveTintColor: COLORS.text,
        tabBarInactiveTintColor: COLORS.inactive
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />"
      <Tabs.Screen
        name="films"
        options={{
          title: 'Films',
          tabBarLabel: ' tabbarlabel',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: 'People',
          tabBarLabel: 'all characters',
          tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarLabel: ' my favorites',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />
        }}
      />
    </Tabs>
  )
}
