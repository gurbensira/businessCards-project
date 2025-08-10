import { AppBar, Toolbar, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesDict";

function Footer() {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            color="primary"
            elevation={10}
            sx={{
                top: 'auto',
                bottom: 0
            }}
        >
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Button
                    variant='text'
                    sx={{ color: 'white' }}
                    onClick={() => navigate(ROUTES.root)}
                >
                    Home
                </Button>
                <Button
                    variant='text'
                    sx={{ color: 'white' }}
                    onClick={() => navigate(ROUTES.about)}
                >
                    About
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;