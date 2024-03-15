import React from "react";
import { useState, useContext, useEffect } from "react";
import {
  Button, Text, Title2,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Spinner
} from '@fluentui/react-components';
import "./Projects.css";
import './Posts.css';
import CreateProjectModal from "./CreateProjectModal";
import CreatePostModal from "./CreatePostModal";
import ProjectCard from "./ProjectCard";
import CreateButton from "./CreateButton";
import { Context } from "../Context";
import axios from 'axios';

export default function Projects(props) {
  const { username, userId, currentPage, setCurrentPage, statuses, setStatuses, teams, setTeams } = useContext(Context);
  const [projects, setProjects] = useState([]);
  const [teamProjects, setTeamProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [teamsLoaded, setTeamsLoaded] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [projectsUpdated, setProjectsUpdated] = useState(false);

  function createProject(project) {
    setProjects([...projects, project]);
    setIsProjectModalOpen(false);
    axios.post(`http://localhost:8081/uploadProject?teamId=${project.teamId}&name=${project.name}&description=${project.description}&status=${project.status}&username=${username}&userId=${userId}`)
      .then(res => {
        console.log(res)
        axios.post(`http://localhost:8081/followProject?userId=${userId}&projectId=${res.data.Status.insertId}`)
        .then(res => setProjectsUpdated(!projectsUpdated))
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  function createPost(post) {
    setIsPostModalOpen(false);
    axios.post(`http://localhost:8081/uploadPost?projectId=${post.image}&message=${post.message}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  function toggleFollow(project) {
    if (project.followed == 1) {
      axios.post(`http://localhost:8081/unfollowProject?userId=${userId}&projectId=${project.id}`)
      .then(res => setProjectsUpdated(!projectsUpdated))
      .catch(err => console.log(err));
    }
    else {
      axios.post(`http://localhost:8081/followProject?userId=${userId}&projectId=${project.id}`)
      .then(res => setProjectsUpdated(!projectsUpdated))
      .catch(err => console.log(err));
    }
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
                <ProjectCard key={project.id} project={project} teams={teams} toggleFollow={toggleFollow}></ProjectCard> ))}
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
    setCurrentPage("projects")
    axios.get(`http://localhost:8081/getProjectByUserId?userId=${userId}`)
      .then(res => {
        var followedProjects = [];
        var teamProjects = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].followed == 1) {
            followedProjects.push(res.data[i])
          }
          else {
            teamProjects.push(res.data[i])
          }
        }
        setProjects(followedProjects)
        setTeamProjects(teamProjects)
        setProjectsLoaded(true)
      })
      .catch(err => console.log(err));
  }, [projectsUpdated])

  return (
    <>
      {projectsLoaded ? (
        <div className="page">
          <ProjectsList title="My Projects" list={projects} 
            noProjectsText="You are not following any projects. Create a project or follow an existing project."></ProjectsList>
          <br />
          <ProjectsList title="Team Projects" list={teamProjects} 
            noProjectsText="There are no projects in your teams that you aren't following."></ProjectsList>
          <br />
          <CreateButton setIsProjectModalOpen={setIsProjectModalOpen} setIsPostModalOpen={setIsPostModalOpen}></CreateButton>
          <br />
          <br />
          <br />
        </div>
      ) : (
        <div className="spinnerContainer">
          <Spinner />
        </div>
      )}

      {isProjectModalOpen && <CreateProjectModal onCreate={createProject} onClose={() => setIsProjectModalOpen(false)} />}
      {isPostModalOpen && <CreatePostModal onCreate={createPost} onClose={() => setIsPostModalOpen(false)} />} {/* Render post modal */}
    </>
  );
}
