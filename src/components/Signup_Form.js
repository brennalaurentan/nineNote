import Form_Field from './Form_Field';
import Main_Button from './Main_Button';
import { Stack, Link, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { QuerySnapshot, collection, doc, getDoc, getDocs, docChanges } from 'firebase/firestore';

const static_matriculation_year = [
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

const static_course = [
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

const static_certifications = [
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

  const [registerEmail, setRegisterEmail] = useState(null);
  const [registerPassword, setRegisterPassword] = useState(null);
  const [matriculationYear, setMatriculationYear] = useState([]);
  const matriculationYearCollectionRef = collection(db, "matriculation_year");
  let matriculationYearArray = [];

  const navigate = useNavigate();
  async function Register(){
    try {
      console.log(registerEmail);
      console.log(registerPassword);
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      navigate('/graduation-progress-tracker');
      console.log(user);
    } catch (error) {
      console.log(error.message);
    };
  }

  useEffect(() => {
    const getMatriculationYear = async () => {
      let querySnapshot = await getDocs(collection(db, "matriculation_year"));
      // almost there but just can't seem to retrieve the 'year' field from firebase
      // need to somehow retrieve childDoc.year where year is a field we created on firebase
      querySnapshot.forEach(childDoc => {
        const arrayCount = matriculationYearArray.length;
        let newElement = {
          "value": arrayCount.toString(),
          "label": arrayCount.toString()
        }
        matriculationYearArray.push(newElement);
      });
      console.log(matriculationYearArray);
      console.log(static_matriculation_year);
      console.log("test test");
      return querySnapshot.docs.map(doc => doc.data());
    }
    getMatriculationYear()
  }, []);

  return (
    <>
      <Stack gap="32px">
        <Stack gap="16px" width="400px">
          <Typography variant="logo" color="blue.main">nineNote</Typography>
          <Typography variant="h2">Sign Up</Typography>
          <Stack direction="row" gap="4px" alignItems="center">
          <Typography variant="tag_thin">Already have an account?</Typography>
          <Link href="/" underline="none">
            <Typography variant="tag_thin">Log in</Typography>
          </Link>
        </Stack>
          <Form_Field
            field_name={"Email Address"}
            type={"email"}
            onChangeAction={(event) => {
              setRegisterEmail(event.target.value);
              console.log("live email update: " + registerEmail);
            }}
          />
          <Form_Field
            field_name={"Password"}
            type={"password"}
            onChangeAction={(event) => {
              setRegisterPassword(event.target.value);
              console.log("live password update: " + registerPassword);
            }}
          />
          <Form_Field field_name={"Matriculation Year"} type={"dropdown"} values={matriculationYearArray} />
          <Form_Field field_name={"Current/Prospective Course"} type={"dropdown"} values={static_course} />
        </Stack>
        <Link>
          <Main_Button
            value="CREATE ACCOUNT"
            type="contained"
            onClickAction={Register}
          />
        </Link>
      </Stack>
    </>
  )
}

export default Form