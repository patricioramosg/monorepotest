import { Drawer } from "expo-router/drawer"
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import * as SQLite from "expo-sqlite"
import { Image, StyleSheet, Text, View } from "react-native"
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus
} from "@react-navigation/drawer"
import { usePathname, useRouter } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import { Location } from "@/types/interfaces"
import Logo from "@/assets/images/logo.png"

const db2 = SQLite.openDatabaseSync("reports.db")

const LOGO_IMAGE = Image.resolveAssetSource(Logo).uri

const CustomDrawerContent = (props: any) => {
  const router = useRouter()
  const { bottom } = useSafeAreaInsets()
  const db = SQLite.useSQLiteContext()
  const [locations, setLocations] = useState<Location[]>([])
  const isDrawerOpen = useDrawerStatus() === "open"
  const pathName = usePathname()

  useEffect(() => {
    if (isDrawerOpen) {
      loadLocations()
    }
  }, [isDrawerOpen])

  const loadLocations = async () => {
    console.log("loading locations")

    const locations = await db.getAllAsync<Location>("SELECT * FROM locations")
    setLocations(locations)
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <Image source={{ uri: LOGO_IMAGE }} style={styles.logo} />
        <View style={styles.locationsContainer}>
          <DrawerItemList {...props} />
          <Text style={styles.title}>Locations</Text>
          {locations.map((location) => {
            const isActive = pathName === `/location/${location.id}` //* si concuerda el pathname con la ruta del id, sabemos que la vista esta activa.
            return (
              <DrawerItem
                key={location.id}
                label={location.name}
                onPress={() => router.navigate(`/location/${location.id}`)}
                focused={isActive}
                activeTintColor="#F2A310"
                inactiveTintColor="#000"
              />
            )
          })}
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingBottom: 20 + bottom,
          borderTopWidth: 1,
          borderTopColor: "#dde3fe",
          padding: 16
        }}
      >
        <Text>copyright ridmRefactor 2025</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },
  locationsContainer: {
    marginTop: 20
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
    paddingTop: 24,
    color: "#a6a6a6"
  }
})

export default function DrawerLayout() {
  useDrizzleStudio(db2)

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerHideStatusBarOnOpen: true,
        drawerActiveTintColor: "#F2A310",
        headerTintColor: "#000"
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Manage Locations",
          title: "Home"
        }}
      />
      <Drawer.Screen
        name="location"
        options={{
          drawerLabel: "location",
          headerShown: false, //* ocultamos el header en drawer/layout ya que agregaremos uno dinámico en location/layout.
          drawerItemStyle: {
            display: "none" //* podemos ocultar esta ruta en el drawer, ya que queremos mostrar a sus rutas children.
          }
        }}
      />
    </Drawer>
  )
}
