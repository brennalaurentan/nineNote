// styles

// components / pages / images

// tools
import { Typography, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

const SuccessSnackBar = () => {
    const [loginSuccess, setloginSuccess] = useState(true);
    
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            autoHideDuration={3000}
            open={loginSuccess}
            onClose={() => setloginSuccess(false)}
            key="top center"
        >
            <Alert severity="success" sx={{ width: "100%" }}>
                <Typography variant="tag_thin">
                    You have logged in successfully.
                </Typography>
            </Alert>
        </Snackbar>
    )
}

export default SuccessSnackBar