import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import TeamTable from "./TeamTable";
import CreateTeamModal from './CreateTeamModal';
import { Button, Title2 } from '@fluentui/react-components';
import { AddSquare16Regular } from "@fluentui/react-icons";

export default function Teams() {
  const { currentPage, setCurrentPage, teams, setTeams } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setCurrentPage("teams");
  }, [setCurrentPage]);

  const handleCreateTeam = (newTeam) => {
    const updatedTeams = {
      ...teams,
      [newTeam.id]: { ...newTeam}
    };
    setTeams(updatedTeams);
    setIsModalOpen(false);
  };


  const teamsArray = teams ? Object.values(teams) : []; //DataGrid in TeamTable.jsx requires an array to render the table

  return (
    <div className="page">
      <div className="title">
        <Title2>Teams</Title2>
      </div>
      <TeamTable teams={teamsArray}/>
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
