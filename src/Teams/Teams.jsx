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

    // If the teams aren't already in the correct format, you'd fetch and set them here
    // Since we're assuming they are already in the correct format, we don't need to do anything
  }, [setCurrentPage]);

  const handleCreateTeam = (newTeam) => {
    // Create a new team object with a unique ID (for demo purposes using Date.now())
    const updatedTeams = {
      ...teams,
      [newTeam.id]: { ...newTeam, id: Date.now() }
    };
    setTeams(updatedTeams);
    setIsModalOpen(false);
  };

  // Convert the 'teams' object from context to an array for the TeamTable
  const teamsArray = teams ? Object.values(teams) : [];

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
