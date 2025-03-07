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

  // Login
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

  // Get logged in user
  async getUser(email, password) {
    try {
      return await account.get();
    } catch (error) {
      console.error("Error getting user");
      return {
        error: error.message || "Failed to get user, please try again.",
      };
    }
  },

  // Logout
  async logout(){
    try {
        // Removes current user session
        await account.deleteSession('current')
    } catch (error) {
        console.error("Error logging user out");
        return {
          error: error.message || "Failed to logout user, please try again.",
        };
    }
  }
};

export default authService;