// styles

// components / pages / images

// tools
import { Alert, AlertTitle, Typography, Box } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';

const AlertDisplay = () => {
    return (
        <Box width="400px">
            <Alert icon={<ReportIcon fontSize="inherit" />} severity="warning">
                <AlertTitle>
                    <Typography variant="tag_bold">
                        Important
                    </Typography>
                </AlertTitle>
                <Typography variant="tag_thin">
                    Please double check your credentials before proceeding to create your account.
                    You can only change your <b>password</b>, <b>matriculation year</b> and <b>course</b> once
                    your account is created.
                </Typography>
            </Alert>
        </Box>

    )
}

export default AlertDisplay