import { useTheme, useMediaQuery } from "@mui/material";

export const useFormStyles = (spacing = 2, styles = {}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const getSpacing = () => {
        if (isMobile) return 2;
        if (isTablet) return 2.5;
        return spacing;
    };

    const getContainerPadding = () => {
        if (isMobile) return 2;
        if (isTablet) return 2.5;
        return 3;
    };

    const containerStyles = {
        maxWidth: "800px",
        width: "100%",
        margin: "0 auto",
        padding: getContainerPadding(),
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : "#f8f9fa",
        borderRadius: { xs: 1, sm: 2 },
        boxShadow: theme.palette.mode === 'dark'
            ? {
                xs: "0 2px 8px rgba(0,0,0,0.4)",
                sm: "0 4px 12px rgba(0,0,0,0.5)"
            }
            : {
                xs: "0 2px 8px rgba(0,0,0,0.1)",
                sm: "0 4px 12px rgba(0,0,0,0.15)"
            },
        mx: { xs: 1, sm: 2, md: "auto" },
        maxWidth: {
            xs: "calc(100vw - 16px)",
            sm: "calc(100vw - 64px)",
            md: "800px"
        },
        mt: { xs: 1, sm: 2 },
        mb: { xs: 2, sm: 3 },
        border: theme.palette.mode === 'dark' ? '1px solid #333' : 'none',
        ...styles
    };

    const titleStyles = {
        color: theme.palette.mode === 'dark' ? '#fff' : "#333",
        fontWeight: 500,
        letterSpacing: "0.5px",
        fontSize: {
            xs: "1.1rem",
            sm: "1.3rem",
            md: "1.5rem"
        },
        px: { xs: 1, sm: 2 },
        lineHeight: 1.2
    };

    const formGridStyles = {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(250px, 1fr))'
        },
        gap: getSpacing(),
        '& .MuiGrid-item': {
            gridColumn: 'span 1'
        },
        '& .MuiGrid-item[data-full-width="true"]': {
            gridColumn: { xs: 'span 1', sm: 'span 2' }
        },
        '& .MuiTextField-root': {
            '& .MuiInputBase-root': {
                fontSize: { xs: '16px', sm: '14px' },
                minHeight: { xs: '48px', sm: '40px' },
                backgroundColor: theme.palette.mode === 'dark' ? '#2a2a2a' : 'transparent',
                color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
            },
            '& .MuiInputLabel-root': {
                fontSize: { xs: '14px', sm: '14px' },
                color: theme.palette.mode === 'dark' ? '#bbb' : 'inherit',
            },
            '& .MuiFormHelperText-root': {
                fontSize: { xs: '12px', sm: '12px' },
                color: theme.palette.mode === 'dark' ? '#aaa' : 'inherit',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#555' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#777' : 'rgba(0, 0, 0, 0.87)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                }
            }
        }
    };

    const buttonContainerStyles = {
        mt: { xs: 3, sm: 4 },
        '& .MuiButton-root': {
            minHeight: { xs: '48px', sm: '40px' },
            fontSize: { xs: '14px', sm: '16px' },
            fontWeight: 500,
        }
    };

    const submitButtonStyles = {
        backgroundColor: theme.palette.mode === 'dark' ? "#607d8b" : "#90a4ae",
        color: "white",
        borderRadius: 1,
        textTransform: "uppercase",
        fontWeight: 600,
        py: isMobile ? 1.5 : 1.8,
        width: '100%',
        mb: isMobile ? 2 : 0,
        "&:hover": {
            backgroundColor: theme.palette.mode === 'dark' ? "#546e7a" : "#78909c"
        }
    };

    const cancelButtonStyles = {
        borderRadius: 1,
        textTransform: "uppercase",
        py: isMobile ? 1.2 : 1.5,
        borderColor: theme.palette.mode === 'dark' ? '#555' : 'inherit',
        color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
        '&:hover': {
            borderColor: theme.palette.mode === 'dark' ? '#777' : 'inherit',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.04)' : 'inherit'
        }
    };

    const resetButtonStyles = {
        borderRadius: 1,
        py: isMobile ? 1.2 : 1.5,
        minWidth: isMobile ? '48px' : 'auto',
        borderColor: theme.palette.mode === 'dark' ? '#555' : 'inherit',
        color: theme.palette.mode === 'dark' ? '#fff' : 'inherit',
        '&:hover': {
            borderColor: theme.palette.mode === 'dark' ? '#777' : 'inherit',
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'inherit'
        }
    };

    const buttonRowStyles = {
        display: 'flex',
        gap: 2,
        mb: isMobile ? 0 : 2,
        '& > *': { flex: 1 }
    };

    return {
        isMobile,
        isTablet,
        getSpacing,
        getContainerPadding,
        containerStyles,
        titleStyles,
        formGridStyles,
        buttonContainerStyles,
        submitButtonStyles,
        cancelButtonStyles,
        resetButtonStyles,
        buttonRowStyles
    };
};