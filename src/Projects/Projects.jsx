import React from "react";
import { useState, useContext, useEffect } from "react";
import { Context } from "../Context";
import "./Projects.css";
import ProjectCard from "./ProjectCard";
import ViewCreateProjects from "./ViewCreateProject";

import { Button, Text, Title2, 
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
 } from '@fluentui/react-components';

import { AddSquare16Regular } from "@fluentui/react-icons";

export default function Projects() {
  const { currentPage, setCurrentPage } = useContext(Context);

  const [viewProject, setViewProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [projects, setProjects] = useState([ {
    key:1234, name:"Project 1", description:"this is project 1", team: "Team ABC"}]);
  const [teamProjects, setTeamProjects] = useState([
    { key:1234, name:"Project 1", description:"this is project 1", team: "Team ABC"},  
    { key:1234, name:"Project 1", description:"this is project 1", team: "Team ABC"},  
  ]);

  function createProject() {
    setViewProject(true)
  }

  function onReturnToProjects() {
    setViewProject(false)
    setSelectedProject(null)
  }

  function projectSelected(project) {
    setViewProject(true)
    setSelectedProject(project)
  }

  useEffect(() => {
    console.log("use effect mounted")
    // fetch('/getProjects')
    // .then(res => console.log(res));
    setCurrentPage("projects")
  }, []);

  return (
    <>
    { !viewProject ? (
      <div className="page">
        <ProjectsList title="My Projects" list={projects} onProjectSelected={projectSelected}
        noProjectsText="You are not following any projects. Create a project or follow an existing project."></ProjectsList>
        <br/>
        <ProjectsList title="Team Projects" list={teamProjects} onProjectSelected={projectSelected}
        noProjectsText="There are no projects in your teams that you aren't following."></ProjectsList>
        <br/>
        <div className="createButton">
          {/* <Button className="createButton" onClick={createProject} appearance="primary">Create Project</Button> */}
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <MenuButton menuIcon={<AddSquare16Regular/>}appearance="primary">Create</MenuButton>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem onClick={createProject}>Project</MenuItem>
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
    )}
    </>
  );
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
                      <ProjectCard onProjectSelected={props.onProjectSelected} project={project}></ProjectCard>))}
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