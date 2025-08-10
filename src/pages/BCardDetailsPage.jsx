import { Box, Container, Typography, useTheme, useMediaQuery } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ROUTES from '../routes/routesDict'
import BCard from '../cards/components/BCard'
import CardDetails from '../cards/components/CardDetails'

function BCardDetailsPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const theme = useTheme()

    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'))

    const card = location.state?.card

    useEffect(() => {
        if (!card) {
            navigate(ROUTES.root)
        }
    }, [card, navigate])

    if (!card) {
        return <Typography>Loading...</Typography>
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            minHeight: '100vh',

        }}>

            <Box sx={{
                width: '100%',
                bgcolor: 'white',
                mb: { xs: 2, md: 3 },
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
                <Container maxWidth="lg">
                    <Typography variant={isMobile ? 'h4' : 'h2'} sx={{
                        py: { xs: 2, md: 3 },
                        color: 'primary.main',
                        fontWeight: 500,
                        textAlign: { xs: 'center', md: 'left' }
                    }}>
                        BCard Details
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ flex: 1, py: 2 }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: { xs: 3, md: 0 },
                    height: { xs: 'auto', md: '70vh' },
                    minHeight: { xs: 'auto', md: '500px' },
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    borderRadius: 3,
                    bgcolor: 'white',
                    border: '1px solid #e0e0e0',
                    overflow: 'hidden'
                }}>
                    <Box sx={{
                        width: { xs: '100%', md: '50%' },
                        height: { xs: 'auto', md: '100%' },
                        borderRight: { xs: 'none', md: '1px solid #f0f0f0' },
                        borderBottom: { xs: '1px solid #f0f0f0', md: 'none' },
                        bgcolor: '#fafafa'
                    }}>
                        <Box sx={{
                            p: { xs: 2, sm: 3 },
                            height: { xs: 'auto', md: '100%' },
                            overflow: { xs: 'visible', md: 'auto' }
                        }}>
                            <CardDetails card={card} />
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: { xs: '100%', md: '50%' },
                        height: { xs: 'auto', md: '100%' },
                        minHeight: { xs: '400px', md: 'auto' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: 'white',
                        p: 0
                    }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            '& > *': {
                                margin: 'auto'
                            }
                        }}>
                            <BCard
                                key={card._id}
                                card={card}
                                disableActions={true}
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default BCardDetailsPage;