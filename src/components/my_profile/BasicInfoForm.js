// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';

// tools
import { Stack, Link, Typography, MenuItem, TextField } from '@mui/material';
import { auth } from '../others/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

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

const BasicInfoForm = () => {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const saveChanges = () => {
    console.log("changes saved!");
  }

  // update data retrieval from static to firebase
  const [currentMatriculationYear, setCurrentMatriculationYear] = useState('AY19/20'); // update with firebase current user state
  const matriculationYearLabelList = matriculation_year.map(year => year.label);
  const [currentCourse, setCurrentCourse] = useState('Computer Science'); // update with firebase current user state
  const courseLabelList = course.map(course => course.label);
  const courseValueList = course.map(course => course.value);

  return (
    <>
      <Stack gap="32px" width="400px">

        {/* email */}
        <Stack direction="row" gap="8px">
          <Typography variant="body_bold">Email Address: </Typography>
          <Typography variant="body_thin">{user.email}</Typography>
        </Stack>

        {/* password */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" gap="8px">
            <Typography variant="body_bold">Password: </Typography>
            <Typography variant="body_thin">Hidden</Typography>
          </Stack>
          <Link href="/reset-password">
            <MainButton
              type="text"
              value="CHANGE PASSWORD"
            />
          </Link>
        </Stack>

        {/* matriculation year */}
        <FormField
          field_name={"Matriculation Year"}
          type={"dropdown"}
          values={matriculation_year}
          defaultValue={matriculationYearLabelList.indexOf(currentMatriculationYear) + 1}
          onChangeAction={(event) => {
            // amend once update with dropdown field values retrieval from firebase
            console.log(matriculationYearLabelList.indexOf(currentMatriculationYear));
          }}
        />

        {/* current/prospective course */}
        <FormField
          field_name={"Current/Prospective Course"}
          type={"dropdown"}
          values={course}
          defaultValue={courseValueList[courseLabelList.indexOf(currentCourse)]}
          onChangeAction={(event) => {
            // amend once update with dropdown field values retrieval from firebase
            console.log(courseValueList[courseLabelList.indexOf(currentCourse)]);
          }}
        />
        <Link>
          <MainButton
            type="contained"
            value="SAVE CHANGES"
            onClickAction={saveChanges}
          />
        </Link>
      </Stack>
    </>
  )
}

export default BasicInfoForm