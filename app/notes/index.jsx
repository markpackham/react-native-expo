import { useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import NoteList from "../../components/NoteList";

const NoteScreen = () => {
  const [notes, setNotes] = useState([
    { id: "1", text: "Note one" },
    { id: "2", text: "Note two" },
    { id: "3", text: "Note three" },
    { id: "4", text: "Note four" },
  ]);

  // Add new note
  const addNote = () => {
    if (newNote.trim === "") return;

    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Date.now.toString(), text: newNote },
    ]);

    setNewNote("");
    setModalVisible(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");

  return (
    <View style={styles.container}>
      <NoteList notes={notes} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>

        {/* Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add a new note</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter note..."
                placeholderTextColor="#aaa"
                value={newNote}
                onChangeText={setNewNote}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveButton} onPress={addNote}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
  noNotesText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
  },
});

export default NoteScreen;
