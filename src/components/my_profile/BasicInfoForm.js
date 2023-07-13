// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';

// tools
import { Stack, Link, Typography, MenuItem, TextField, Box } from '@mui/material';
import { auth, db } from '../others/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, collection } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';

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

const BasicInfoForm = () => {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  // handles updated data to firebase based on user's new inputs
  const [defaultMatriculationYearValue, setDefaultMatriculationYearValue] = useState("");
  const [matriculationYearArray, setMatriculationYearArray] = useState([]);
  const matriculationYearLabelList = matriculationYearArray.map(year => year.label);
  const [matriculationYear, setMatriculationYear] = useState("");

  const [defaultCourseValue, setDefaultCourseValue] = useState('');
  const [courseArray, setCourseArray] = useState([]);
  const courseLabelList = courseArray.map(course => course.label);
  const courseValueList = courseArray.map(course => course.value);

  // function to load all matriculation years from firebase (code section below is commented to avoid firebase quota)
  useEffect(() => {
    let matriculationYearArray = [];
    const matriculationYearCollectionRef = collection(db, "matriculationYear");
    async function loadMatriculationYearList() {
      try {
        // code below reads all the matriculation years from database and
        // displays each of them in the matriculation year dropdown list
        /*
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
        */
        setMatriculationYearArray(static_matriculation_year);
      } catch (error) {
        console.log(error.message);
      }
    }
    loadMatriculationYearList();
  }, []);

  // function to load all courses from firebase (code section below is commented to avoid firebase quota)
  useEffect(() => {
    let courseArray = [];
    /*
    const courseCollectionRef = collection(db, "courseLibrary");
    */
    async function loadCourseList() {
      try {
        /*
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
        */
        // code below adds a single 'Computer Science' course to the course dropdown
        let newElement = {
          "value": "SOC1",
          "label": "Computer Science"
        }
        courseArray.push(newElement);
        setCourseArray(courseArray);
      } catch (error) {
        console.log(error.message);
      }
    }
    loadCourseList();
  }, []);

  // local variable of user's matriculation year retrieved from firebase
  const retrievedMatriculationYear = useRef("");

  // local variable of user's course retrieved from firebase
  const retrievedCourse = useRef("");

  // function to retrieve user's matriculation year from firebase and update state
  useEffect(() => {
    async function retrieveUserMatriculationYear() {
      const docRef = doc(db, "users", `${user.email}`);
      const docSnap = await getDoc(docRef);
      try {
        const userData = docSnap.data();
        retrievedMatriculationYear.current = userData['matriculationYear'];
        const value = matriculationYearLabelList.indexOf(retrievedMatriculationYear.current) + 1;
        setDefaultMatriculationYearValue(value);
        console.log("retrieved data: ", userData);
        console.log("year retrieved.current: ", retrievedMatriculationYear.current);
        console.log("year value: ", value);
      } catch (error) {
        console.log(error.message);
      }
    }
    retrieveUserMatriculationYear();
  })

  // function to retrieve user's course from firebase and update state
  useEffect(() => {
    async function retrieveUserCourse() {
      const docRef = doc(db, "users", `${user.email}`);
      const docSnap = await getDoc(docRef);
      try {
        const userData = docSnap.data();
        retrievedCourse.current = userData['course'];
        const value = courseValueList[courseLabelList.indexOf(retrievedCourse.current)];
        setDefaultCourseValue(value);
        console.log("retrieved data: ", userData);
        console.log("course retrieved.current: ", retrievedCourse.current);
        console.log("course value: ", value);
      } catch (error) {
        console.log(error.message);
      }
    }
    retrieveUserCourse();
  })

  const handleDropdownChange = (event) => {
    console.log("selected year value: ", event.target.value);
    setDefaultMatriculationYearValue(event.target.value);
  }

  // function to save user changes and update data in firebase
  const saveChanges = () => {
    console.log("changes saved!");
  }

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
          values={matriculationYearArray}
          value={defaultMatriculationYearValue}
          onChangeAction={(event) => {
            console.log("defaultMatriculationYearValue: " + defaultMatriculationYearValue);
            console.log("event.target.value: " + event.target.value);
            /*setDefaultMatriculationYearValue(selectedMatriculationYearValue);*/
          }}
        />

        {/* current/prospective course */}
        <FormField
          field_name={"Current/Prospective Course"}
          type={"dropdown"}
          values={courseArray}
          value={defaultCourseValue}
        // onChangeAction={(event) => {}}
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