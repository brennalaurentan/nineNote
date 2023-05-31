import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

const Tab_Item = ({id, selected_id, value, onClickAction}) => {
    return (
        <ListItemButton selected={selected_id === id} onClick={onClickAction}>
            <ListItemIcon>
                <BookIcon sx={{color: selected_id === id
                                        ? "blue.main"
                                        : "black.main"}}/>
            </ListItemIcon>
            <ListItemText 
                disableTypography
                primary={
                    <Typography 
                        variant={selected_id === id
                                    ? "body_bold"
                                    : "body_thin"}
                        sx={{color: selected_id === id
                                        ? "blue.main"
                                        : "black.main",
                        }}
                    >
                        {value}
                    </Typography>}
            />
        </ListItemButton>
    )
}

export default Tab_Item