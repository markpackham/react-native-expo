import {createContext, useContext, useEffect, useState} from "react";
import authService from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        setLoading(true);
        const response = await authService.getUser();

        if (response?.error) {
            // If an error, the user not logged in set them to null
            setUser(null);
        } else {
            setUser(response);
        }

        setLoading(false);
    };

    const login = async (email, password) => {
        const response = await authService.login(email, password);

        if (response?.error) {
            return response;
        }

        await checkUser();
        return {success: true};
    };

    const register = async (email, password) => {
        const response = await authService.register(email, password);

        if (response?.error) {
            return response;
        }

        // Log user in right after registering
        return login(email, password);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        await checkUser();
    };

    return (
        // Use React's Context API to share the functionality all over the app
        <AuthContext.Provider value={{user, login, register, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
};

// All our components will be able to access things like "login" or "user" via useAuth()
// eg const {login} = useAuth();
export const useAuth = () => useContext(AuthContext);