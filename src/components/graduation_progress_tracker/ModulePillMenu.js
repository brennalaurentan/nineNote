// styles

// components / pages / images

// tools
import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { deleteDoc, getDocs, doc, collection, updateDoc } from 'firebase/firestore';
import { auth, db } from '../others/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const ModulePillMenu = ({ moduleID, moduleCode, moduleCategory, moduleMC, yearSem, onMenuClick }) => {

		// handles currently signed-in user
		const [user, setUser] = useState({});

		// function to get the currently signed-in user
		useEffect(() => {
			onAuthStateChanged(auth, (currentUser) => {
				setUser(currentUser);
			});
		}, [])

		const currentUserEmail = user.email;

    const [menu, setMenu] = useState(null);
		//const [currentUserEmail, setCurrentUserEmail] = useState("");
    const open = Boolean(menu);

		// const auth = getAuth();
		// const user = auth.currentUser;
		// setCurrentUserEmail(user.email);

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

    // function to retrieve the path to the collection which stores the module group tracker for
    // a particular specified user
    // the path to the collection returned, contains fields called 'creditsCompleted' and 'creditsToMeet'
    function retrieveUserModuleCreditTrackerPath(userEmail, moduleGroupName) {
			let returnPath = "";
			userCreditTrackerPathArray.forEach((moduleGroup) => {
				if (moduleGroup.groupName === moduleGroupName) {
						returnPath = moduleGroup.collectionPath;
				}
			});
			returnPath = returnPath.replace(/!/g, userEmail);
			console.log(returnPath);
			return returnPath;
    }

    // function which checks the commonCurriculum subgroup requirements
    // and changes the overall_fulfilment field accordingly
    // returns the boolean value of overall_fulfilment
    async function checkAndSetCommonCurriculumOverallFulfilment() {
        const querySnapshot = await getDocs(collection(db, `users/${currentUserEmail}/gradProgress`));
        querySnapshot.forEach((group) => {
        // groups are: commonCurriculum, programme, unrestrictedElectives. We want commonCurriculum
        if (group.id === "commonCurriculum") {
            if (group.data().computingEthics_fulfilment === true &&
                group.data().crossdisciplinaryEducation_fulfilment === true &&
                group.data().interdisciplinaryEducation_fulfilment === true &&
                group.data().universityLevel_fulfilment === true) {
                updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
                    overall_fulfilment: true
                })
                return true;
            }
            else {
            updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
                overall_fulfilment: false
            })
            return false;
            }
        }
        });
    }

    // function which checks the programme subgroup requirements
    // and changes the overall_fulfilment field accordingly
    // returns the boolean value of overall_fulfilment
    async function checkAndSetProgrammeOverallFulfilment() {
        const querySnapshot = await getDocs(collection(db, `users/${currentUserEmail}/gradProgress`));
        querySnapshot.forEach((group) => {
        // groups are: commonCurriculum, programme, unrestrictedElectives. We want programme
        if (group.id === "programme") {
            if (group.data().breadthAndDepth_fulfilment === true &&
                group.data().foundation_fulfilment === true &&
                group.data().mathematicsAndSciences_fulfilment === true) {
                updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
                    overall_fulfilment: true
                })
                return true;
            }
            else {
            updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
                overall_fulfilment: false
            })
            return false;
            }
        }
        })
    }

    // function which checks the unrestrictedElectives subgroup requirements
    // and changes the overall_fulfilment field accordingly
    // returns the boolean value of overall_fulfilment
    async function checkAndSetUnrestrictedElectivesOverallFulfilment() {
        const querySnapshot = await getDocs(collection(db, `users/${currentUserEmail}/gradProgress`));
        querySnapshot.forEach((group) => {
        // groups are: commonCurriculum, programme, unrestrictedElectives. We want unrestrictedElectives
        if (group.id === "unrestrictedElectives") {
            if (parseInt(group.data().creditsCompleted) >= parseInt(group.data().creditsToMeet)) {
            updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "unrestrictedElectives"), {
                overall_fulfilment: true
            })
            return true;
            }
            else {
            updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "unrestrictedElectives"), {
                overall_fulfilment: false
            })
            return false;
            }
        }
        });
    }

    const handleClick = (event) => {
        setMenu(event.currentTarget);
    };

    const handleClose = () => {
        setMenu(null);
    };

    const handleDelete = async () => {
      onMenuClick(moduleID, moduleCode, yearSem);
      setMenu(null);

			try {

			console.log("module category is: " + moduleCategory);

			// delete module from 'modules' collection under user's profile database
			async function removeModuleFromUserModulesCollection(moduleCodeArg) {
				const userModulesCollectionPath = `users/${currentUserEmail}/modules`;
				const userModulesCollection = collection(db, userModulesCollectionPath);
				const userModulesQuerySnapshot = await getDocs(userModulesCollection);
				userModulesQuerySnapshot.forEach((semDoc) => {
					if (semDoc.id === moduleCodeArg) {
						deleteDoc(doc(db, userModulesCollectionPath, moduleCodeArg));
					}
				})
			}
			removeModuleFromUserModulesCollection(moduleCode);
			console.log("removeModuleFromUserModulesCollection function success");
	
			// retrieve necessary info pertaining to current progress of the deleted module's module group
			let moduleGroupCreditsCompleted = 0;
			let moduleGroupCreditsToMeet = 0;
			let newModuleGroupCreditsCompleted = 0;
			async function retrieveUserModuleGroupProgress() {
				console.log("currentUserEmail: " + currentUserEmail);
				console.log("moduleCategory: " + moduleCategory);
				const userModuleCollectionPath = retrieveUserModuleCreditTrackerPath(currentUserEmail, moduleCategory);
				console.log(userModuleCollectionPath);
				const userModuleCollectionPathSnapshot = await getDocs(collection(db, userModuleCollectionPath));
				userModuleCollectionPathSnapshot.forEach((moduleGroupInCollection) => {
						if (moduleGroupInCollection.id === moduleCategory) {
						moduleGroupCreditsCompleted = parseInt(moduleGroupInCollection.data().creditsCompleted);
						moduleGroupCreditsToMeet = parseInt(moduleGroupInCollection.data().creditsToMeet);
						}
				});
			}
			await retrieveUserModuleGroupProgress();
			console.log("retrieveUserModuleGroupProgress function successs");
		
			newModuleGroupCreditsCompleted = parseInt(moduleGroupCreditsCompleted) - parseInt(moduleMC);
			console.log("original credits completed for " + moduleCategory + ": " + moduleGroupCreditsCompleted);
			console.log("new credits completed for " + moduleCategory + ": " + newModuleGroupCreditsCompleted);
			let countedModuleCreditsLostForGroup = moduleMC;

			// if new group credits completed still exceeds the credits to meet
			if (newModuleGroupCreditsCompleted >= moduleGroupCreditsToMeet) {
				// set the 'counted credits' counter to 0 as the new still exceeds the creditsToMeet
				countedModuleCreditsLostForGroup = 0;
			}
			// else if the objective was previously met/exceeded but not anymore
			else if (moduleGroupCreditsCompleted >= moduleGroupCreditsToMeet &&
						newModuleGroupCreditsCompleted < moduleGroupCreditsToMeet) {
				// set the 'counted credits' counter to the difference between the creditsToMeet and the new group credit count
				countedModuleCreditsLostForGroup = moduleGroupCreditsToMeet - newModuleGroupCreditsCompleted;
			}
			console.log("counted credits lost towards overall: " + countedModuleCreditsLostForGroup);

			// update the fields in the document for the module subgroup
			const userModuleCollectionPath = retrieveUserModuleCreditTrackerPath(currentUserEmail, moduleCategory);
			console.log("[update fields in document for module subgroup] moduleCategory is " + moduleCategory + ", path is " + userModuleCollectionPath);
			await updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
				creditsCompleted: newModuleGroupCreditsCompleted,
				creditsToMeet: moduleGroupCreditsToMeet
			})
	
			// special check for 4k module, if it's a focus area module
			const moduleCodeNumbers = moduleCode.slice(-4);
			if (moduleCategory.includes("primaries")) {
				if (parseInt(moduleCodeNumbers) >= 4000) {
					// update the fourKModTaken field in the focusArea subgroup
					updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
						fourKModTaken: false
					})
				}
			}
	
			// specially for focusArea, update the creditsCompleted field in the focusAreas document
			let focusAreasCreditsCompleted = 0;
			let newFocusAreaCreditsCompleted = 0;
			let countedFocusAreasCreditsLost = 0;
			let focusAreasCreditsToMeet = 0;
			if (userModuleCollectionPath.includes("focusAreas")) {
				async function updateFocusAreaCredits() {
					const focusAreaCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`; 
					const focusAreaCollection = collection(db, focusAreaCollectionPath);
					const focusAreaQuerySnapshot = await getDocs(focusAreaCollection);
					// run through focusArea subdocument, then industryExperience subdocument
					focusAreaQuerySnapshot.forEach((doc) => {
						if (doc.id === "focusAreas") {
							focusAreasCreditsCompleted = parseInt(doc.data().creditsCompleted);
							focusAreasCreditsToMeet = parseInt(doc.data().creditsToMeet);
						}
					})
					console.log("original focusAreas creditsCompleted: " + focusAreasCreditsCompleted);
					newFocusAreaCreditsCompleted = parseInt(focusAreasCreditsCompleted) - parseInt(moduleMC);
					console.log("new focusArea credits completed (after deduction): " + newFocusAreaCreditsCompleted);
					await updateDoc(doc(db, focusAreaCollectionPath, "focusAreas"), {
						creditsCompleted: parseInt(newFocusAreaCreditsCompleted)
					})

					// if new credits completed for focusAreas does meet the creditsToMeet for focusAreas
					if (newFocusAreaCreditsCompleted < focusAreasCreditsToMeet) {
						// if old credits completed did not meet the creditsToMeet for focusAreas
						if (focusAreasCreditsCompleted < focusAreasCreditsToMeet) {
							// count full
							countedFocusAreasCreditsLost = focusAreasCreditsCompleted - newFocusAreaCreditsCompleted;
						}
						// else if old credits completed met creditsToMeet but new credits no longer do
						else {
							// count partial, up to creditsToMeet
							countedFocusAreasCreditsLost = focusAreasCreditsToMeet - newFocusAreaCreditsCompleted;
						}
					}
					// else, both old and new credits completed for focusAreas meet the creditsToMeet
					else {
						// count none
						countedFocusAreasCreditsLost = 0;
					}
					console.log("countedFocusAreasCreditsLost is " + countedFocusAreasCreditsLost);
				}
				updateFocusAreaCredits();
			}
	
			// update the fields in the main module group 
			// (creditsCompleted field in main commonCurriculum/programme/unrestrictedElectives documents)
			async function updateMainModuleGroupCredits() {
				const gradProgressCollectionPath = `users/${currentUserEmail}/gradProgress`;
				const gradProgressCollection = collection(db, gradProgressCollectionPath);
				const gradProgressQuerySnapshot = await getDocs(gradProgressCollection);
				let mainModuleGroupName = "";
				if (userModuleCollectionPath.includes("commonCurriculum")) {
					mainModuleGroupName = "commonCurriculum";
				} else if (userModuleCollectionPath.includes("programme")) {
					mainModuleGroupName = "programme";
				} else {
					mainModuleGroupName = "unrestrictedElectives";
				}
				gradProgressQuerySnapshot.forEach((mainModuleGroup) => {
					if (mainModuleGroup.id === mainModuleGroupName) {
						console.log("main module group is " + mainModuleGroupName);
						console.log("updating main module credits, current credits completed = " + mainModuleGroup.data().creditsCompleted);
						console.log("new credits completed = " + countedModuleCreditsLostForGroup);
						if (userModuleCollectionPath.includes("focusAreas")) {
							countedModuleCreditsLostForGroup = countedFocusAreasCreditsLost;
						}
						updateDoc(doc(db, gradProgressCollectionPath, mainModuleGroupName), {
							creditsCompleted: parseInt(mainModuleGroup.data().creditsCompleted) - parseInt(countedModuleCreditsLostForGroup)
						})
						console.log("updated main module credits");
					}
				})
			}
			await updateMainModuleGroupCredits();
		
			// if an objective was unmet by deleting this module (module group objective unmet)
			if ((moduleGroupCreditsCompleted >= moduleGroupCreditsToMeet) && (newModuleGroupCreditsCompleted < moduleGroupCreditsToMeet)) {
					console.log(moduleCategory + " objective lost!");
					// update the fields in the main group
					if (userModuleCollectionPath.includes("commonCurriculum")) {
						if (userModuleCollectionPath.includes("universityLevel")) {
							console.log("creditsCompleted: " + newModuleGroupCreditsCompleted);
							// update the fulfilment in the subgroup itself as well
							await updateDoc(doc(db, userModuleCollectionPath, moduleCategory), {
								creditsCompleted: newModuleGroupCreditsCompleted,
								creditsToMeet: moduleGroupCreditsToMeet,
								uLSubgroup_fulfilment: false
							})
		
							// set universityLevel_fulfilment to false
							updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
							universityLevel_fulfilment: false
							})
						}
						// if not universityLevel (computingEthics, crossDisciplinaryEducation, interdisciplinaryEducation)
						else {
							// set computingEthics_fulfilment / crossDisciplinaryEducation_fulfilment / interdisciplinaryEducation_fulfilment to false
							if (moduleCategory === "computingEthics") {
								updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
									computingEthics_fulfilment: false
								})
							}
							else if (moduleCategory === "crossDisciplinaryEducation") {
								updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
									crossdisciplinaryEducation_fulfilment: false
								})
							}
							else {
								updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "commonCurriculum"), {
									interdisciplinaryEducation_fulfilment: false
								})
							}
						}
						await checkAndSetCommonCurriculumOverallFulfilment();
					} 
					// for programme requirement modules
					else if (userModuleCollectionPath.includes("programme")) {
						// is a focusArea, meaning a focusArea was uncleared
						if (userModuleCollectionPath.includes("focusAreas")) {
	
							// check creditsCompleted for focusAreas
							async function checkFocusAreasCreditsCompleted() {
								let returnInt = 0;
								const focusAreasCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`;
								const focusAreasCollection = collection(db, focusAreasCollectionPath);
								const focusAreasQuerySnapshot = await getDocs(focusAreasCollection);
								focusAreasQuerySnapshot.forEach((subDoc) => {
									if (subDoc.id === "focusAreas") {
										returnInt = parseInt(subDoc.data().creditsCompleted);
									}
								});
								return returnInt;
							}

							// if 20MC focusArea credit requirement not met
							if (await checkFocusAreasCreditsCompleted() < 20) {
								// update the fulfilment in the focusArea subgroup to false (focusArea_fulfilment field)
								await updateDoc(doc(db, `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`, "focusAreas"), {
									focusAreas_fulfilment: false,
								})
							}
	
							async function checkBreadthAndDepthCredits() {
								let returnInt = 0;
								let focusAreasCreditsCompleted = 0;
								let industryExperienceCreditsCompleted = 0;
								let countedFocusAreasCredits = 0;
								let countedIndustryExperienceCredits = 0;
								const breadthAndDepthCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`;
								const breadthAndDepthCollection = collection(db, breadthAndDepthCollectionPath);
								const breadthAndDepthQuerySnapshot = await getDocs(breadthAndDepthCollection);
								breadthAndDepthQuerySnapshot.forEach((breadthAndDepthSubgroup) => {
									// focusAreas document
									if (breadthAndDepthSubgroup.id === "focusAreas") {
										focusAreasCreditsCompleted = parseInt(breadthAndDepthSubgroup.data().creditsCompleted);
										countedFocusAreasCredits = focusAreasCreditsCompleted;
										if (focusAreasCreditsCompleted > 20) {
											countedFocusAreasCredits = 20;
										}
									}
									// industryExperience document
									else {
										industryExperienceCreditsCompleted = parseInt(breadthAndDepthSubgroup.data().creditsCompleted);
										countedIndustryExperienceCredits = industryExperienceCreditsCompleted;
										if (industryExperienceCreditsCompleted > 12) {
											countedIndustryExperienceCredits = 12;
										}
									}
								})
								returnInt = countedFocusAreasCredits + countedIndustryExperienceCredits;
								return returnInt;
							}
									
							// if breadthAndDepthCredits dips below the breadthAndDepthCredits creditsToMeet
							if (await checkBreadthAndDepthCredits() < 32) {
								// set breadthAndDepth_fulfilment to false
								updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
									breadthAndDepth_fulfilment: false
								});
							}
						}                   
						// industryExperience
						else if (moduleCategory.includes("industryExperience")) {
							console.log("updating industryExperience_fulfilment to true");
							// update the fulfilment in the industryExperience subgroup (industryExperience_fulfilment field)
							await updateDoc(doc(db, `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`, "industryExperience"), {
								industryExperience_fulfilment: false
							})
	
							// function which calculates total number of credits completed for breadthAndDepth subgroup
							// by adding up the credits from focusAreas and industryExperience sub-subgroups
							// updates the 'creditsCompleted' field in the breadthAndDepth document, under programme main group
							async function checkBreadthAndDepthCredits() {
								let returnInt = 0;
								let focusAreasCreditsCompleted = 0;
								let countedFocusAreasCreditsCompleted = 0;
								let industryExperienceCreditsCompleted = 0;
								let countedIndustryExperienceCreditsCompleted = 0;
								const breadthAndDepthCollectionPath = `users/${currentUserEmail}/gradProgress/programme/breadthAndDepth`;
								const breadthAndDepthCollection = collection(db, breadthAndDepthCollectionPath);
								const breadthAndDepthQuerySnapshot = await getDocs(breadthAndDepthCollection);
								breadthAndDepthQuerySnapshot.forEach((breadthAndDepthSubgroup) => {
									// focusAreas document
									if (breadthAndDepthSubgroup.id === "focusAreas") {
										focusAreasCreditsCompleted = parseInt(breadthAndDepthSubgroup.data().creditsCompleted);
										countedFocusAreasCreditsCompleted = focusAreasCreditsCompleted;
										if (countedFocusAreasCreditsCompleted > 20) {
											countedFocusAreasCreditsCompleted = 20;
										}
									}
									// industryExperience document
									else {
										industryExperienceCreditsCompleted = parseInt(breadthAndDepthSubgroup.data().creditsCompleted);
										countedFocusAreasCreditsCompleted = industryExperienceCreditsCompleted;
										if (countedIndustryExperienceCreditsCompleted > 12) {
											countedIndustryExperienceCreditsCompleted = 12;
										}
									}
								})
								returnInt = parseInt(countedFocusAreasCreditsCompleted) + parseInt(countedIndustryExperienceCreditsCompleted);
								return returnInt;
							}
								
							// if breadthAndDepthCredits dips below the breadthAndDepthCredits creditsToMeet
							if (await checkBreadthAndDepthCredits() < 32) {
								// set breadthAndDepth_fulfilment to false
								updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
									breadthAndDepth_fulfilment: false
								});
							}
						}
						// mathematicsAndSciences or foundation
						else {
							// mathematicsAndSciences
							if (moduleCategory === "mathematicsAndSciences") {
								updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
									mathematicsAndSciences_fulfilment: false
								})
							}
							// foundation
							else {
								updateDoc(doc(db, `users/${currentUserEmail}/gradProgress`, "programme"), {
									foundation_fulfilment: false
								})
							}
						}
						await checkAndSetProgrammeOverallFulfilment();
					} 
					// for unrestrictedElective requirement modules
					else {
						await checkAndSetUnrestrictedElectivesOverallFulfilment();
					}
				}
			} catch (error) {
				console.log(error.message);
			}
    };

    return (
        <>
            <IconButton aria-label="delete" size="small" onClick={handleClick}>
                <KeyboardArrowDownIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleDelete} sx={{ color: "red.main" }}>Delete</MenuItem>
            </Menu>
        </>
    )
}

export default ModulePillMenu