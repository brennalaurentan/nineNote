import TabItem from './TabItem';
import { Box, Typography, Stack } from '@mui/material';
import { useState } from "react";

const YearAndSemTabPanel = () => {
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
                <Typography variant="h3">Year and Semester</Typography>
                <Box>
                    <TabItem
                        id={1.1}
                        selected_id={selectedIndex}
                        value={"Y1 S1"}
                        onClickAction={(event) => handleListItemClick(event, 1.1)}
                    />
                    <TabItem
                        id={1.2}
                        selected_id={selectedIndex}
                        value={"Y1 S2"}
                        onClickAction={(event) => handleListItemClick(event, 1.2)}
                    />
                    <TabItem
                        id={1.3}
                        selected_id={selectedIndex}
                        value={"Y1 ST1"}
                        onClickAction={(event) => handleListItemClick(event, 1.3)}
                    />
                    <TabItem
                        id={1.4}
                        selected_id={selectedIndex}
                        value={"Y1 ST2"}
                        onClickAction={(event) => handleListItemClick(event, 1.4)}
                    />
                    <TabItem
                        id={2.1}
                        selected_id={selectedIndex}
                        value={"Y2 S1"}
                        onClickAction={(event) => handleListItemClick(event, 2.1)}
                    />
                    <TabItem
                        id={2.2}
                        selected_id={selectedIndex}
                        value={"Y2 S2"}
                        onClickAction={(event) => handleListItemClick(event, 2.2)}
                    />
                    <TabItem
                        id={2.3}
                        selected_id={selectedIndex}
                        value={"Y2 ST1"}
                        onClickAction={(event) => handleListItemClick(event, 2.3)}
                    />
                    <TabItem
                        id={2.4}
                        selected_id={selectedIndex}
                        value={"Y2 ST2"}
                        onClickAction={(event) => handleListItemClick(event, 2.4)}
                    />
                </Box>
            </Stack>
        </Box>
    );
}

export default YearAndSemTabPanel