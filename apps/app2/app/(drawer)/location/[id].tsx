import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import React, { useCallback, useState } from "react"
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useSQLiteContext } from "expo-sqlite"
import type { Task } from "@/types/interfaces"
import { useFocusEffect } from "@react-navigation/native"
import TaskListItem from "@/components/TaskListItem"

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>() //* el id sacado de useLocalSearchParams tiene que ser tipeado como string.
  const router = useRouter()
  const db = useSQLiteContext()
  const [tasks, setTasks] = useState<Task[]>()
  const [locationName, setLocationName] = useState<string>("")

  //* el siguiente patron asegura que los datos se recargen cuando se navega desde el drawer u otra parte de la app o cuando cambio el id de location.
  const loadLocationData = useCallback(async () => {
    //*función memoizada, cargara task de un id especifico
    const [location] = await db.getAllAsync<{ name: string }>(
      "SELECT * FROM locations WHERE id = ?",
      [Number(id)]
    ) //* ocupamos el id como numero para buscar dentro de la db, y sacamos 'name' como string.
    console.log("🚀 ~ loadLocationData ~ location:", location)
    if (location) {
      setLocationName(location.name)
    }

    const tasks = await db.getAllAsync<Task>(
      "SELECT * FROM tasks WHERE locationId = ?",
      [Number(id)]
    ) //* podemos sacar las tasks de un location especifico (el de esta vista).
    setTasks(tasks)
  }, [id, db])
  console.log("🚀 ~ loadLocationData ~ tasks:", tasks)

  useFocusEffect(
    //*la gracia de useFocusEffect es que se ejecuta solo cuando la pantalla esta activa. ideal para recargar datos.
    useCallback(() => {
      //*este useFocusEffect solo se ejecutara si loadLocationData cambia.
      loadLocationData()
    }, [loadLocationData])
  )

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: locationName || "Tasks" }} />
      <FlatList
        ListEmptyComponent={<Text>no tasks found</Text>}
        data={tasks}
        renderItem={({ item }) => <TaskListItem task={item} />}
      />
      <Link href={`/location/${id}/new-task`} asChild>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#F2A310",
    borderRadius: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  fabText: {
    color: "#fff",
    fontSize: 24
  }
})
