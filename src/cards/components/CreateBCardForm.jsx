import React from 'react';
import { TextField, Box, IconButton, Grid, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import bcardSchema from "../models/bcardSchema";
import initialBCardForm from "../helpers/initialForms/initialBCardForm";
import normalizeBCard from "../helpers/normalization/normalizeBCard";
import bcardFormFields from "../helpers/cardsFormFields/bcardFormFields";
import ClearIcon from '@mui/icons-material/Clear';
import { textFieldStyle } from "../helpers/formTextFieldStyle/textFieldStyle";
import { useSnack } from "../../providers/SnackbarProvider";


function CreateBCardForm({ onClick, onCardCreated }) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const fields = bcardFormFields;
    const setSnack = useSnack();

    const handleCreateCard = async (cardDetails) => {
        try {
            const token = localStorage.getItem("my token");
            const normalizedData = normalizeBCard(cardDetails);

            const response = await axios.post(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                normalizedData,
                {
                    headers: {
                        'x-auth-token': token
                    }
                }
            );

            console.log("Card created successfully:", response);

            if (onCardCreated) {
                onCardCreated();
            }

        } catch (error) {
            console.error("Error creating card:", error);
            if (error.response) {
                alert(error.response.data || "Failed to create card");
            } else {
                alert("Network error. Please try again.");
            }
        }
    };

    const { formDetails, errors, handleChange, handleSubmit } = useForm(
        initialBCardForm,
        bcardSchema,
        handleCreateCard,
        setSnack
    );

    const getFieldInputProps = (field) => {
        const inputProps = {};

        if (field.autoComplete) inputProps.autoComplete = field.autoComplete;
        if (field.autoCapitalize) inputProps.autoCapitalize = field.autoCapitalize;
        if (field.inputMode) inputProps.inputMode = field.inputMode;

        return inputProps;
    };

    const getFieldStyles = (field) => {
        if (field.multiline) {
            return {
                ...textFieldStyle,
                '& .MuiOutlinedInput-root': {
                    ...textFieldStyle['& .MuiOutlinedInput-root'],
                    minHeight: 'auto'
                }
            };
        }
        return textFieldStyle;
    };

    // Dark mode aware styles
    const overlayBackgroundColor = theme.palette.mode === 'dark'
        ? 'rgba(0,0,0,0.8)'
        : 'rgba(0,0,0,0.5)';

    const closeButtonStyles = {
        position: "fixed",
        top: { xs: 8, sm: 16 },
        right: { xs: 8, sm: 16 },
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : 'white',
        color: theme.palette.mode === 'dark' ? '#fff' : '#666',
        zIndex: 1301,
        boxShadow: 2,
        width: { xs: 44, sm: 40 },
        height: { xs: 44, sm: 40 },
        "&:hover": {
            backgroundColor: theme.palette.mode === 'dark' ? '#444' : "#f5f5f5"
        }
    };

    const formContainerStyles = {
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : 'white',
        borderRadius: { xs: 0, sm: 2 },
        boxShadow: { xs: 'none', sm: 3 },
        m: 0,
        maxWidth: 'none',
        width: '100%',
        height: { xs: '100%', sm: 'auto' },
        display: 'flex',
        flexDirection: 'column',
        border: theme.palette.mode === 'dark' ? '1px solid #333' : 'none',
        ...(isMobile && {
            overflowY: 'auto',
            paddingTop: 3,
        })
    };

    return (
        <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: overlayBackgroundColor,
            zIndex: 1300,
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'center',
            overflow: 'auto',
            p: { xs: 0, sm: 2 },
            WebkitOverflowScrolling: 'touch'
        }}>

            <IconButton
                onClick={onClick}
                sx={closeButtonStyles}
            >
                <ClearIcon fontSize={isMobile ? 'medium' : 'small'} />
            </IconButton>

            <Box sx={{
                width: '100%',
                maxWidth: { xs: '100%', sm: '600px', md: '800px' },
                height: { xs: '100vh', sm: 'auto' },
                my: { xs: 0, sm: 2 },
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Form
                    onSubmit={handleSubmit}
                    onReset={() => { }}
                    title={"Create Business Card"}
                    styles={formContainerStyles}
                >
                    {fields.map((field) => (
                        <Grid
                            item
                            xs={12}
                            sm={field.fullWidth ? 12 : 6}
                            key={field.name}
                            data-full-width={field.fullWidth ? "true" : undefined}
                        >
                            <TextField
                                name={field.name}
                                label={field.label}
                                type={field.type}
                                error={!!errors[field.name]}
                                helperText={errors[field.name]}
                                onChange={handleChange}
                                value={formDetails[field.name]}
                                fullWidth
                                multiline={field.multiline || false}
                                rows={field.multiline ? (isMobile ? 3 : 4) : undefined}
                                sx={getFieldStyles(field)}
                                inputProps={getFieldInputProps(field)}
                            />
                        </Grid>
                    ))}
                </Form>
            </Box>
        </Box>
    );
}

export default CreateBCardForm;