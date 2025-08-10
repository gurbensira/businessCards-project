import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    useTheme,
    useMediaQuery
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useMemo } from 'react';
import { useTheme as useCustomTheme } from "../../providers/CustomThemeProvider";
import { useCurrentUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesDict";

import MobileNavigation from "./MobileNavigation";
import DesktopNavigation from "./DesktopNavigation";
import AuthSection from "./AuthSection";
import SearchBar from "./SearchBar";

function Header() {
    const { toggleMode } = useCustomTheme();
    const { user, logout } = useCurrentUser();
    const isBusiness = user?.isBusiness;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navigationItems = useMemo(() => [
        { to: ROUTES.root, label: "Home" },
        { to: ROUTES.about, label: "About" },
        ...(user ? [{ to: ROUTES.favorite, label: "Favorite cards" }] : []),
        ...(user && isBusiness ? [{ to: ROUTES.myCards, label: "My cards" }] : []),
        // { to: ROUTES.sandBox, label: "Sand box" }
    ], [user, isBusiness]);

    const authItems = useMemo(() => user ? [
        { action: logout, label: "Log out" }
    ] : [
        { to: ROUTES.register, label: "Register" },
        { to: ROUTES.login, label: "Login" }
    ], [user, logout]);

    const handleMobileMenuToggle = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            <AppBar position="sticky" color="primary" elevation={10}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: 1, sm: 2 },
                    minHeight: { xs: 56, sm: 64 },
                    gap: { xs: 1, sm: 2 }
                }}>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 0
                    }}>
                        {isMobile ? (
                            <IconButton
                                color="inherit"
                                aria-label="open menu"
                                onClick={handleMobileMenuToggle}
                                sx={{
                                    mr: 1,
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        ) : (
                            <DesktopNavigation navigationItems={navigationItems} />
                        )}
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flex: { xs: 1, md: '0 1 auto' },
                        maxWidth: { xs: '100%', md: 350 },
                        mx: { xs: 0, sm: 1, md: 2 }
                    }}>
                        <SearchBar />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 0
                    }}>
                        <AuthSection
                            user={user}
                            logout={logout}
                            isMobile={isMobile}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            <MobileNavigation
                isOpen={mobileMenuOpen}
                onClose={handleMobileMenuClose}
                navigationItems={navigationItems}
                authItems={authItems}
                onThemeToggle={toggleMode}
            />
        </>
    );
}

export default Header;


