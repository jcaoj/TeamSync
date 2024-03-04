import React from "react";
import { useState, useContext, useEffect } from "react";
import "./Projects.css";
import ProjectCard from "./ProjectCard";
import ViewCreateProjects from "./ViewProject";
import { Button, Text, Title2, 
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Spinner
 } from '@fluentui/react-components';
import { AddSquare16Regular } from "@fluentui/react-icons";
import CreateProjectModal from "./CreateProjectModal";
import { Context } from "../Context";
import axios from 'axios';

export default function Projects() {
  const {statuses, setStatuses, teams, setTeams} = useContext(Context);
  const [viewProject, setViewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [projects, setProjects] = useState([]);
  const [teamProjects, setTeamProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [teamsLoaded, setTeamsLoaded] = useState(false);

  function createProject(project) {
    setProjects([...projects, project]); 
    setIsModalOpen(false);
    axios.post(`http://localhost:8081/uploadProject?teamId=${project.teamId}&name=${project.name}&description=${project.description}&status=${project.status}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function onReturnToProjects() {
    setViewProject(false)
    setSelectedProject(null)
  }

  function projectSelected(project) {
    setViewProject(true)
    setSelectedProject(project)
  }

  function ProjectsList(props) {
    return (
      <>
        <div className="title">
        <Title2>{props.title}</Title2>
        </div>
        {
          props.list.length > 0 ? ( 
            <div className="grid">
              {props.list.map(project => (
                  <ProjectCard key={project.id} onProjectSelected={props.onProjectSelected} project={project} teams={teams}></ProjectCard>))}
            </div>
          ) : (
          <div>
            <Text align="center">{props.noProjectsText}</Text>
          </div>
          )
        }
      </>
    );
  }
  
  useEffect(() => {
      axios.get("http://localhost:8081/getProjects")
      .then(res => {
        setProjects(res.data)
        setTeamProjects(res.data)
        setProjectsLoaded(true)
      })
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    console.log(teams)
    if (teams !== undefined) {
      setTeamsLoaded(true)
    }
  }, teams)

  return (
    <>
    { projectsLoaded && teamsLoaded ? (
      !viewProject ? (
      <div className="page">
        <ProjectsList title="My Projects" list={projects} onProjectSelected={projectSelected}
        noProjectsText="You are not following any projects. Create a project or follow an existing project."></ProjectsList>
        <br/>
        <ProjectsList title="Team Projects" list={teamProjects} onProjectSelected={projectSelected}
        noProjectsText="There are no projects in your teams that you aren't following."></ProjectsList>
        <br/>
        <div className="createButton">
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <MenuButton menuIcon={<AddSquare16Regular/>}appearance="primary">Create</MenuButton>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem onClick={() => setIsModalOpen(true)}>Project</MenuItem>
                <MenuItem>Update</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>
        <br/>
        <br/>
        <br/>
      </div>
      ) : (
        <>
          <ViewCreateProjects onReturnToProjects={onReturnToProjects} project={selectedProject ? selectedProject : null}></ViewCreateProjects>
        </>
    )) : (
      <Spinner/>
    )}

    {isModalOpen && <CreateProjectModal onCreate={createProject} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
