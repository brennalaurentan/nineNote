// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';
import DeleteAccountDialog from '../my_profile/DeleteAccountDialog';

// tools
import { Stack, Link, Typography, Snackbar, Alert } from '@mui/material';
import { auth, db } from '../others/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc, collection, updateDoc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

const deleteAccountDocumentsArray = [
  {
    groupName: "computingEthics",
    collectionPath: '/gradProgress/commonCurriculum/computingEthics'
  },
  {
    groupName: "crossdisciplinaryEducation",
    collectionPath: '/gradProgress/commonCurriculum/crossdisciplinaryEducation'
  },
  {
    groupName: "interdisciplinaryEducation",
    collectionPath: '/gradProgress/commonCurriculum/interdisciplinaryEducation'
  },
  {
    groupName: "communitiesAndEngagement",
    collectionPath: '/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "critiqueAndExpression",
    collectionPath: '/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "culturesAndConnections",
    collectionPath: '/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "dataLiteracy",
    collectionPath: '/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "digitalLiteracy",
    collectionPath: '/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "singaporeStudies",
    collectionPath: '/gradProgress/commonCurriculum/universityLevel'
  },
  {
    groupName: "commonCurriculum",
    collectionPath: '/gradProgress'
  },
  {
    groupName: "algorithmsAndTheory_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "algorithmsAndTheory_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "artificialIntelligence_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "artificialIntelligence_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "computerGraphicsAndGames_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "computerGraphicsAndGames_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "computerSecurity_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "computerSecurity_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "databaseSystems_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "databaseSystems_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "multimediaInformationRetrieval_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "multimediaInformationRetrieval_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "networkingAndDistributedSystems_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "networkingAndDistributedSystems_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "focusAreas_others",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "parallelComputing_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "parallelComputing_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "programmingLanguages_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "programmingLanguages_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "softwareEngineering_electives",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "softwareEngineering_primaries",
    collectionPath: '/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
    groupName: "focusAreas",
    collectionPath: '/gradProgress/programme/breadthAndDepth'
  },
  {
    groupName: "industryExperience",
    collectionPath: '/gradProgress/programme/breadthAndDepth'
  },
  {
    groupName: "foundation",
    collectionPath: '/gradProgress/programme/foundation'
  },
  {
    groupName: "mathematicsAndSciences",
    collectionPath: '/gradProgress/programme/mathematicsAndSciences'
  },
  {
    groupName: "programme",
    collectionPath: '/gradProgress'
  },
  {
    groupName: "unrestrictedElectives",
    collectionPath: '/gradProgress'
  },
  {
    groupName: "Y1S1",
    collectionPath: '/modules'
  },
  {
    groupName: "Y1S2",
    collectionPath: '/modules'
  },
  {
    groupName: "Y1ST1",
    collectionPath: '/modules'
  },
  {
    groupName: "Y1ST2",
    collectionPath: '/modules'
  },
  {
    groupName: "Y2S1",
    collectionPath: '/modules'
  },
  {
    groupName: "Y2S2",
    collectionPath: '/modules'
  },
  {
    groupName: "Y2ST1",
    collectionPath: '/modules'
  },
  {
    groupName: "Y2ST2",
    collectionPath: '/modules'
  },
  {
    groupName: "Y3S1",
    collectionPath: '/modules'
  },
  {
    groupName: "Y3S2",
    collectionPath: '/modules'
  },
  {
    groupName: "Y3ST1",
    collectionPath: '/modules'
  },
  {
    groupName: "Y3ST2",
    collectionPath: '/modules'
  },
  {
    groupName: "Y4S1",
    collectionPath: '/modules'
  },
  {
    groupName: "Y4S2",
    collectionPath: '/modules'
  },
  {
    groupName: "Y4ST1",
    collectionPath: '/modules'
  },
  {
    groupName: "Y4ST2",
    collectionPath: '/modules'
  },
];

const BasicInfoForm = ({ setOpenDeleteAccountSnackBar }) => {
  const navigate = useNavigate();

  // handles updated data to firebase based on user's new inputs
  const [matriculationYearValue, setMatriculationYearValue] = useState("");
  const [matriculationYearLabel, setMatriculationYearLabel] = useState("");
  const [matriculationYearArray, setMatriculationYearArray] = useState([]);

  const [courseValue, setCourseValue] = useState("");
  const [courseLabel, setCourseLabel] = useState("");
  const [courseArray, setCourseArray] = useState([]);

  const [user, setUser] = useState({});

  // snackbar states
  const [openSaveChangesSnackBar, setOpenSaveChangesSnackBar] = useState(false);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSaveChangesSnackBar(false);
  };


  // function to get the currently signed-in user
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [])

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
        newElement = {
          "value": "SOC2",
          "label": "Business Analytics"
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
      const userRef = doc(db, "users", `${user.email}`);
      const userSnap = await getDoc(userRef);
      try {
        const userData = userSnap.data();
        retrievedMatriculationYear.current = userData['matriculationYear'];
        const matriculationYearLabelList = matriculationYearArray.map(year => year.label);
        const value = matriculationYearLabelList.indexOf(retrievedMatriculationYear.current) + 1;
        setMatriculationYearValue(value);
        setMatriculationYearLabel(retrievedMatriculationYear.current);
        console.log("retrieved data: ", userData);
        console.log("year retrieved.current: ", retrievedMatriculationYear.current);
        console.log("year value: ", value);
      } catch (error) {
        console.log(error.message);
      }
    }
    retrieveUserMatriculationYear();
  }, [matriculationYearArray, user])

  // function to retrieve user's course from firebase and update state
  useEffect(() => {
    async function retrieveUserCourse() {
      const userRef = doc(db, "users", `${user.email}`);
      const userSnap = await getDoc(userRef);
      try {
        const userData = userSnap.data();
        retrievedCourse.current = userData['course'];
        const courseLabelList = courseArray.map(course => course.label);
        const courseValueList = courseArray.map(course => course.value);
        const value = courseValueList[courseLabelList.indexOf(retrievedCourse.current)];
        setCourseValue(value);
        setCourseLabel(retrievedCourse.current);
        console.log("retrieved data: ", userData);
        console.log("course retrieved.current: ", retrievedCourse.current);
        console.log("course value: ", value);
      } catch (error) {
        console.log(error.message);
      }
    }
    retrieveUserCourse();
  }, [courseArray, user])

  // function to save user changes and update data in firebase
  async function saveChanges() {
    try {
      const userRef = doc(db, "users", `${user.email}`);
      await updateDoc(userRef, {
        matriculationYear: matriculationYearLabel,
        course: courseLabel,
      });
      setOpenSaveChangesSnackBar(true);
      console.log("changes saved!");
    } catch (error) {
      console.log(error.message);
    }
  }

  // function to delete user's account from firebase
  async function deleteAccount() {
    try {
      const userRef = doc(db, "users", `${user.email}`);

      deleteAccountDocumentsArray.map(document => {
        const deleteDocRef = doc(db, userRef.path + document.collectionPath, document.groupName);
        deleteDoc(deleteDocRef);
        return "";
      });

      setOpenDeleteAccountSnackBar(true);
      navigate("/");
      await deleteDoc(userRef);
      await user.delete();
      console.log("account deleted!");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Stack gap="32px">
        {/* email */}
        <Stack direction="row" gap="8px">
          <Typography variant="body_bold">Email Address: </Typography>
          <Typography variant="body_thin">{user.email}</Typography>
        </Stack>

        {/* password */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" width="400px">
          <Stack direction="row" gap="8px">
            <Typography variant="body_bold">Password: </Typography>
            <Typography variant="body_thin">Hidden</Typography>
          </Stack>
          <Link href="/reset-password">
            <MainButton
              type="text"
              main_color="blue.main"
              hover_color="blue.light"
              value="CHANGE PASSWORD"
            />
          </Link>
        </Stack>

        {/* matriculation year */}
        <FormField
          field_name={"Matriculation Year"}
          type={"dropdown"}
          values={matriculationYearArray}
          value={matriculationYearValue}
          onChangeAction={(event) => {
            setMatriculationYearValue(event.target.value);
            console.log("SELECTED MATRICULATION YEAR VALUE: ", event.target.value);

            let selectedMatriculationYearLabel = "";
            for (const matriculationYear of matriculationYearArray) {
              if (matriculationYear.value === event.target.value) {
                selectedMatriculationYearLabel = matriculationYear.label;
              }
            }
            console.log("SELECTED MATRICULATION YEAR LABEL: " + selectedMatriculationYearLabel);
            setMatriculationYearLabel(selectedMatriculationYearLabel);
          }}
        />

        {/* current/prospective course */}
        <FormField
          field_name={"Current/Prospective Course"}
          type={"dropdown"}
          values={courseArray}
          value={courseValue}
          onChangeAction={(event) => {
            setCourseValue(event.target.value);
            console.log("SELECTED COURSE VALUE: ", event.target.value);

            let selectedCourseLabel = "";
            for (const course of courseArray) {
              if (course.value === event.target.value) {
                selectedCourseLabel = course.label;
              }
            }
            console.log("SELECTED COURSE LABEL: " + selectedCourseLabel);
            setCourseLabel(selectedCourseLabel);
          }}
        />

        <Stack direction="row" justifyContent="space-between">
          <DeleteAccountDialog
            button_text="DELETE ACCOUNT"
            header="Delete Account"
            text="Once your account is deleted, your user data and module 
            selections will be removed from nineNote's database."
            deleteAccount={deleteAccount}
          />
          <Link>
            <MainButton
              type="contained"
              main_color="blue.main"
              value="SAVE CHANGES"
              onClickAction={saveChanges}
            />
          </Link>
        </Stack>
      </Stack >

      {/* SUCCESS SNACKBAR */}
      {/* snackbar displays only when user's changes are saved successfully */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSaveChangesSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          <Typography variant="tag_thin">
            Changes have been saved successfully.
          </Typography>
        </Alert>
      </Snackbar>
    </>
  )
}

export default BasicInfoForm