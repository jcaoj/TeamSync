import React, { useEffect, useState } from "react";
import { Button, Title2, Title3, Text } from '@fluentui/react-components';

export default function Posts(props) {
  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();

  // rendering previews
  useEffect(() => {
    if (!files) return;
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

  const isExistingProject = true; 
  const existingProject = {
    name: "Project Name",
    team: "Project Team",
    description: "Project Description",
  };

  return (
    <main className="container">
      <br />
      <h3>Form with image preview</h3>
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
          return <img key={index} src={pic} alt={`preview-${index}`} />;
        })}

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
                <Button onClick={() => props.createPost()} appearance="primary">
                  Back To Projects
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
