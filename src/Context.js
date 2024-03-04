import React, { useState } from "react";
 
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [statuses, setStatuses] = useState([]);
    const [teams, setTeams] = useState();
    const [currentPage, setCurrentPage] = useState();
 
    return (
        <Context.Provider value={{currentPage, setCurrentPage, statuses, setStatuses, teams, setTeams}}>
            {children}
        </Context.Provider>
    );
};