// styles

// components / pages / images
import LinearProgressBar from './LinearProgressBar';
import CircularProgressBar from './CircularProgressBar';

// tools
import { Stack, Box, Typography, Card, CardContent } from '@mui/material';

const Linear_PB_Label = (numerator, denominator) => {
    return (
        <Stack gap="8px">
            <Stack direction="row" gap="8px" alignItems="center">
                <Box width="320px">
                    <LinearProgressBar variant="determinate" value={numerator / denominator * 100} />
                </Box>
                <Typography variant="tag_bold">{numerator / denominator * 100}%</Typography>
            </Stack>
        </Stack>
    )
}

const Circular_PB_Label = (name, numerator, denominator) => {
    return (
        <Card sx={{
            width: "380px",
            height: "90px",
            bgcolor: "off_white.main",
            borderRadius: "15px",
            boxShadow: "none"
        }}>
            <CardContent>
                <Stack direction="row" alignItems="center" gap="24px">
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <CircularProgressBar progress={numerator / denominator * 100} />
                        <Typography
                            variant="tag_bold"
                            position="absolute">
                            {numerator}/{denominator}
                        </Typography>
                    </Box>
                    <Typography variant="body_bold">{name}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

const ProgressBarLabel = ({ type, name, numerator, denominator }) => {
    return type === "linear"
        ? Linear_PB_Label(numerator, denominator)
        : Circular_PB_Label(name, numerator, denominator);
}

export default ProgressBarLabel