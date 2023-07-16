// styles
import '../index.css';

// components / pages / images
import MainNavbar from '../components/common/MainNavbar';
import ModuleResourceTabSection from '../components/module_resource_directory/ModuleResourceTabSection';

// tools
import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';
import { getDoc, doc, collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../components/others/firebase';

const ModuleResourceDirectory = () => {
  // handles module data retrieved from nusmods api
  const [moduleData, setModuleData] = useState([]);

  // function to retrieve module data from nusmods api
  useEffect(() => {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.nusmods.com/v2/2023-2024/moduleInfo.json', true);
    request.onload = function () {
      var data = JSON.parse(this.response);
      // set moduleData variable to the retrieved data from api
      // variable is used later on to display the items in moduleData on the
      // module recommender page
      setModuleData(data);
    }
    request.send();
  }, [])

  // handles module resources retrieved from firebase
  const [moduleResources, setModuleResources] = useState([]);

  // function to retrieve module resources from firebase and update state
  useEffect(() => {
    console.log("module resources retrieved!");
    async function retrieveModuleResources() {
      const moduleResourcesCollectionRef = collection(db, `moduleResources`);
      const moduleResourcesCollectionCountSnapshot = getCountFromServer(moduleResourcesCollectionRef);
      const numberOfModules = (await moduleResourcesCollectionCountSnapshot).data().count;
      try {
        let moduleResourcesArray = [];
        let moduleIndex = 1;

        while (moduleIndex <= numberOfModules) {
          const moduleResourcesDocumentRef = doc(db, `moduleResources`, `module_${moduleIndex}`);
          const moduleResourcesDocumentSnap = await getDoc(moduleResourcesDocumentRef);
          console.log("module resources snap: ", moduleResourcesDocumentSnap);         

          const newItem = {
            moduleCode: moduleResourcesDocumentSnap.data().moduleCode,
            moduleDescription: moduleResourcesDocumentSnap.data().moduleDescription,
            moduleWebsite: moduleResourcesDocumentSnap.data().moduleWebsite,
            moduleBooks: moduleResourcesDocumentSnap.data().moduleBooks,
          }

          moduleResourcesArray.push(newItem);
          setModuleResources(moduleResourcesArray);
          moduleIndex++;
        }

        console.log("number of modules: ", numberOfModules);
        console.log("module resources array: ", moduleResourcesArray);
      } catch (error) {
        console.log(error.message);
      }
    }
    retrieveModuleResources();
  }, [])

  return (
    <>
      <Helmet>
        <title>nineNote | Module Resource Directory</title>
      </Helmet>
      <MainNavbar />
      <ModuleResourceTabSection moduleData={moduleData} moduleResources={moduleResources}/>
    </>
  )
}

export default ModuleResourceDirectory