import React, { useState, useContext, useEffect } from 'react';
import "./Projects.css";
import "../Modal.css";
import axios from 'axios';
import { Button, Textarea, Title2, Input, Label, Dropdown, Option } from '@fluentui/react-components';
import { Context } from "../Context";

export default function CreatePostModal({ onClose, existingProjectId = null, existingProjectName = null }) {
  const [files, setFiles] = useState();
  const [previews, setPreviews] = useState();
  const [caption, setCaption] = useState();
  const [title, setTitle] = useState();
  const [projectId, setProjectId] = useState(existingProjectId);
  const [projectName, setProjectName] = useState(existingProjectName);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const [projectsArray, setProjectsArray] = useState([]);
  const { username, userId, statuses, setStatuses, projects } = useContext(Context);

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

    axios.post(`http://localhost:8081/uploadPost?projectId=${projectId}&title=${title}&caption=${caption}&username=${username}`, formdata)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    onClose();
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/getProjectByUserId?userId=${userId}`)
            .then(res => {
              var formatted = [];
              Object.keys(res.data).forEach(function (key) {
                formatted.push([res.data[key].id, res.data[key].name]);
              });
              setProjectsArray(formatted);
            })
            .catch(err => console.log(err));
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
            defaultValue={projectName}
            defaultSelectedOptions={[projectId]}
            onOptionSelect={(e, data) => setProjectId(data.optionValue)}>
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