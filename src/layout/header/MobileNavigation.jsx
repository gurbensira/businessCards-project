import {
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useTheme as useCustomTheme } from "../../providers/CustomThemeProvider";

function MobileNavigation({
    isOpen,
    onClose,
    navigationItems,
    authItems,
    onThemeToggle
}) {
    const { isDark } = useCustomTheme();

    return (
        <Drawer
            anchor="left"
            open={isOpen}
            onClose={onClose}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 280,
                    backgroundColor: isDark ? '#424242' : '#fff',
                }
            }}
        >
            <Box sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 1,
                borderColor: 'divider'
            }}>
                <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Menu
                </Box>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <List sx={{ flex: 1 }}>
                {navigationItems.map((item) => (
                    <ListItem key={item.to || item.label} disablePadding>
                        <ListItemButton
                            component="a"
                            href={item.to}
                            onClick={onClose}
                            sx={{
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
                                }
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: '1rem',
                                    fontWeight: 500
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}

                <Box sx={{
                    borderTop: 1,
                    borderColor: 'divider',
                    my: 1
                }} />

                {authItems.map((item) => (
                    <ListItem key={item.to || item.label} disablePadding>
                        <ListItemButton
                            component={item.to ? "a" : "button"}
                            href={item.to}
                            onClick={() => {
                                if (item.action) item.action();
                                onClose();
                            }}
                            sx={{
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
                                }
                            }}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{
                                    fontSize: '1rem',
                                    fontWeight: 500
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            onThemeToggle();
                            onClose();
                        }}
                        sx={{
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'
                            }
                        }}
                    >
                        <ListItemText
                            primary={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
                            primaryTypographyProps={{
                                fontSize: '1rem',
                                fontWeight: 500
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}

export default MobileNavigation;