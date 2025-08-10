import { Box } from "@mui/material";
import HeaderLink from "./HeaderLink";

function DesktopNavigation({ navigationItems }) {
    return (
        <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 0.5
        }}>
            {navigationItems.map((item) => (
                <HeaderLink
                    key={item.to}
                    to={item.to}
                    label={item.label}
                />
            ))}
        </Box>
    );
}

export default DesktopNavigation;