import Button from "@mui/material/Button";
import { useTheme, useMediaQuery } from "@mui/material";

const FormButton = ({
    variant = "contained",
    component = "button",
    size = "medium",
    color = "primary",
    onClick,
    disabled = false,
    node,
    sx = {}
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Button
            variant={variant}
            component={component}
            size={size}
            color={color}
            onClick={onClick}
            disabled={disabled}
            fullWidth
            sx={{
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 500,
                minHeight: { xs: '48px', sm: '40px' },
                py: { xs: 1.5, sm: 1.2 },
                px: { xs: 2, sm: 1.5 },
                fontSize: { xs: '14px', sm: '16px' },
                '&:active': {
                    transform: 'scale(0.98)',
                    transition: 'transform 0.1s ease'
                },
                '&:disabled': {
                    opacity: 0.6,
                    cursor: 'not-allowed'
                },
                '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: theme.palette.primary.main,
                    outlineOffset: '2px'
                },
                ...sx
            }}
        >
            {node}
        </Button>
    );
};

export default FormButton;