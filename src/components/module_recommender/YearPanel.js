// styles

// components / pages / images
import TabItem from './TabItem';

// tools
import { Box, Typography, Stack } from '@mui/material';
import { useState } from "react";

const YearPanel = () => {
    const [selectedIndex, setSelectedIndex] = useState(1.1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        const element = document.getElementById(index);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        console.log("clicked " + index);
    };

    return (
        <Box bgcolor="white.main" width="256px" position="fixed">
            <Stack gap="16px">
                <Typography variant="h3">Year of Study</Typography>
                <Box>
                    <TabItem
                        id={1}
                        selected_id={selectedIndex}
                        value={"Year 1"}
                        onClickAction={(event) => handleListItemClick(event, 1.1)}
                    />
                    <TabItem
                        id={2}
                        selected_id={selectedIndex}
                        value={"Year 2"}
                        onClickAction={(event) => handleListItemClick(event, 1.2)}
                    />
                    <TabItem
                        id={3}
                        selected_id={selectedIndex}
                        value={"Year 3"}
                        onClickAction={(event) => handleListItemClick(event, 2.1)}
                    />
                    <TabItem
                        id={4}
                        selected_id={selectedIndex}
                        value={"Year 4"}
                        onClickAction={(event) => handleListItemClick(event, 2.2)}
                    />
                </Box>
            </Stack>
        </Box>
    );
}

export default YearPanel