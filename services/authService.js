import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

const authService = {
  // Register a user
  async register(email, password) {
    try {
      const response = await account.create(ID.unique, email, password);
      return response;
    } catch (error) {
      console.error("Error authenticating", message);
      return {
        error: error.message || "Registeration failed, please try again.",
      };
    }
  },

  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      return response;
    } catch (error) {
      console.error("Error logging in", message);
      return {
        error: error.message || "Login failed, please try again.",
      };
    }
  },
};
