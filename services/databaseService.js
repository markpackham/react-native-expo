import { database } from "./appwrite";

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
};

export default databaseService;
