import { CircularProgress, circularProgressClasses, Box, Typography } from '@mui/material';

const Circular_PB = () => {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) => '#FFE8E4',
                }}
                size={60}
                thickness={5}
                value={100}
            />
            <CircularProgress
                variant="determinate"
                disableShrink
                sx={{
                    color: (theme) => theme.palette.orange.main,
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={60}
                thickness={5}
                value={10}
            />
        </Box>
    )
}

export default Circular_PB