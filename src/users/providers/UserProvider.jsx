import { createContext, useContext, useEffect, useState } from "react";
import { getToken, getUser, removeToken } from "../services/localStorageService";
const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(getUser());
    const [token, setToken] = useState(getToken());


    useEffect(() => {
        if (token) {
            setUser(getUser());
        } else {
            setUser(null);
        }
    }, [token]);

    const logout = () => {
        removeToken();
        setToken(null);
        setUser(null);

    };

    return (
        <UserContext.Provider value={{ user, setUser, token, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useCurrentUser must be used within a Provider');
    return context;
}