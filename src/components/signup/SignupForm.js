// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';

// tools
import { Stack, Link, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../others/firebase';
import { useNavigate } from 'react-router-dom';
import { query, collection, doc, setDoc, getDocs } from 'firebase/firestore';

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

let matriculationYearArray = [];
const matriculationYearCollectionRef = collection(db, "matriculation_year");

async function loadMatriculationYearList() {
  try {
    const qSnapshot = getDocs(matriculationYearCollectionRef)
      .then((qSnapshot) => {

        console.log(qSnapshot);
        qSnapshot.forEach(childDoc => {
          let newElement = {
            "value": matriculationYearArray.length.toString(),
            "label": childDoc.data().year
          }
          console.log("pushing label: " + childDoc.data().year);
          matriculationYearArray.push(newElement);
        })
        console.log("matriculationYearArray: " + matriculationYearArray.toString());
        matriculationYearArray.forEach((item) => console.log(item));
        console.log("staticMatriculationyear: " + static_matriculation_year.toString());
        static_matriculation_year.forEach((item) => console.log(item));
      });
  } catch (error) {
    console.log(error.message);
  }
}
loadMatriculationYearList();

const SignupForm = () => {

  const [registerEmail, setRegisterEmail] = useState(null);
  const [registerPassword, setRegisterPassword] = useState(null);
  const [matriculationYear, setMatriculationYear] = useState(null);
  const [course, setCourse] = useState(null);

  let courseArray = [];

  const navigate = useNavigate();
  async function Register() {
    try {
      console.log(registerEmail);
      console.log(registerPassword);
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      navigate('/graduation-progress-tracker');
      console.log(user);
      const currentUserEmail = registerEmail;

      // const auth = getAuth();
      // const user = auth.currentUser;
      // const currentUserEmail = user.email;

      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
      }));
      console.log(queryData);
      queryData.map(async (v, id) => {
        let docCount = 0;
        const querySnapshot = await getDocs(collection(db, `users`));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          docCount = doc.data().numModules;
        });


        await setDoc(doc(db, `users`, currentUserEmail), {
          email: currentUserEmail,
          matriculationYear: matriculationYear,
          course: course,
        });
      })
    } catch (error) {
      console.log(error.message);
    };
  }

  console.count("component rendered!");

  /*
  async function loadMatriculationYear(){
    try {
      const qSnapshot = await getDocs(matriculationYearCollectionRef);
      console.log(qSnapshot);
      qSnapshot.forEach(childDoc => {
        let newElement = {
          "value": childDoc.data().id.toString(),
          "label": childDoc.data().year.toString()
        }
        console.log("pushing label: " + childDoc.data().year);
        matriculationYearArray.push(newElement);
      })
      console.log("loadMatriculationYear called");
    } catch (error) {
      console.log(error.message);
    }
  }
  */

  /*
  useEffect(() => {
    const getMatriculationYear = async () => {
      const querySnapshot = await getDocs(collection(db, "matriculation_year"));
      console.log("current matriculationYearArray: " + matriculationYearArray);
      querySnapshot.forEach(childDoc => {
        const matriculationArrayCount = matriculationYearArray.length;
        console.log(querySnapshot.size);
        //if (matriculationArrayCount < querySnapshot.size) {
          let newElement = {
            "value": matriculationArrayCount.toString(),
            "label": childDoc.data().year.toString()
          }
          console.log("pushing label: " + childDoc.data().year);
          matriculationYearArray.push(newElement);
          console.log("count after pushing: " + matriculationYearArray.length);
        //}
      });
      console.log(matriculationYearArray);
      console.log(static_matriculation_year);

    };
    getMatriculationYear();
  }, []);
  */

  /*
  useEffect(() => {
    const getCourse = async () => {
      const querySnapshot = await getDocs(collection(db, "courseLibrary"));
      querySnapshot.forEach(childDoc => {
        console.log(childDoc.data());
        
        childDoc.data().collection('courses').forEach(childChildDoc => {
          console.log("current childChildDoc: " + childChildDoc);
          let newElement = {
            "name": childChildDoc.data().name
          }
          console.log("pushing label: " + childDoc.data().name);
          courseArray.push(newElement);
        })
        console.log("count after pushing: " + courseArray.length);
        
      });
      console.log(courseArray);
      console.log(static_course);
      
    };
    getCourse();
  });
  */

  return (
    <>
      <Stack gap="24px">
        <Stack gap="24px">
          <Typography variant="logo" color="blue.main">nineNote</Typography>
          <Typography variant="h2">Sign Up</Typography>
          <Stack direction="row" gap="4px" alignItems="center">
            <Typography variant="tag_thin">Already have an account?</Typography>
            <Link href="/" underline="none">
              <Typography variant="tag_thin">Log in</Typography>
            </Link>
          </Stack>
          <FormField
            field_name={"Email Address"}
            type={"email"}
            onChangeAction={(event) => {
              setRegisterEmail(event.target.value);
              console.log("live email update: " + registerEmail);
            }}
          />
          <FormField
            field_name={"Password"}
            type={"password"}
            onChangeAction={(event) => {
              setRegisterPassword(event.target.value);
              console.log("live password update: " + registerPassword);
            }}
          />
          <FormField
            field_name={"Matriculation Year"}
            type={"dropdown"}
            values={matriculationYearArray}
            onChangeAction={(event) => {
              setMatriculationYear(event.target.value);
              console.log(event.target.value);
              console.log("live matriculationyear update: " + matriculationYear);
            }} />
          <FormField
            field_name={"Current/Prospective Course"}
            type={"dropdown"}
            values={courseArray}
            onChangeAction={(event) => {
              setCourse(event.target.value);
              console.log("live course update: " + course);
            }} />
        </Stack>
        <Link>
          <MainButton
            type="contained"
            main_color="blue.main"
            value="CREATE ACCOUNT"
            onClickAction={Register}
          />
        </Link>
      </Stack>
    </>
  )
}

export default SignupForm