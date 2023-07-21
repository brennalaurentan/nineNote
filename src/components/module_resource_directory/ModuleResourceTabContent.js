// styles

// components / pages / images
import ModuleResourceCard from './ModuleResourceCard'

// tools
import { useEffect, useState } from 'react';

const ModuleResourceTabContent = ({ selectedModuleCode, moduleData, selectedModuleResources }) => {

    // handles module details
    const [moduleCode, setModuleCode] = useState('');
    const [moduleMC, setModuleMC] = useState('');
    const [moduleName, setModuleName] = useState('');
    const [moduleFaculty, setModuleFaculty] = useState('');
    const [moduleDept, setModuleDept] = useState('');

    // function to set module details based on selected module code
    useEffect(() => {
        console.log(moduleData);
        moduleData.map((module, index) => {
            if (module.moduleCode === selectedModuleCode) {
                setModuleCode(module.moduleCode);
                setModuleMC(module.moduleCredit);
                setModuleName(module.title);
                setModuleFaculty(module.faculty);
                setModuleDept(module.department);
            }
            return ""
        })
    }, [moduleData, selectedModuleCode])

    return (
        <ModuleResourceCard
            moduleCode={moduleCode}
            moduleMC={moduleMC}
            moduleName={moduleName}
            moduleFaculty={moduleFaculty}
            moduleDept={moduleDept}
            selectedModuleResources={selectedModuleResources}
        />
    )
}

export default ModuleResourceTabContent