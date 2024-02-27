import React, { useState, useEffect } from "react";
import {
  Button,
  Title2,
  Title3,
  Text,
  makeStyles,
  Dropdown,
  Option,
  Textarea,
  shorthands,
  Input,
  Label,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  input: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap("2px"),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "600px",
  },
});

export default function ViewCreateProject(props) {
  const [existingProject, setExistingProject] = useState(props.project);
  const [isExistingProject, setIsExistingProject] = useState(
    existingProject != null
  );
  const [selectedTeam, setSelectedTeam] = useState();
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const styles = useStyles();
  const options = [
    "Cat",
    "Caterpillar",
    "Corgi",
    "Chupacabra",
    "Dog",
    "Ferret",
    "Fish",
    "Fox",
    "Hamster",
    "Snake",
  ];

  // rendering previews
  useEffect(() => {
    if (!files || files.length === 0) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }
    const objectUrls = tmp;
    setPreviews(objectUrls);

    // free memory
    return () => {
      for (let i = 0; i < objectUrls.length; i++) {
        URL.revokeObjectURL(objectUrls[i]);
      }
    };
  }, [files]);

  function createNewProject() {
    setExistingProject({
      name: document.getElementById("projectName").value,
      team: selectedTeam,
      description: document.getElementById("description").value,
    });

    setIsExistingProject(true);
  }

  function onTeamSelected(event, data) {
    setSelectedTeam(data.optionValue);
  }

  function createPost() {
    // Implement the logic to create a post using the selectedTeam, existingProject, and previews (image previews)
    // You may want to send this data to a backend API or handle it as needed in your application.
    console.log("Creating post with data:", {
      selectedTeam,
      existingProject,
      previews,
    });

    // Display the selected image
    if (previews && previews.length > 0) {
      const selectedImage = previews[0];
      // Display the image in your desired way (e.g., modal, popup, etc.)
      alert(`Selected Image: ${selectedImage}`);
    }
  }

  return (
    <>
      <div className="page-padding page">
        <div className="title">
          {isExistingProject ? (
            <>
              <Title2>{existingProject.name}</Title2>
              <br />
              <Title3>Team: {existingProject.team}</Title3>
              <br />
              <Text>{existingProject.description}</Text>
              <br />
              <br />
              <div>
                <Button onClick={createPost} appearance="primary">
                  Create Post
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => props.onReturnToProjects()}
                  appearance="primary"
                >
                  Back To Projects
                </Button>
              </div>
            </>
          ) : (
            <>
              <Title2>New Project</Title2>
              <br />
              <br />
              <div className={styles.input}>
                {/* ... (existing input fields) */}
                <Label htmlFor="description" size="large">
                  Description
                </Label>
                <Textarea id="description" {...props} />
              </div>
              <br />

              {/* File input for image */}
              <input
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                multiple
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFiles(e.target.files);
                  }
                }}
              />
              {previews &&
                previews.map((pic, index) => {
                  return (
                    <img key={index} src={pic} alt={`preview-${index}`} />
                  );
                })}

              <div>
                <Button onClick={createNewProject} appearance="primary">
                  Create Project
                </Button>
              </div>
              <br />
              <div>
                <Button
                  onClick={() => props.onReturnToProjects()}
                  appearance="primary"
                >
                  Back To Projects
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
