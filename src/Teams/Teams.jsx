import React, { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import TeamTable from "./TeamTable";
import CreateTeamModal from './CreateTeamModal';
import { Button } from '@fluentui/react-components';
import { AddSquare16Regular } from "@fluentui/react-icons";

export default function Teams() {
  const { currentPage, setCurrentPage } = useContext(Context);
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("use effect mounted teams")
    setCurrentPage("teams")
    setTeams([{id: Date.now(), name: "Team 1", description: "blah blah blah"}, {id: Date.now(), name: "Team 2", description: "blah blah blah"}])
  }, []);

  const handleCreateTeam = (team) => {
    setTeams([...teams, team]); 
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Teams</h2>
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