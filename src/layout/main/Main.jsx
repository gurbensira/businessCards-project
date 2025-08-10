import React from 'react'
import { Box } from '@mui/material'
import { useTheme } from "../../providers/CustomThemeProvider";

function Main({ children, sx }) {
    const { isDark } = useTheme();

    return (
        <Box sx={{
            backgroundColor: isDark ? '#333333' : '#e3f2fd',
            height: '100%',
            ...sx
        }}>
            {children}
        </Box>
    )
}

export default Main