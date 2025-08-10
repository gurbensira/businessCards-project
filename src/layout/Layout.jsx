import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import Main from './main/Main'
import { Box } from '@mui/material'

function Layout({ children }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Main sx={{ flex: 1, }}>{children}</Main>
            <Footer />
        </Box>
    )
}
export default Layout
