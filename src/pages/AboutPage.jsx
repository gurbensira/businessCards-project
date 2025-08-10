import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';

function AboutPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));

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
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                mb: { xs: 2, md: 3 }
            }}>
                <Container maxWidth="lg">
                    <Typography variant={isMobile ? 'h4' : 'h2'} sx={{
                        py: { xs: 2, md: 3 },
                        color: 'primary.main',
                        fontWeight: 500,
                        textAlign: { xs: 'center', md: 'left' }
                    }}>
                        About BCard
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 2, md: 4 }
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: { xs: '100%', sm: '90%', md: '80%' },
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    borderRadius: { xs: 2, md: 3 },
                    p: { xs: 3, sm: 4, md: 5 },
                    bgcolor: 'background.paper',
                    mx: { xs: 2, sm: 0 }
                }}>
                    <Typography variant={isMobile ? "h4" : "h3"} sx={{
                        mb: { xs: 2, md: 3 },
                        color: 'primary.main',
                        textAlign: 'center',
                        fontWeight: 600
                    }}>
                        Welcome to BCard
                    </Typography>

                    <Typography variant={isMobile ? "body1" : "h6"} sx={{
                        textAlign: { xs: 'center', md: 'left' },
                        maxWidth: { xs: '100%', md: '700px' },
                        lineHeight: { xs: 1.6, md: 1.8 },
                        color: 'text.secondary',
                        mb: { xs: 3, md: 4 },
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                    }}>
                        BCard is a comprehensive business directory platform that connects professionals
                        and businesses across various industries. Our platform allows you to discover,
                        search, and connect with local businesses and service providers. Whether you're
                        looking for creative services, technical expertise, or local professionals,
                        BCard makes it easy to find exactly what you need with our intuitive search
                        and filtering capabilities.
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: { xs: 3, sm: 4, md: 6 },
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '600px'
                    }}>
                        <Box sx={{
                            textAlign: 'center',
                            minWidth: { xs: '120px', sm: 'auto' }
                        }}>
                            <Typography variant={isMobile ? "h5" : "h4"} sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                                mb: 0.5
                            }}>
                                500+
                            </Typography>
                            <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary">
                                Business Cards
                            </Typography>
                        </Box>

                        <Box sx={{
                            textAlign: 'center',
                            minWidth: { xs: '120px', sm: 'auto' }
                        }}>
                            <Typography variant={isMobile ? "h5" : "h4"} sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                                mb: 0.5
                            }}>
                                15
                            </Typography>
                            <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary">
                                Categories
                            </Typography>
                        </Box>

                        <Box sx={{
                            textAlign: 'center',
                            minWidth: { xs: '120px', sm: 'auto' }
                        }}>
                            <Typography variant={isMobile ? "h5" : "h4"} sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                                mb: 0.5
                            }}>
                                25+
                            </Typography>
                            <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary">
                                Cities
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default AboutPage;