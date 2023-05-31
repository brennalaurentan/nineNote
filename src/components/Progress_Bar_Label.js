import Linear_PB from './Linear_PB';
import Circular_PB from './Circular_PB';
import { Stack, Box, Typography, Card, CardContent, Container } from '@mui/material';

const Linear_PB_Label = () => {
    return (
        <Stack gap="8px">
            <Stack direction="row" gap="8px" alignItems="center">
                <Box width="272px">
                    <Linear_PB variant="determinate" value={10} />
                </Box>
                <Typography variant="tag_bold">10%</Typography>
            </Stack>
        </Stack>
    )
}

const Circular_PB_Label = (name) => {
    return (
        <Card sx={{ width: "300px", height: "90px", bgcolor: "off_white.main", borderRadius: "15px", boxShadow: "none" }}>
            <CardContent>
                <Stack direction="row" alignItems="center" gap="24px">
                    <Box display="flex" alignItems="center">
                        <Circular_PB />
                        <Typography variant="tag_bold" position="absolute" ml="13px">8/40</Typography>
                    </Box>
                    <Typography variant="tag_bold">{name}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

const Progress_Bar_Label = ({ type, name }) => {
    return type == "linear"
        ? Linear_PB_Label()
        : Circular_PB_Label(name);
}

export default Progress_Bar_Label