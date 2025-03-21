import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import React, { useState } from "react"

type LocationFormProps = {
  onSubmit: (name: string) => void
}

const LocationForm = ({ onSubmit }: LocationFormProps) => {
  const [name, setName] = useState("")

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name)
      setName("")
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text>LocationForm</Text> */}
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>add location</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LocationForm

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection:'row',
    alignItems:'center',
    gap:8,
    padding:8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    flex:1,
    height:48
  },
  button: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 4,
    height:48,
    justifyContent:'center'
  },
  buttonText:{
    color:'#fff',
    fontWeight:'bold',
    // textTransform:'uppercase'
  }
})
