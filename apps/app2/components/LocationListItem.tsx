import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { Location } from "@/types/interfaces"
import { Ionicons } from "@expo/vector-icons"
import { useSQLiteContext } from "expo-sqlite"

type LocationListItemProps = {
  location: Location
  onDelete: () => void
}

const LocationListItem = ({ location, onDelete }: LocationListItemProps) => {
  const db = useSQLiteContext()

  const handleDelete = async () => {
    await db.runAsync("DELETE FROM locations WHERE id = ?", [location.id])
    onDelete()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{location.name}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  )
}

export default LocationListItem

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 3,
    marginBottom: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333"
  },
  deleteButton: {
    padding: 8
  }
})
