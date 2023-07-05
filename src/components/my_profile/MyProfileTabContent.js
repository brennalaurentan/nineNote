// styles

// components / pages / images
import BasicInfoForm from './BasicInfoForm';
import PolytechnicRadioGroup from './PolytechnicRadioGroup';
import ModuleExemptionTable from './ModuleExemptionTable'
import MA1301ExemptionTable from './MA1301ExemptionTable'
import AlertDisplay from './AlertDisplay'
import profile_image from '../../graphics/profile_image.png';

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

const MyProfileTabContent = ({ value }) => {
    return (
        <>
            {/* Tab 1 */}
            <TabPanel value={value} index={0}>
                <Stack ml="188px" gap="64px">
                    <Stack direction="row" gap="64px" alignItems="center">
                        {/* <Avatar sx={{ bgcolor: "blue.light", textDecoration: "none", width: 150, height: 150 }}>
                            <EditIcon sx={{ color: "blue.main" }} />
                        </Avatar> */}
                        <img src={profile_image} alt="Logo" width="150px" />
                        <Box>
                            <Typography variant="body_bold" color="blue.main">NAME</Typography>
                            <Stack direction="row" gap="16px" alignItems="center">
                                <Typography variant="h2">nineNote User</Typography>
                                {/* <EditIcon sx={{ color: "blue.main" }} /> */}
                            </Stack>
                        </Box>
                    </Stack>
                    <BasicInfoForm />
                </Stack>
            </TabPanel>

            {/* Tab 2 */}
            <TabPanel value={value} index={1}>
                <Stack ml="188px" gap="16px">
                    <Stack direction="row" gap="100px">
                        <Typography variant="h3">Additional Certifications for Exemptions</Typography>
                        <AlertDisplay />
                    </Stack>
                    <Stack gap="64px">
                        <PolytechnicRadioGroup />
                        <ModuleExemptionTable />
                        <MA1301ExemptionTable />
                    </Stack>
                </Stack>
            </TabPanel>
        </>
    )
}

export default MyProfileTabContent