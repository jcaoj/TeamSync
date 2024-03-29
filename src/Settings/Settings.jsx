import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import {
    Button, Text, Title2,
    Subtitle1,
    Subtitle2Stronger,
    Label,
    Input,
    Spinner
} from '@fluentui/react-components';
import './Settings.css';
import axios from 'axios';

export default function Settings() {
    const { setCurrentPage, userId, username, setUsername, setProfilePicName } = useContext(Context);
    const [files, setFiles] = useState();
    const [previews, setPreviews] = useState();
    const [newUsername, setNewUsername] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            formdata.append('image', files[i]);
          }
        }
        
        axios.post(`http://localhost:8081/updateUser?userId=${userId}&username=${newUsername}&password=${newPassword}`, formdata)
          .then(res => {
            console.log(res)
            if (newUsername != undefined) {
                localStorage.setItem("username", newUsername);
                setUsername(newUsername);
            }
            if (res.data.fileName != null) {
                localStorage.setItem("profilePicName", res.data.fileName);
                setProfilePicName(res.data.fileName)
            }
          })
          .catch(err => console.log(err));
    };

    useEffect(() => {
        setCurrentPage("settings")
    }, [])

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
        <>
            <div className="page">
                <div className="title">
                    <Title2>Settings</Title2>
                </div>
                <div className="settingsColumn">
                    <Subtitle1>Edit Profile</Subtitle1> <br /><br />
                    <Label htmlFor="profilePic" size="large">Profile Picture</Label> <br/>
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
                    /> <br/><br/>
                    {previews &&
                        previews.map((pic, index) => {
                            return <img className="postImage" key={index} src={pic} alt={`preview-${index}`} />;
                        })}
                        
                    <br/>
                    <Label htmlFor="username" size="large">New Username</Label>
                    <Input id="username"
                        className="input"
                        placeholder="Enter New Username"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)} />
                    <Label htmlFor="oldPassword" size="large">Old Password</Label>
                    <Input id="oldPassword"
                        className="input"
                        type="password"
                        placeholder="Enter Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)} />
                    <Label htmlFor="newPassword" size="large">New Password</Label>
                    <Input id="newPassword"
                        className="input"
                        type="password"
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)} />
                    <Button onClick={handleSubmit} appearance="primary">Save</Button>
                </div>

            </div>
        </>
    );
}