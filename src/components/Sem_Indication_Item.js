import { Typography, Box } from "@mui/material"

const Sem_Indication_Item = ({ pos, value, active }) => {
    return (
        <Box
            padding="8px"
            bgcolor={active === true
                ? "light_blue.main"
                : "off_white.main"}
            sx={{
                border: 1,
                borderColor: 'light_gray.main',
                borderTopLeftRadius: pos === 1
                    ? '5px'
                    : '0px',
                borderTopRightRadius: pos === 4
                ? '5px'
                : '0px',
                borderBottomLeftRadius: pos === 1
                    ? '5px'
                    : '0px',
                borderBottomRightRadius: pos === 4
                ? '5px'
                : '0px',
            }}
        >
            <Typography
                variant="tag_bold"
                color={active === true
                    ? "white.main"
                    : "black.main"}
            >
                {value}
            </Typography>
        </Box>
    )
}

export default Sem_Indication_Item