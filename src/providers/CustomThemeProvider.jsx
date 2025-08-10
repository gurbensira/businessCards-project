import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('theme-mode');
            return savedTheme === 'dark';
        } catch (error) {
            console.warn('Error reading theme from localStorage:', error);
            return false;
        }
    });

    const toggleMode = () => {
        setIsDark(prev => {
            const newMode = !prev;
            try {
                localStorage.setItem('theme-mode', newMode ? 'dark' : 'light');
            } catch (error) {
                console.warn('Error saving theme to localStorage:', error);
            }
            return newMode;
        });
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-mode');

        if (!savedTheme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(prefersDark);
            localStorage.setItem('theme-mode', prefersDark ? 'dark' : 'light');
        }
    }, []);

    const theme = createTheme({
        palette: {
            mode: isDark ? 'dark' : 'light'
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <ThemeContext.Provider value={{ toggleMode, isDark }}>
                {children}
            </ThemeContext.Provider>
        </ThemeProvider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a Provider');
    return context;
};