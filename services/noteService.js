import databaseService from "./databaseService";
import { ID, Query } from "react-native-appwrite";

// Appwrite database & collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // Get notes
  async getNotes() {
    const response = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  // Add new note
  async addNote(text) {
    if (!text) {
      return { error: "Note text cannot be empty" };
    }

    const data = {
      text: text,
      createdAt: new Date().toISOString(),
    };
    const response = await databaseService.createDocument(
      dbId,
      colId,
      data,
      ID.unique()
    );

    /*
optional chaining (?.) operator accesses an object's property or calls a function. If the object accessed or function called using this operator is undefined or null
    */
    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  // Delete note
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
};

export default noteService;
