// styles

// components / pages / images
import BasicInfoForm from './BasicInfoForm';
import PolytechnicRadioGroup from './PolytechnicRadioGroup';
import ModuleExemptionTable from './ModuleExemptionTable';
import MA1301ExemptionTable from './MA1301ExemptionTable';
import AlertDisplay from './AlertDisplay';
import profile_image from '../../graphics/profile_image.png';

// tools
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack, Chip } from '@mui/material';

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

function createData(name, exempted_mods) {
    return {
        name,
        exempted_mods,
    };
}

const exemptedModulesData = [
    {
        polytechnic: 'Nanyang Polytechnic',
        data: [
            createData('Advanced & Digital Manufacturing', 'CS2101'),
            createData('Banking & Finance', 'CS2101'),
            createData('Business & Financial Technology', 'CP3200, CS1010, IS1108'),
            createData('Business Enterprise IT', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Business Informatics', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Business Intelligence & Analytics', 'CP3200, CS1010, IS1108'),
            createData('Business Management', 'CS2101'),
            createData('Cyber Security & Digital Forensics', 'CP3200, CS1010, IS1108'),
            createData('Digital Visual Effects', 'CP3200, IS1108'),
            createData('Electronics & Computer Engineering', 'CP3200, CS2101'),
            createData('Infocomm & Media Engineering', 'CP3200, CS2101'),
            createData('Infocomm & Security', 'CP3200, CS1010, IS1108'),
            createData('Financial Informatics', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Game Development & Technology', 'CP3200, CS1010,  IS1108'),
            createData('Information Technology', 'CP3200, CS1010, CS2101, IS1108'),
        ]
    },
    {
        polytechnic: 'Ngee Ann Polytechnic',
        data: [
            createData('Audio-Visual Technology', 'CP3200'),
            createData('Banking & Finance', 'CS2101, IS1108'),
            createData('Business & Social Enterprise', 'CS2101'),
            createData('Business Information Technology', 'IS1108'),
            createData('Business Studies', 'IS1108, CS2101'),
            createData('Cybersecurity & Digital Forensics', 'CP3200, CS1010, IS1108'),
            createData('Engineering Science', 'CS1010, IS1108'),
            createData('Financial Informatics', 'CP3200, CS2101, IS1108'),
            createData('Information Technology', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Immersive Media and Game Design', 'CP3200, IS1108'),
            createData('International Business', 'CS2101'),
            createData('International Trade & Business', 'CS2101'),
            createData('Network Systems & Security', 'CP3200, CS1010, CS2105'),
        ]
    },
    {
        polytechnic: 'Republic Polytechnic',
        data: [
            createData('Business Applications', 'CP3200, CS1010, IS1108'),
            createData('Business Information Systems', 'CP3200, CS1010, IS1108'),
            createData('Digital Entertainment Electronics', 'CP3200'),
            createData('Game Design', 'CP3200'),
            createData('Infocomm Security Management', 'CP3200, IS1108'),
            createData('Information Technology', 'CP3200, CS1010, IS1108'),
            createData('Interactive and Digital Media', 'CP3200, IS1108'),
            createData('IT Services Management', 'CP3200, IS1108'),
            createData('Mobile Software Development', 'CP3200, IS1108'),
        ]
    },
    {
        polytechnic: 'Singapore Polytechnic',
        data: [
            createData('Aerospace Electronics', 'CS2101'),
            createData('Applied AI and Analytics', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Business Administration', 'IS1108, CS2101'),
            createData('Business Information Technology', 'CP3200, CS2101, IS1108'),
            createData('Computer Engineering', 'CS2101, IS1108'),
            createData('Engineering with Business', 'IS1108, CS2101'),
            createData('Financial Informatics', 'CP3200, IS1108'),
            createData('Games Design and Development', 'CS2101, IS1108'),
            createData('Info-Communication Engineering & Design', 'CS1010, IS1108'),
            createData('Infocomm Security Management', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Information Technology', 'CP3200, CS1010, CS2101, IS1108'),
            createData('International Business', 'IS1108'),
            createData('Music and Audio Technology', 'IS1108'),
        ]
    },
    {
        polytechnic: 'Temasek Polytechnic',
        data: [
            createData('3D Interactive Media Informatics', 'CP3200, CS2101, IS1108'),
            createData('Accountancy & Finance', 'CS2101'),
            createData('Apparel Design & Merchandising', 'CS2101'),
            createData('Big Data & Analytics', 'CP3200, CS2101, IS1108, BT1101'),
            createData('Big Data Management & Governance', 'CP3200, CS2101, IS1108'),
            createData('Biomedical Engineering', 'CS2101'),
            createData('Business', 'CS2101'),
            createData('Business Information Technology', 'CP3200, CS2101, IS1108'),
            createData('Business Intelligence & Analytics', 'CP3200, CS2101, IS1108'),
            createData('Communication Designtest', 'CS2101'),
            createData('Communication & Media Management', 'CS2101'),
            createData('Computer Engineering', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Culinary & Catering Management', 'CS2101'),
            createData('Cybersecurity & Digital Forensics', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Digital Forensics', 'CP3200, CS1010, IS1108'),
            createData('Electronics', 'CS2101, IS1108'),
            createData('Financial Business Informatics', 'CP3200, CS2101, IS1108'),
            createData('Games Design & Development', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Hospitality & Tourism Management', 'CS2101'),
            createData('Infocomm & Network Engineering', 'CP3200, CS1010, CS2105, IS1108'),
            createData('Information Technology', 'CP3200, CS1010, CS2101, IS1108'),
            createData('Interactive Media Design', 'CP3200'),
            createData('Interactive Media Informatics', 'CP3200, IS1108'),
            createData('Law & Management', 'CS2101'),
            createData('Logistics & Operation Management', 'CS2101'),
            createData('Marketing', 'CS2101'),
            createData('Mechatronics', 'CS2101'),
            createData('Mobile and Network Services', 'CP3200, CS2101, IS1108'),
            createData('Product & Industrial Design', 'CS2101'),
            createData('Retail Management', 'CS2101'),
        ]
    }
];

const MyProfileTabContent = ({ value }) => {
    return (
        <>
            {/* Tab 1 */}
            <TabPanel value={value} index={0}>
                <Stack ml="188px" gap="64px">
                    <Stack direction="row" gap="64px" alignItems="center">
                        <img src={profile_image} alt="Logo" width="150px" />
                        <Box>
                            <Typography variant="body_bold" color="blue.main">NAME</Typography>
                            <Stack direction="row" gap="16px" alignItems="center">
                                <Typography variant="h2">nineNote User</Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <BasicInfoForm />
                </Stack>
            </TabPanel>

            {/* Tab 2 */}
            <TabPanel value={value} index={1}>
                <Stack ml="188px" gap="64px">
                    <Stack direction="row" gap="100px" alignItems="center">
                        <Stack gap="16px" width="500px">
                            <Typography variant="h3">Additional Certifications for Exemptions</Typography>
                            <Typography variant="body_thin" flexWrap="wrap">
                                If you are unsure of which modules you are exempted from,
                                you may refer to the tables below.
                            </Typography>
                        </Stack>
                        <AlertDisplay />
                    </Stack>
                    <Stack gap="16px">
                        <Stack direction="row" display="flex" alignItems="center" gap="16px">
                            <Typography variant="body_bold">Target NUS Course:</Typography>
                            <Box
                                width="150px"
                                bgcolor="blue.light"
                                borderRadius="15px"
                                display="flex"
                                justifyContent="center"
                                paddingTop="6px"
                                paddingBottom="6px"
                                paddingLeft="3px"
                                paddingRight="3px">
                                <Typography variant="tag_bold" color="blue.main">Computer Science</Typography>
                            </Box>
                        </Stack>
                        <Typography variant="body_thin">You may change your target course under <b>Basic Information</b> in <b>My Profile</b>!</Typography>
                    </Stack>
                    {exemptedModulesData.map((poly, index) => (
                        <>
                            <ModuleExemptionTable
                                key={index}
                                index={index}
                                rows={poly.data}
                                poly={poly.polytechnic}
                            />
                        </>
                    ))}
                </Stack>
            </TabPanel>
        </>
    )
}

export default MyProfileTabContent