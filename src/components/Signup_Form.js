import Form_Field from './Form_Field';
import Main_Button from './Main_Button';
import { Stack, Link, Typography } from '@mui/material';

const matriculation_year = [
  {
    value: '1',
    label: 'AY23/24',
  },
  {
    value: '2',
    label: 'AY22/23',
  },
  {
    value: '3',
    label: 'AY21/22',
  },
  {
    value: '4',
    label: 'AY20/21',
  },
  {
    value: '5',
    label: 'AY19/20',
  },
  {
    value: '6',
    label: 'AY18/19',
  },
  {
    value: '7',
    label: 'AY17/18',
  },
];

const course = [
  {
    value: 'CHS1',
    label: 'Data Science and Economics',
  },
  {
    value: 'CHS2',
    label: 'Food Science and Technology',
  },
  {
    value: 'CHS3',
    label: 'Humanities and Sciences',
  },
  {
    value: 'CHS4',
    label: 'Pharmaceutical Science',
  },
  {
    value: 'CHS5',
    label: 'Philosophy, Politics, and Economics',
  },
  {
    value: 'BIZ1',
    label: 'Business Administration (Accountancy)',
  },
  {
    value: 'BIZ2',
    label: 'Business Administration',
  },
  {
    value: 'BIZ3',
    label: 'Real Estate',
  },
  {
    value: 'COM1',
    label: 'Business Analytics',
  },
  {
    value: 'COM2',
    label: 'Computer Science',
  },
  {
    value: 'COM3',
    label: 'Information Security',
  },
  {
    value: 'COM4',
    label: 'Information Systems',
  },
  {
    value: 'COM5',
    label: 'Computer Engineering',
  },
  {
    value: 'DENTISTRY1',
    label: 'Dentistry',
  },
  {
    value: 'CDE1',
    label: 'Architecture',
  },
  {
    value: 'CDE2',
    label: 'Engineering',
  },
  {
    value: 'CDE3',
    label: 'Industrial Design',
  },
  {
    value: 'CDE4',
    label: 'Landscape Architecture',
  },
  {
    value: 'LAW1',
    label: 'Undergraduate Law Programme',
  },
  {
    value: 'MED1',
    label: 'Medicine',
  },
  {
    value: 'NURSING1',
    label: 'Nursing',
  },
  {
    value: 'PHARMACY1',
    label: 'Pharmacy',
  },
  {
    value: 'NUS COLLEGE1',
    label: 'NUS College',
  },
  {
    value: 'MUSIC1',
    label: 'Music',
  },
];

const certifications = [
  {
    value: '1',
    label: 'Polytechnic Diploma and equivalent',
  },
  {
    value: '2',
    label: 'Diploma Plus and equivalent',
  },
];

const Form = () => {
  return (
    <>
      <Stack gap="32px">
        <Stack gap="16px" width="400px"> 
          <Typography variant="logo" color="blue.main">nineNote</Typography>  
          <Typography variant="h2">Sign Up</Typography>
          <Form_Field field_name={"Email Address"} type={"normal"}/>
          <Form_Field field_name={"Password"} type={"password"}/>
          <Form_Field field_name={"Matriculation Year"} type={"dropdown"} values={matriculation_year}/>
          <Form_Field field_name={"Current/Prospective Course"} type={"dropdown"} values={course}/>
          <Form_Field field_name={"Additional Certifications for Exemptions"} type={"dropdown"} values={certifications}/>
        </Stack>
        <Link href="/graduation-progress-tracker"><Main_Button value="CREATE ACCOUNT"/></Link>
      </Stack>
    </>
  )
}

export default Form