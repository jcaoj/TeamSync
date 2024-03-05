import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import TeamTable from "./TeamTable";
import CreateTeamModal from './CreateTeamModal';
import { Button, Title2 } from '@fluentui/react-components';
import { AddSquare16Regular } from "@fluentui/react-icons";

export default function Teams() {
  // need to setCurrentPage("teams") on page load, but page needs to be updated to match teams format from context
  // format is a key/value dict: {
  //    {1: {id: 1, name: "name", description: "description"}}
  // }
  // where key is the teamId for easy access  
  // to access: teams[key], ex. teams[1] for team with id 1
  // to loop through: 
  // Object.keys(teams).forEach(function(key) {
  //   // stuff here
  //   // access the teams object with teams[key]
  // });
  //const {currentPage, setCurrentPage, statuses, setStatuses, teams, setTeams} = useContext(Context);

  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("use effect mounted teams")
    // setCurrentPage("teams")
    setTeams([{id: Date.now(), name: "Team 1", description: "blah blah blah"}, {id: Date.now(), name: "Team 2", description: "blah blah blah"}])
  }, []);

  const handleCreateTeam = (team) => {
    setTeams([...teams, team]); 
    setIsModalOpen(false);
  };

  return (
    <div className="page">
      <div className="title">
        <Title2>Teams</Title2>
      </div>
      <TeamTable teams={teams}/>
      <div className="createButton">
        <Button 
          icon={<AddSquare16Regular />} 
          appearance="primary" 
          onClick={() => setIsModalOpen(true)}
        >
          Create Team
        </Button>
      </div>
      {isModalOpen && <CreateTeamModal onCreate={handleCreateTeam} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}