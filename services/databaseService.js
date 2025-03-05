import { database } from "./appwrite";

// Will handle reusable CRUD functionality

const databaseService = {
  // List documents taking in databse id and colleciton id (a NoSQL version of a table)
  async listDocuments(dbId, colId) {
    try {
      // .listDocuments part of SDK of database object
      // this differs from the async function above which we could call getDocuments if we liked
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error("Error fetching documents", error.message);
      return { error: error.message };
    }
  },

  // Create document
  async createDocument(dbId, colId, data, id = null) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data);
    } catch (error) {
      console.error("Error creating document", message);
      return {
        error: error.message,
      };
    }
  },

  // Update document
  async updateDocument(){

  },

  // Delete document
  async deleteDocument(dbId, colId, id) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting document", error.message);
      return {
        error: error.message,
      };
    }
  },
};

export default databaseService;
