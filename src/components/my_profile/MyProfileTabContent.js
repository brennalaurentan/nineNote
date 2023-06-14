// styles

// components / pages / images
import BasicInfoForm from './BasicInfoForm';
import PolytechnicRadioGroup from './PolytechnicRadioGroup';
import ModuleExemptionTable from './ModuleExemptionTable'
import MA1301ExemptionTable from './MA1301ExemptionTable'

// tools
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const MyProfileTabs = ({ value }) => {
    return (
        <>
            {/* Tab 1 */}
            <TabPanel value={value} index={0}>
                <Stack ml="188px" gap="64px">
                    <Stack direction="row" gap="64px" alignItems="center">
                        <Avatar sx={{ bgcolor: "blue.light", textDecoration: "none", width: 150, height: 150 }}>
                            <EditIcon sx={{ color: "blue.main" }} />
                        </Avatar>
                        <Box>
                            <Typography variant="body_bold" color="blue.main">NAME</Typography>
                            <Stack direction="row" gap="16px" alignItems="center">
                                <Typography variant="h2">nineNote User</Typography>
                                <EditIcon sx={{ color: "blue.main" }} />
                            </Stack>
                        </Box>
                    </Stack>
                    <BasicInfoForm />
                </Stack>
            </TabPanel>

            {/* Tab 2 */}
            <TabPanel value={value} index={1}>
                <Stack ml="188px" gap="16px">
                    <Typography variant="h3">Additional Certifications for Exemptions</Typography>
                    <Stack gap="64px">
                        <PolytechnicRadioGroup />
                        <ModuleExemptionTable />
                        <MA1301ExemptionTable />
                    </Stack>
                </Stack>
            </TabPanel>

            {/* Tab 3 */}
            <TabPanel value={value} index={2}>
                <Stack ml="188px" gap="64px">
                    <Typography>hello</Typography>
                </Stack>
            </TabPanel>

            {/* Tab 4 */}
            <TabPanel value={value} index={3}>
                <Stack ml="188px" gap="64px">
                    <Typography>hello</Typography>
                </Stack>
            </TabPanel>
        </>
    )
}

export default MyProfileTabs