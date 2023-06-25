// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';
import ninenote_blue from '../../graphics/ninenote_blue.png';

// tools
import { Stack, Link, Typography, Box } from '@mui/material';
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth, db } from '../others/firebase';
import { useNavigate } from 'react-router-dom';
import { query, collection, doc, setDoc, getDocs, addDoc } from 'firebase/firestore';
import { forEach } from 'lodash';

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

const static_semesters = [
  "Y1S1",
  "Y1S2",
  "Y1ST1",
  "Y1ST2",
  "Y2S1",
  "Y2S2",
  "Y2ST1",
  "Y2ST2",
  "Y3S1",
  "Y3S2",
  "Y3ST1",
  "Y3ST2",
  "Y4S1",
  "Y4S2",
  "Y4ST1",
  "Y4ST2"
]



const SignupForm = () => {

  const [registerEmail, setRegisterEmail] = useState(null);
  const [registerPassword, setRegisterPassword] = useState(null);
  const [matriculationYear, setMatriculationYear] = useState("");
  const [matriculationYearArray, setMatriculationYearArray] = useState([]);
  const [course, setCourse] = useState("");
  const [courseArray, setCourseArray] = useState([]);

  const navigate = useNavigate();
  async function Register() {
    try {
      console.log(registerEmail);
      console.log(registerPassword);
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      navigate('/graduation-progress-tracker');
      console.log(user);
      const currentUserEmail = registerEmail;

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
          course: course
        });

        for (const semester of static_semesters) {
          setDoc(doc(db, `users/${currentUserEmail}/modules`, semester), {
            numModules: 0
          });
        }
      })
    } catch (error) {
      console.log(error.message);
    };
  }

  useEffect(() => {
    let matriculationYearArray = [];
    const matriculationYearCollectionRef = collection(db, "matriculationYear");
    async function loadMatriculationYearList() {
      try {
        const qSnapshot = getDocs(matriculationYearCollectionRef)
          .then((qSnapshot) => {

            console.log("matriculationYear qSnapshot: " + qSnapshot);
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
            setMatriculationYearArray(matriculationYearArray);
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    loadMatriculationYearList();
  }, []);

  useEffect(() => {
    let courseArray = [];
    const courseCollectionRef = collection(db, "courseLibrary");
    async function loadCourseList() {
      try {
        const qSnapshot = getDocs(courseCollectionRef)
          .then((qSnapshot) => {

            console.log("course qSnapshot: " + qSnapshot);
            // for each faculty in courseLibrary (faculty is a document)
            qSnapshot.forEach(async faculty => {
              let facultyCourseCount = 0;
              const courseSnapshot = await getDocs(collection(db, `courseLibrary/${faculty.id}/courses`));
              // for each course in the childDoc faculty (course is a document)
              courseSnapshot.forEach(course => {
                facultyCourseCount++;
                let newElement = {
                  "value": faculty.id.toString() + facultyCourseCount.toString(),
                  "label": course.id.toString()
                }
                console.log("pushing value: " + faculty.id.toString() + facultyCourseCount.toString());
                console.log("pushing label: " + course.id.toString());
                console.log("pushing label id: " + course.id);
                console.log("current facultycoursecount is " + facultyCourseCount.toString());
                console.log(courseArray);
                courseArray.push(newElement);
                setCourseArray(courseArray);
              })
            })
            console.log("courseArray: " + courseArray.toString());
            courseArray.forEach((item) => console.log(item));
            console.log("staticCourse: " + static_course.toString());
            static_course.forEach((item) => console.log(item));
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    loadCourseList();
  }, []);

  console.count("component rendered!");

  return (
    <>
      <Stack gap="24px">
        <Stack gap="24px">
          <Box width={["15vw", "5vw"]}>
            <img src={ninenote_blue} alt="Logo" width="100%" />
          </Box>
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
            onChangeAction={(event, value) => {
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
              let selectedMatriculationYearLabel = "";
              for (const matriculationYear of matriculationYearArray) {
                if (matriculationYear.value === event.target.value) {
                  console.log("matriculation year label: " + matriculationYear.label);
                  selectedMatriculationYearLabel = matriculationYear.label;
                }
              }
              console.log("selected matriculation year label: " + selectedMatriculationYearLabel);
              setMatriculationYear(selectedMatriculationYearLabel);
              console.log("live matriculationyear update: " + matriculationYear);
            }} />
          <FormField
            field_name={"Current/Prospective Course"}
            type={"dropdown"}
            values={courseArray}
            onChangeAction={(event) => {
              let selectedCourseLabel = "";
              for (const course of courseArray) {
                if (course.value === event.target.value) {
                  console.log("course label: " + course.label);
                  selectedCourseLabel = course.label;
                }
              }
              console.log("selected course label: " + selectedCourseLabel);
              setCourse(selectedCourseLabel);
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