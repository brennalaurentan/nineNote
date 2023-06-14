// styles

// components / pages / images

// tools
import { CircularProgress, circularProgressClasses, Box } from '@mui/material';

const CircularProgressBar = () => {
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

export default CircularProgressBar