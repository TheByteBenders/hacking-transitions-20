import React, {createContext, useEffect, useState} from "react";

const LeftColumnContext = createContext();

export const LeftColumnProvider = ({children}) => {
    const [dropDownClicked, setDropDownClicked] = useState("");
    const [cohortClicked, setCohortClicked] = useState("");
    const [cohorts, setCohorts] = useState([]);
    const [openDropDown, setOpenDropdown] = useState(null);

    const handleDropClicked = (value) =>{
        if(dropDownClicked === value){
            setDropDownClicked("")    
        }else{
            setDropDownClicked(value) 
        }
        
    }
    const handleCohortClicked = (cohort) => {
        if(cohortClicked === cohort){
            setCohortClicked("")
        }else{
            setCohortClicked(cohort)   
        }
        
    }
    useEffect(() => {
        fetch('http://localhost:8000/api/cohorts')
            .then(response => response.json())
            .then(data => setCohorts(data))
            .catch(error => console.log(error));
    }, []);
    const toggleDropDown = (cohortId) => {
        if (openDropDown === cohortId) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(cohortId);
        }
    };

    return( <LeftColumnContext.Provider value = {{
        dropDownClicked,
        handleDropClicked,
        cohortClicked, 
        handleCohortClicked,
        cohorts,
        toggleDropDown,
        openDropDown
    }}>
        {children}
    </LeftColumnContext.Provider>
    )
}

export default LeftColumnContext;