import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { Task } from "@/types/interfaces"
import { Link } from "expo-router"

type TaskListItemProps = {
  task: Task
}

const TaskListItem = ({ task }: TaskListItemProps) => {
  return (
    <Link href={`/location/${task.locationId.toString()}/new-task?taskId=${task.id.toString()}`} asChild>
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Text>{task.isUrgent ? "!" : "X"}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default TaskListItem

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
    gap: 16
  },
  iconContainer: {
    justifyContent: "center"
  },
  textContainer: {
    flex:1
  },
  title: {
    fontSize:16,
    fontWeight:'bold'
  },
  description: {
    color:'#666',
    fontSize:14
  }
})
