// styles

// components / pages / images
import FormField from '../common/FormField';
import MainButton from '../common/MainButton';
import ninenote_blue from '../../graphics/ninenote_blue.png';
import CheckWarning from '../signup/CheckWarning';

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
  }
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

const userCreditTrackerPathArray = [
  {   
    groupName: "computingEthics",
    collectionPath: '/users/!/gradProgress/commonCurriculum/computingEthics'
  },
  {
      groupName: "crossdisciplinaryEducation",
      collectionPath: '/users/!/gradProgress/commonCurriculum/crossdisciplinaryEducation'
  },
  {
      groupName: "interdisciplinaryEducation",
      collectionPath: '/users/!/gradProgress/commonCurriculum/interdisciplinaryEducation'
  },
  {
      groupName: "communitiesAndEngagement",
      collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
      groupName: "critiqueAndExpression",
      collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
      groupName: "culturesAndConnections",
      collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
      groupName: "dataLiteracy",
      collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
      groupName: "digitalLiteracy",
      collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
      groupName: "singaporeStudies",
      collectionPath: '/users/!/gradProgress/commonCurriculum/universityLevel'
  },
  {
      groupName: "algorithmsAndTheory_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "algorithmsAndTheory_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "artificialIntelligence_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "artificialIntelligence_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "computerGraphicsAndGames_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "computerGraphicsAndGames_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "computerSecurity_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "computerSecurity_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "databaseSystems_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "databaseSystems_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "multimediaInformationRetrieval_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "multimediaInformationRetrieval_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "networkingAndDistributedSystems_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "networkingAndDistributedSystems_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "focusAreas_others",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "parallelComputing_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "parallelComputing_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "programmingLanguages_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "programmingLanguages_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "softwareEngineering_electives",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "softwareEngineering_primaries",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth/focusAreas/focusAreas'
  },
  {
      groupName: "industryExperience",
      collectionPath: '/users/!/gradProgress/programme/breadthAndDepth'
  },
  {
      groupName: "mathematicsAndSciences",
      collectionPath: '/users/!/gradProgress/programme/mathematicsAndSciences'
  },
  {
      groupName: "foundation",
      collectionPath: '/users/!/gradProgress/programme/foundation'
  }
]

const moduleGroupsArray = [
  {   
      groupName: "computingEthics",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/computingEthics/computingEthics'
  },
  {
      groupName: "crossdisciplinaryEducation",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/crossdisciplinaryEducation/crossdisciplinaryEducation'
  },
  {
      groupName: "interdisciplinaryEducation",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/interdisciplinaryEducation/interdisciplinaryEducation'
  },
  {
      groupName: "communitiesAndEngagement",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/communitiesAndEngagement'
  },
  {
      groupName: "critiqueAndExpression",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/critiqueAndExpression'
  },
  {
      groupName: "culturesAndConnections",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/culturesAndConnections'
  },
  {
      groupName: "dataLiteracy",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/dataLiteracy'
  },
  {
      groupName: "digitalLiteracy",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/digitalLiteracy'
  },
  {
      groupName: "singaporeStudies",
      collectionPath: '/graduationRequirements/computerScience/commonCurriculum/universityLevel/singaporeStudies'
  },
  {
      groupName: "algorithmsAndTheory_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/algorithmsAndTheory/electives'
  },
  {
      groupName: "algorithmsAndTheory_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/algorithmsAndTheory/primaries'
  },
  {
      groupName: "artificialIntelligence_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/artificialIntelligence/electives'
  },
  {
      groupName: "artificialIntelligence_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/artificialIntelligence/primaries'
  },
  {
      groupName: "computerGraphicsAndGames_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/computerGraphicsAndGames/electives'
  },
  {
      groupName: "computerGraphicsAndGames_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/computerGraphicsAndGames/primaries'
  },
  {
      groupName: "computerSecurity_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/computerSecurity/electives'
  },
  {
      groupName: "computerSecurity_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/computerSecurity/primaries'
  },
  {
      groupName: "databaseSystems_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/databaseSystems/electives'
  },
  {
      groupName: "databaseSystems_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/databaseSystems/primaries'
  },
  {
      groupName: "multimediaInformationRetrieval_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/multimediaInformationRetrieval/primaries'
  },
  {
      groupName: "multimediaInformationRetrieval_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/multimediaInformationRetrieval/primaries'
  },
  {
      groupName: "networkingAndDistributedSystems_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/networkingAndDistributedSystems/electives'
  },
  {
      groupName: "networkingAndDistributedSystems_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/networkingAndDistributedSystems/primaries'
  },
  {
      groupName: "focusAreas_others",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/others/others'
  },
  {
      groupName: "parallelComputing_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/parallelComputing/electives'
  },
  {
      groupName: "parallelComputing_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/parallelComputing/primaries'
  },
  {
      groupName: "programmingLanguages_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/programmingLanguages/electives'
  },
  {
      groupName: "programmingLanguages_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/programmingLanguages/primaries'
  },
  {
      groupName: "softwareEngineering_electives",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/softwareEngineering/electives'
  },
  {
      groupName: "softwareEngineering_primaries",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/focusAreas/softwareEngineering/primaries'
  },
  {
      groupName: "industryExperience",
      collectionPath: '/graduationRequirements/computerScience/programme/breadthAndDepth/industryExperience'
  },
  {
      groupName: "mathematicsAndSciences",
      collectionPath: '/graduationRequirements/computerScience/programme/mathematicsAndSciences/mathematicsAndSciences'
  },
  {
      groupName: "foundation",
      collectionPath: '/graduationRequirements/computerScience/programme/foundation/foundation'
  }
];

// function to retrieve the path to the collection which stores the module group tracker for
// a particular specified user
// the path to the collection returned, contains fields called 'creditsCompleted' and 'creditsToMeet'
function retrieveUserModuleCreditTrackerPath(userEmail, moduleGroupName) {
  let returnPath = "";
  userCreditTrackerPathArray.forEach((moduleGroup) => {
    if (moduleGroup.groupName === moduleGroupName) {
      returnPath = moduleGroup.collectionPath;
    }
  })
  returnPath = returnPath.replace(/!/g, userEmail);
  return returnPath;
}

// function which takes in a path and returns an array of the modules in 
// that path in the database (graduation requirement modules, to obtain module details)
async function retrieveModulesFromCollectionPath(collectionPath) {
  const arrayOfModules = [];
  const collectionRef = collection(db, collectionPath);
  const querySnapshot = await getDocs(collectionRef);
  querySnapshot.forEach((doc) => {
      // each module in the database has the following details:
      // moduleCode, moduleMC, moduleName
      const newModule = {
          "moduleCode": doc.data().moduleCode,
          "moduleMC": doc.data().moduleMC,
          "moduleName": doc.data().moduleName
      }
      arrayOfModules.push(newModule);
  })
  return arrayOfModules;
}

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

      // create fields under user's database profile in firebase
      await setDoc(doc(db, `users`, currentUserEmail), {
        email: currentUserEmail,
        matriculationYear: matriculationYear,
        course: course
      });

      // create semester collections under user's database profile in firebase
      for (const semester of static_semesters) {
        setDoc(doc(db, `users/${currentUserEmail}/modules`, semester), {
          numModules: 0
        });
      }

      // retrieve number of credits required from each module group (graduation requirements)
      // from firebase
      let commonCurriculumRequirement = 0;
      let programmeRequirement = 0;
      let unrestrictedElectiveRequirement = 0;
      async function setGradReqMaingroupCreditsToMeet() {
        // common curriculum
        const commonCurriculumReqSnapshot = await getDocs(collection(db, "/graduationRequirements/computerScience/commonCurriculum"));
        commonCurriculumReqSnapshot.forEach((commonCurriculumSubgroup) => {
          commonCurriculumRequirement += parseInt(commonCurriculumSubgroup.data().creditsToMeet);
        });
        // create fields in user's document
        setDoc(doc(db, `users/${currentUserEmail}/gradProgress/`, "commonCurriculum"), {
          computingEthics_fulfilment: false,
          crossDisciplinaryEducation_fulfilment: false,
          interdisciplinaryEducation_fulfilment: false,
          overall_fulfilment: false,
          universityLevel_fulfilment: false,
          creditsCompleted: 0,
          creditsToMeet: commonCurriculumRequirement
        });

        // programme
        const programmeReqSnapshot = await getDocs(collection(db, "/graduationRequirements/computerScience/programme"));
        programmeReqSnapshot.forEach((programmeSubgroup) => {
          programmeRequirement += parseInt(programmeSubgroup.data().creditsToMeet);
        });
        // create fields in user's document
        setDoc(doc(db, `users/${currentUserEmail}/gradProgress/`, "programme"), {
          breadthAndDepth_fulfilment: false,
          foundation_fulfilment: false,
          overall_fulfilment: false,
          creditsCompleted: 0,
          creditsToMeet: programmeRequirement
        });

        // unrestricted electives
        const unrestrictedElectiveReqSnapshot = await getDocs(collection(db, "/graduationRequirements/computerScience/unrestrictedElectives"));
        unrestrictedElectiveReqSnapshot.forEach((unrestrictedElectiveSubgroup) => {
          unrestrictedElectiveRequirement += parseInt(unrestrictedElectiveSubgroup.data().creditsToMeet);
        });
        // create fields in user's document
        setDoc(doc(db, `users/${currentUserEmail}/gradProgress/`, "unrestrictedElectives"), {
          overall_fulfilment: false,
          creditsCompleted: 0,
          creditsToMeet: unrestrictedElectiveRequirement
        });
      }
      setGradReqMaingroupCreditsToMeet();

      // create fields to track user's credit progress in each of the module groups
      let moduleGroupIndex = 0; // moduleGroupIndex for both userCreditTrackerPathArray and moduleGroupsArray is the same
      userCreditTrackerPathArray.forEach((userModuleGroup) => {
        let pathToCollection = retrieveUserModuleCreditTrackerPath(currentUserEmail, userModuleGroup.groupName);
        let setCreditsToMeet = 0;
        // if moduleGroup is a focusArea primary, set the following default credit requirements
        if (pathToCollection.includes("focusArea") && userModuleGroup.groupName.includes("primaries")) {
          setCreditsToMeet = 12;
          setDoc(doc(db, pathToCollection, userModuleGroup.groupName), {
            creditsToMeet: setCreditsToMeet,
            creditsCompleted: "0",
            uncontributingCreditsCompleted: "0", // credits beyond any 2x random & 1x 4k+ mod
            modulesTaken: []
          });
        }
        // if moduleGroup is a focusArea elective, set the following default credit requirements
        else if (pathToCollection.includes("focusArea") && userModuleGroup.groupName.includes("electives")) {
          setCreditsToMeet = 0;
          setDoc(doc(db, pathToCollection, userModuleGroup.groupName), {
            creditsToMeet: setCreditsToMeet,
            creditsCompleted: "0",
            modulesTaken: []
          });
        }
        // non-focusArea, fetch & set credit requirements from graduationProgress document in database
        else {
          const pathToGradReqCollection = moduleGroupsArray[moduleGroupIndex].collectionPath;
          const splitPathArray = pathToGradReqCollection.split("/");
          const pathToGradReqField = splitPathArray[0] + "/" + splitPathArray[1] + "/" + splitPathArray[2] + "/" + splitPathArray[3];
          console.log("Module Group: " + userModuleGroup.groupName + ", Path: " + pathToGradReqField);
          console.log("User: " + currentUserEmail + ", Path: " + pathToCollection);
          async function getGradReqSubgroupCreditsToMeet() {
            const gradReqForModuleSnapshot = await getDocs(collection(db, pathToGradReqField));
            // cycle through all non-focusArea subgroups in the array
            gradReqForModuleSnapshot.forEach((subGroupDoc) => {
              if (subGroupDoc.id === userModuleGroup.groupName) {
                setCreditsToMeet = subGroupDoc.data().creditsToMeet;
                setDoc(doc(db, pathToCollection, userModuleGroup.groupName), {
                  creditsToMeet: setCreditsToMeet,
                  creditsCompleted: "0",
                  modulesTaken: []
                });
              }
            });
          }
          getGradReqSubgroupCreditsToMeet();
        }
        moduleGroupIndex++;
      });      
    } catch (error) {
      console.log(error.message);
    };
  }

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
          <CheckWarning/>
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