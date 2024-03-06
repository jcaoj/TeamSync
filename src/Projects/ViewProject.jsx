import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context";
import {
  Button,
  Title2,
  Title3,
  Text,
  Subtitle2,
  Subtitle1,
  ToolbarButton,
} from "@fluentui/react-components";
import {
  ArrowLeft24Regular,
  FolderOpen24Filled,
  LockClosed24Filled,
  Archive24Filled
} from "@fluentui/react-icons";
import "./ViewProject.css";
import CreateButton from "./CreateButton";
import CreatePostModal from "./CreatePostModal";
import CreateProjectModal from "./CreateProjectModal";
import axios from 'axios';

export default function ViewCreateProject(props) {
  const { statuses, setStatuses, teams, setTeams } = useContext(Context);
  const [project, setExistingProject] = useState(props.project);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  function createProject(project) {
    setIsProjectModalOpen(false);
    axios.post(`http://localhost:8081/uploadProject?teamId=${project.teamId}&name=${project.name}&description=${project.description}&status=${project.status}`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function createPost(post) {
    setIsPostModalOpen(false);
    axios.post(`http://localhost:8081/uploadPost?projectId=${post.image}&message=${post.message}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <>
      {
        <div className="page-padding page">
          <ToolbarButton
            aria-label="Back"
            appearance="subtle"
            icon={<ArrowLeft24Regular />}
            onClick={() => props.onReturnToProjects()}
          />
          <div className="responsive-two-column-grid">
            <div>
              <div className="title">
                <Title2>{project.name}</Title2>
              </div>
              <div>
                <Button appearance="primary">
                  Create Post
                </Button>
              </div>
            </div>
            <div>
              <Subtitle2>Team</Subtitle2> <br/>
              <Subtitle1>{teams[project.teamId].name}</Subtitle1>
              <br /> <br />
              <Subtitle2>Status</Subtitle2> <br/>
              <Subtitle1>{statuses[project.status].description}</Subtitle1>
              {
                (() => {
                  switch(project.status) {
                    case "ACT":
                      return <FolderOpen24Filled className="statusIcon" primaryFill={statuses[project.status].colour}></FolderOpen24Filled>;
                    case "CLSD":
                      return <LockClosed24Filled className="statusIcon"  primaryFill={statuses[project.status].colour}></LockClosed24Filled>;
                    case "ARCH":
                      return <Archive24Filled className="statusIcon"  primaryFill={statuses[project.status].colour}></Archive24Filled>;
                  }
                })()
              }        
              <br /> <br />
              <Subtitle2>Description</Subtitle2> <br/>
              <Text>{project.description}</Text>
            </div>
          </div>
          <CreateButton setIsProjectModalOpen={setIsProjectModalOpen} setIsPostModalOpen={setIsPostModalOpen}></CreateButton>
        </div>
      }

    {isProjectModalOpen && <CreateProjectModal onCreate={createProject} onClose={() => setIsProjectModalOpen(false)} />}
    {isPostModalOpen && <CreatePostModal onCreate={createPost} onClose={() => setIsPostModalOpen(false)} />} {/* Render post modal */}
    </>
  );
}
