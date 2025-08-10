import { TextField, Grid, Box } from "@mui/material";
import Form from "../../components/Form";
import useForm from "../../hooks/useForm";
import axios from "axios";
import loginSchema from "../models/loginSchema";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import { getUser, setTokenInLocalStorage } from "../services/localStorageService";
import { useCurrentUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const { setToken, setUser, user } = useCurrentUser();
    const navigate = useNavigate();

    const handleLogin = async (user) => {
        try {
            const response = await axios.post("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login", user);
            // console.log(response);
            setTokenInLocalStorage(response.data);
            setToken(response.data);
            setUser(getUser());
            navigate('/');
        } catch (error) {
            console.log(error);
            alert('The login failed');
        }
    };

    const isBusiness = user?.isBusiness;
    // console.log('is business? ' + isBusiness);

    const { formDetails, errors, handleChange, handleSubmit } = useForm(
        initialLoginForm,
        loginSchema,
        handleLogin
    );

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
                title={"Sign In Form"}
                styles={{
                    maxWidth: "500px",
                    width: "100%",
                    mx: 2
                }}
            >
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        label="Email *"
                        error={!!errors.email}
                        helperText={errors.email}
                        onChange={handleChange}
                        value={formDetails.email}
                        type="email"
                        fullWidth
                        sx={textFieldStyle}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        name="password"
                        label="Password *"
                        error={!!errors.password}
                        helperText={errors.password}
                        onChange={handleChange}
                        value={formDetails.password}
                        type="password"
                        fullWidth
                        sx={textFieldStyle}
                    />
                </Grid>
            </Form>
        </Box>
    );
}

export default LoginForm;