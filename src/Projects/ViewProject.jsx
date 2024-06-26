import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import {
  Button,
  Title2,
  Title3,
  Text,
  Subtitle2,
  Subtitle1,
  ToolbarButton,
  Toolbar,
  ToolbarGroup,
  Spinner
} from "@fluentui/react-components";
import {
  ArrowLeft24Regular,
  FolderOpen24Filled,
  LockClosed24Filled,
  Archive24Filled,
  Edit24Filled,
  Eye24Regular,
  Eye24Filled
} from "@fluentui/react-icons";
import "./ViewProject.css";
import CreateButton from "./CreateButton";
import CreatePostModal from "./CreatePostModal";
import CreateProjectModal from "./CreateProjectModal";
import axios from 'axios';
import PostCard from "./PostsCard";

export default function ViewProject(props) {
  const { username, userId, currentPage, setCurrentPage, statuses, setStatuses } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();
  const [viewProject, setViewProject] = useState();
  const [team, setTeam] = useState();
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [projectEdited, setProjectEdited] = useState(false);
  const [projectLoaded, setProjectLoaded] = useState(false);

  function closeProjectModal() {
    setIsProjectModalOpen(false)
    setIsEditProject(false)
  }

  function createProject(props) {
    setIsProjectModalOpen(false)
    setIsEditProject(false)

    if (props.isEditProject) {
      axios.post(`http://localhost:8081/editProject?id=${id}&teamId=${props.teamId}&name=${props.name}&description=${props.description}&status=${props.status}&username=${username}`)
        .then(res => {
          console.log(res)
          setProjectEdited(!projectEdited)
        })
        .catch(err => console.log(err));
    }
    else {
      axios.post(`http://localhost:8081/uploadProject?teamId=${props.teamId}&name=${props.name}&description=${props.description}&status=${props.status}&userId=${userId}`)
        .then(res => {
          console.log(res)
          axios.post(`http://localhost:8081/followProject?userId=${userId}&projectId=${res.data.Status.insertId}`)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  }

  function toggleFollow() {
    if (viewProject.followed == 1) {
      axios.post(`http://localhost:8081/unfollowProject?userId=${userId}&projectId=${id}`)
        .then(res => setProjectEdited(!projectEdited))
        .catch(err => console.log(err));
    }
    else {
      axios.post(`http://localhost:8081/followProject?userId=${userId}&projectId=${id}`)
        .then(res => setProjectEdited(!projectEdited))
        .catch(err => console.log(err));
    }
  }

  function ViewPosts(props) {
    return (
      <>
        {projectLoaded ? (
          <>
            {props.list.length > 0 && (
              <div className="postsGridContainer">
                <div className="postsGrid">
                  {props.list.map(post => (
                    <PostCard key={post.id} post={post}></PostCard>
                  ))}
                </div>
              </div>
            )}
            {props.list.length === 0 && (
              <Text align="center">There are no posts yet.</Text>
            )}
          </>
        ) : (
          <div className="spinnerContainer">
            <Spinner />
          </div>
        )}
      </>
    );
  }

  useEffect(() => {
    setCurrentPage("projects")
    axios.get(`http://localhost:8081/getProjectById?userId=${userId}&projectId=${id}`)
      .then(res => {
        setViewProject(res.data[0])

        axios.get(`http://localhost:8081/getTeamById?teamId=${res.data[0].teamId}`)
          .then(res => {
            setTeam(res.data[0])
            setProjectLoaded(true)
          })
          .catch(err => console.log(err));

      })
      .catch(err => console.log(err));
    // get posts related to the project
    axios.get(`http://localhost:8081/getPostsByProjectId?projectId=${id}`)
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, [projectEdited]);


  return (
    <>
      {
        <div className="page-padding page">
          {projectLoaded ? (
            <>
              <Toolbar className="toolbar">
                <ToolbarButton
                  aria-label="Back"
                  appearance="subtle"
                  size="small"
                  icon={<ArrowLeft24Regular />}
                  onClick={() => {
                    if (viewProject.status == "ARCH") {
                      navigate("/archivedProjects")
                    }
                    else {
                      navigate("/projects")
                    }
                  }}
                />
                <ToolbarGroup>
                  <ToolbarButton
                    aria-label="Follow Project"
                    appearance="subtle"
                    icon={viewProject.followed == 1 ? (<Eye24Filled />) : (<Eye24Regular />)}
                    onClick={toggleFollow}
                  />
                  <ToolbarButton
                    aria-label="Edit Project"
                    appearance="subtle"
                    icon={<Edit24Filled />}
                    onClick={() => {
                      setIsEditProject(true)
                      setIsProjectModalOpen(true)
                    }}
                  />
                </ToolbarGroup>
              </Toolbar>

              <div className="responsive-two-column-grid">
                <div className="column">
                  <div className="title">
                    <Title2>{viewProject.name}</Title2>
                  </div>

                  <ViewPosts list={posts} noPostsText="There are no posts yet"></ViewPosts>
                </div>
                <div>
                  <Subtitle2>Team</Subtitle2> <br />
                  <Subtitle1>{team.name}</Subtitle1>
                  <br /> <br />
                  <Subtitle2>Status</Subtitle2> <br />
                  <Subtitle1>{statuses[viewProject.status].description}</Subtitle1>
                  {
                    (() => {
                      switch (viewProject.status) {
                        case "ACT":
                          return <FolderOpen24Filled className="statusIcon" primaryFill={statuses[viewProject.status].colour}></FolderOpen24Filled>;
                        case "CLSD":
                          return <LockClosed24Filled className="statusIcon" primaryFill={statuses[viewProject.status].colour}></LockClosed24Filled>;
                        case "ARCH":
                          return <Archive24Filled className="statusIcon" primaryFill={statuses[viewProject.status].colour}></Archive24Filled>;
                      }
                    })()
                  }
                  <br /> <br />
                  <Subtitle2>Description</Subtitle2> <br />
                  <Text>{viewProject.description}</Text>
                  <br /> <br />
                  <Subtitle2>Created</Subtitle2> <br />
                  <Text>{String(viewProject.created).replace("T", " ").slice(0, -5)} by {viewProject.createdBy}</Text>
                  <br /> <br />
                  <Subtitle2>Last Modified</Subtitle2> <br />
                  <Text>{viewProject.modified ? (`${String(viewProject.modified).replace("T", " ").slice(0, -5)} by ${viewProject.modifiedBy}`) : ("N/A")} </Text>
                </div>
              </div>

              <CreateButton setIsProjectModalOpen={setIsProjectModalOpen} setIsPostModalOpen={setIsPostModalOpen}></CreateButton>
              {isProjectModalOpen && <CreateProjectModal onCreate={createProject} onClose={closeProjectModal} editProject={isEditProject ? viewProject : null} />}
              {isPostModalOpen && <CreatePostModal onCreate={() => setProjectEdited(!projectEdited)} onClose={() => setIsPostModalOpen(false)} existingProjectId={id} existingProjectName={viewProject.name} />}
            </>
          ) : (
            <div className="spinnerContainer">
              <Spinner />
            </div>
          )}
        </div>
      }
    </>
  );
}
