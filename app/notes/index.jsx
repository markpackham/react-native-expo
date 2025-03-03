import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const NoteScreen = () => {
  const [notes, setNotes] = useState([
    {id: '1', text:'Note one'},
    {id: '2', text:'Note two'},
    {id: '3', text:'Note two'},
    {id: '4', text:'Note two'},
  ])

  return (
    <View style={styles.container}>
      <Text>Notes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});

export default NoteScreen;
