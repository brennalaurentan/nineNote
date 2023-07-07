// styles

// components / pages / images

// tools
import { Alert, AlertTitle, Typography, Box } from '@mui/material';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

const AlertDisplay = () => {
    return (
        <Box width="400px">
            <Alert icon={<EmojiObjectsOutlinedIcon fontSize="inherit" />} severity="warning">
                <AlertTitle>
                    <Typography variant="tag_bold">
                        Already know which modules you are exempted from?
                    </Typography>
                </AlertTitle>
                You may select your exempted modules in the Graduation Progress Tracker!
            </Alert>
        </Box>

    )
}

export default AlertDisplay