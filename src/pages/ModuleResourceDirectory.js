// styles
import '../index.css';

// components / pages / images
import MainNavbar from '../components/common/MainNavbar';
import ModuleResourceTabSection from '../components/module_resource_directory/ModuleResourceTabSection';

// tools
import { Helmet } from 'react-helmet';
import React, { useState, useEffect } from 'react';

const ModuleResourceDirectory = () => {
  // get module data from nusmods api
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.nusmods.com/v2/2023-2024/moduleInfo.json', true);
    request.onload = function () {
      var data = JSON.parse(this.response);
      // set moduleData variable to the last 5 items of the entire module list
      // variable is used later on to display the items in moduleData on the
      // module recommender page
      setModuleData(data.slice(-5));
    }
    request.send();
  }, [])

  return (
    <>
      <Helmet>
        <title>nineNote | Module Resource Directory</title>
      </Helmet>
      <MainNavbar />
      <ModuleResourceTabSection moduleData={moduleData}/>
    </>
  )
}

export default ModuleResourceDirectory