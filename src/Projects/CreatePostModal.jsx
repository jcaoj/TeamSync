import React, { useState, useContext, useEffect } from 'react';
import "./Projects.css";
import "../Modal.css";
import axios from 'axios';
import { Button, Textarea, Title2, Input, Label, Dropdown, Option } from '@fluentui/react-components';
import { Context } from "../Context";

export default function CreatePostModal({ onCreate, onClose }) {
  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();
  const [caption, setCaption] = useState();
  const [title, setTitle] = useState();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const [projectsArray, setProjectsArray] = useState([]);
  const { statuses, setStatuses, projects } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!files || files.length === 0) {
      console.log("No image selected for upload");
      return;
    }

    const formdata = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('image', files[i]);
    }

    onCreate({ title: title, caption: caption, formdata: formdata });
  };

  useEffect(() => {
    var formatted = [];
    Object.keys(projects).forEach(function (key) {
      formatted.push([projects[key].id, projects[key].name]);
    });
    setProjectsArray(formatted);
  }, [projects])

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
    <div className="modal">
      <div className="modal-content">
        <div className="title">
          <Title2>Create Post</Title2>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Label htmlFor="project" size="large">
            Project
          </Label>
          <Dropdown
            aria-labelledby="project"
            placeholder="Select a project"
            className="input"
            onOptionSelect={(e, data) => setProjectName(data.optionValue[1])}>
            {projectsArray.map((option) => (
              <Option key={option} value={option[0]}>
                {option[1]}
              </Option>
            ))}
          </Dropdown>

          <Label htmlFor="title" size="large">Title</Label>
          <Input id="title"
            className="input"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required />
          <input
            type="file"
            className="fileUpload"
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
              return <img className="postImage" key={index} src={pic} alt={`preview-${index}`} />;
            })}
          <div className="caption">
            <label>Caption:</label>
            <Textarea
              className="input"
              value={caption}
              onChange={(e) => setCaption([e.target.value])}
            />
          </div>
          <div className="buttonGroup">
            <Button onClick={onClose}>Close</Button>
            <Button appearance="primary" type="submit">
              Upload</Button>
          </div>
        </form>
      </div>
    </div>
  );
}