import React, { useState } from "react";
 
export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState();
    const [currentPage, setCurrentPage] = useState();
    const [projects, setProjects] = useState();
    const [username, setUsername] = useState();
    const [userId, setUserId] = useState();
    const [profilePicName, setProfilePicName] = useState();
 
    return (
        <Context.Provider value={{users, setUsers, username, setUsername, userId, setUserId, profilePicName, setProfilePicName, currentPage, setCurrentPage, statuses, setStatuses, teams, setTeams, projects, setProjects}}>
            {children}
        </Context.Provider>
    );
};