import {useEffect, useState} from "react";
import {ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {useRouter} from "expo-router";
import {useAuth} from "@/contexts/AuthContext";
import NoteList from "@/components/NoteList";
import AddNoteModal from "@/components/AddNoteModal";
import noteService from "@/services/noteService";

// Current bug in React Native Alert module stopping it from running even on vanilla installs when using in different browsers
// Alert does work on Android emulator so it looks like a browser issue
// Failed to work on Browsers - Brave, Edge & LibreWolf

const NoteScreen = () => {
    const router = useRouter();
    // Overload the local loading state with the one dedicated to authentication
    const {user, loading: authLoading} = useAuth();

    const [notes, setNotes] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Only runs if the user changes or if the authentication is loading
    useEffect(() => {
        // If not loading & no user then redirect to authentication section
        if (!authLoading && !user) {
            router.replace("/auth");
        }
    }, [user, authLoading]);

    // Only fetch notes if we have a logged in user
    useEffect(() => {
        if (user) {
            fetchNotes();
        }
    }, [user]);

    const fetchNotes = async () => {
        setLoading(true);
        const response = await noteService.getNotes(user.$id);

        if (response.error) {
            setError(response.error);
            Alert.alert("Error", response.error);
        } else {
            setNotes(response.data);
            setError(null);
        }

        setLoading(false);
    };

    // Add new note
    const addNote = async () => {
        if (newNote.trim === "") return;

        const response = await noteService.addNote(user.$id, newNote);

        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            setNotes([...notes, response.data]);
        }

        setNewNote("");
        setModalVisible(false);
    };

    // Delete note
    const deleteNote = async (id) => {
        const response = await noteService.deleteNote(id);
        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            setNotes(notes.filter((note) => note.$id !== id));
        }
    };

    // Edit note
    const editNote = async (id, newText) => {
        if (!newText.trim()) {
            Alert.alert("Error", "Note text cannot be empty");
            return;
        }

        const response = await noteService.updateNote(id, newText);
        if (response.error) {
            Alert.alert("Error", response.error);
        } else {
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.$id === id ? {...note, text: response.data.text} : note
                )
            );
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007bff"/>
            ) : (
                <>
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    {notes.length === 0 ? (
                        <Text style={styles.noNotesText}>You do not have any notes</Text>
                    ) : (
                        <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote}/>
                    )}
                </>
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+ Add Note</Text>
            </TouchableOpacity>

            <AddNoteModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                newNote={newNote}
                setNewNote={setNewNote}
                addNote={addNote}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16,
    },
    noNotesText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: "#555",
        marginTop: 15,
    },
});

export default NoteScreen;
