import { styled } from '@mui/material/styles';
import { LinearProgress, linearProgressClasses } from '@mui/material';

const Linear_PB = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 3,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.light_gray.main,
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 3,
        backgroundColor: theme.palette.green.main,
    },
}));

export default Linear_PB