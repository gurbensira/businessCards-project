import { Grid, FormControlLabel, Checkbox, TextField, Box } from "@mui/material";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import axios from "axios";
import signupSchema from "../models/signupSchema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import normalaizeUser from "../helpers/normalization/normalizeUser";
import { getUser, setTokenInLocalStorage } from "../services/localStorageService";
import { useCurrentUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import formFields from "../helpers/formFields/registerFormFieldsArr";
import { useSnack } from "../../providers/SnackbarProvider";


function RegisterForm() {
    const { setToken, setUser } = useCurrentUser();
    const navigate = useNavigate();
    const fields = formFields
    const setSnack = useSnack();


    const handleSighnup = async (userDetails) => {
        const userDetailsForServere = normalaizeUser(userDetails);
        try {
            const registerResponse = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users", userDetailsForServere);

            const loginData = {
                email: userDetails.email,
                password: userDetails.password
            };

            const loginResponse = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login", loginData);
            // console.log("Auto-login successful:", loginResponse);
            setSnack("Registration completed successfully")

            setTokenInLocalStorage(loginResponse.data);
            setToken(loginResponse.data);
            setUser(getUser());

            navigate('/');
        }
        catch (error) {
            console.error("Registration failed.", error);

            const errorMessage = error.response?.data;
            setSnack("error", errorMessage);

        }
    };

    const { formDetails, errors, handleChange, handleSubmit } = useForm(
        initialSignupForm,
        signupSchema,
        handleSighnup,
        setSnack
    );

    const handleChangeCheckBox = (e) => {
        handleChange({
            target: {
                name: "isBusiness",
                value: e.target.checked
            }
        });
    };

    const textFieldStyle = {
        backgroundColor: "white",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
            borderRadius: 1,
            backgroundColor: "white"
        },
        "& .MuiInputLabel-root": {
            color: "#666"
        }
    };

    return (
        <Box sx={{
            minHeight: "100vh",
            backgroundColor: "#f0f2f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: 4
        }}>
            <Form
                onSubmit={handleSubmit}
                onReset={() => { }}
                title={"Sign Up Form"}
                styles={{
                    maxWidth: "800px",
                    width: "100%",
                    mx: 2
                }}
            >

                {fields.map((field) => (
                    <Grid item xs={12} sm={6} key={field.name}>
                        <TextField
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            error={!!errors[field.name]}
                            helperText={errors[field.name]}
                            onChange={handleChange}
                            value={formDetails[field.name]}
                            fullWidth
                            sx={textFieldStyle}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formDetails.isBusiness || false}
                                onChange={handleChangeCheckBox}
                                color="primary"
                                sx={{
                                    color: "#666",
                                    "&.Mui-checked": {
                                        color: "#1976d2"
                                    }
                                }}
                            />
                        }
                        label="Signup as business"
                        name="isBusiness"
                        sx={{
                            color: "#666",
                            backgroundColor: "white",
                            borderRadius: 1,
                            // padding: 2,
                            margin: 0,
                            width: "100%"
                        }}
                    />
                </Grid>
            </Form>
        </Box>
    );
}

export default RegisterForm;