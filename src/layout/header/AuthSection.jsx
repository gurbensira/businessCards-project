import { Box, Button, IconButton } from "@mui/material";
import HeaderLink from "./HeaderLink";
import { useTheme as useCustomTheme } from "../../providers/CustomThemeProvider";

function AuthSection({ user, logout, isMobile }) {
    const { toggleMode, isDark } = useCustomTheme();

    if (isMobile) {
        return (
            <IconButton
                onClick={toggleMode}
                sx={{
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                }}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                {isDark ? '☀️' : '🌙'}
            </IconButton>
        );
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1
        }}>
            {user ? (
                <Button
                    onClick={logout}
                    sx={{
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                    }}
                >
                    Log out
                </Button>
            ) : (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <HeaderLink to="/register" label="Register" />
                    <HeaderLink to="/login" label="Login" />
                </Box>
            )}

            <Button
                onClick={toggleMode}
                sx={{
                    color: 'white',
                    minWidth: 'auto',
                    px: 2,
                    '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                }}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                {isDark ? 'Light' : 'Dark'} mode
            </Button>
        </Box>
    );
}

export default AuthSection;