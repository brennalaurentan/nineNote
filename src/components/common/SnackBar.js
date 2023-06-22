// styles

// components / pages / images

// tools
import { Typography, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

const ErrorSnackBar = (error, text) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            autoHideDuration={2000}
            open={error}
            key="top center"
        >
            <Alert severity="error" sx={{ width: "100%" }}>
                <Typography variant="tag_thin">
                    {text}
                </Typography>
            </Alert>
        </Snackbar>
    )
}

const SuccessSnackBar = (text) => {
    const [loginSuccess, setLoginSuccess] = useState(true);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            autoHideDuration={2000}
            open={loginSuccess}
            onClose={() => setLoginSuccess(false)}
            key="top center"
        >
            <Alert severity="success" sx={{ width: "100%" }}>
                <Typography variant="tag_thin">
                    {text}
                </Typography>
            </Alert>
        </Snackbar>
    )
}

const SnackBar = ({ type, error, text }) => {
    return type === "error"
        ? ErrorSnackBar(error, text)
        : SuccessSnackBar(text);
}

export default SnackBar