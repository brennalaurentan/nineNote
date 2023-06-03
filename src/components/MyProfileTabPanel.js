import TabItem from './TabItem';
import { Box, Typography, Stack } from '@mui/material';
import { useState } from "react";

const MyProfileTabPanel = () => {
    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        const element = document.getElementById(index);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        console.log("clicked " + index);
    };

    return (
        <Box bgcolor="white.main" width="320px" position="fixed">
            <Stack gap="16px">
                <Typography variant="h3">My Profile</Typography>
                <Box>
                    <TabItem
                        id={1}
                        selected_id={selectedIndex}
                        value={"Basic Information"}
                        onClickAction={(event) => handleListItemClick(event, 1)}
                    />
                    <TabItem
                        id={2}
                        selected_id={selectedIndex}
                        value={"Module Exemptions"}
                        onClickAction={(event) => handleListItemClick(event, 2)}
                    />
                    <TabItem
                        id={3}
                        selected_id={selectedIndex}
                        value={"Saved Module Combinations"}
                        onClickAction={(event) => handleListItemClick(event, 3)}
                    />
                    <TabItem
                        id={4}
                        selected_id={selectedIndex}
                        value={"Saved Module Resources"}
                        onClickAction={(event) => handleListItemClick(event, 4)}
                    />
                </Box>
            </Stack>
        </Box>
    );
}

export default MyProfileTabPanel