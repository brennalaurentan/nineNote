// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';

// tools
import { Stack, Link, Typography } from '@mui/material';
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

  // const [email, setEmail] = useState(user.email);

  return (
    <>
      <Stack gap="32px">
        <Stack gap="16px" width="400px">
          <FormField
            field_name={"Email Address"}
            type={"email"}
            defaultValue={user.email}
          // onChangeAction
          />
          {/* <FormField
            field_name={"Password"}
            type={"password"}
          // onChangeAction
          /> */}

          <Stack display="flex" flexDirection="row" alignItems="center" gap="10px">
            <Typography variant="body_bold">Password: </Typography>
            <Link href="/reset-password">
              <MainButton
                type="text"
                value="RESET PASSWORD"
              />
            </Link>
          </Stack>

          <FormField field_name={"Matriculation Year"} type={"dropdown"} values={matriculation_year} defaultValue={user.email} />
          <FormField field_name={"Current/Prospective Course"} type={"dropdown"} values={course} defaultValue={user.email} />
        </Stack>
        <Link>
          <MainButton
            type="contained"
            value="SAVE CHANGES"
          // onClickAction
          />
        </Link>
      </Stack>
    </>
  )
}

export default BasicInfoForm