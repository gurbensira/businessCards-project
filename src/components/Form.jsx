import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";
import { useTheme, useMediaQuery } from "@mui/material";
import { useFormStyles } from "../styles/FormStyles";

function Form({
    title = "",
    onSubmit,
    onReset,
    to = "/",
    color = "inherit",
    spacing = 2,
    styles = {},
    children,
}) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const {
        containerStyles,
        titleStyles,
        formGridStyles,
        buttonContainerStyles,
        submitButtonStyles,
        cancelButtonStyles,
        resetButtonStyles,
        buttonRowStyles
    } = useFormStyles(spacing, styles);

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

    return (
        <Box sx={containerStyles}>
            <Typography
                align="center"
                variant="h5"
                component="h1"
                mb={{ xs: 2, sm: 3 }}
                sx={titleStyles}
            >
                {title.toUpperCase()}
            </Typography>

            <Box
                component="form"
                color={color}
                onSubmit={onSubmit}
                autoComplete="off"
                noValidate
            >
                <Box sx={formGridStyles}>
                    {children}
                </Box>

                <Box sx={buttonContainerStyles}>
                    {isMobile ? (
                        <>
                            <FormButton
                                node="SUBMIT"
                                onClick={onSubmit}
                                size="large"
                                sx={submitButtonStyles}
                            />

                            <Box sx={buttonRowStyles}>
                                <FormButton
                                    node="CANCEL"
                                    color="error"
                                    component="div"
                                    variant="outlined"
                                    onClick={() => navigate(to)}
                                    sx={cancelButtonStyles}
                                />
                                <FormButton
                                    node={<LoopIcon />}
                                    variant="outlined"
                                    component="div"
                                    onClick={onReset}
                                    sx={resetButtonStyles}
                                />
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box sx={buttonRowStyles}>
                                <FormButton
                                    node="CANCEL"
                                    color="error"
                                    component="div"
                                    variant="outlined"
                                    onClick={() => navigate(to)}
                                    sx={cancelButtonStyles}
                                />
                                <FormButton
                                    node={<LoopIcon />}
                                    variant="outlined"
                                    component="div"
                                    onClick={onReset}
                                    sx={resetButtonStyles}
                                />
                            </Box>

                            <FormButton
                                node="SUBMIT"
                                onClick={onSubmit}
                                size="large"
                                sx={submitButtonStyles}
                            />
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default Form;