import React, { useContext, useState, useEffect } from 'react';
import {
  Button, Textarea, Title2, Label, Input, Checkbox, Dropdown, Option,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
} from '@fluentui/react-components';
import '../Modal.css';
import { Context } from '../Context';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
export default function CreateTeamModal({ onCreate, onClose, onEdit = null, editTeam = null, editUsers = null }) {
  const navigate = useNavigate();

  const { users, setUsers, userId, username } = useContext(Context);
  const [isEditTeam, setIsEditTeam] = useState(false);
  const [editUsersObject, setEditUsersObject] = useState(editUsers != null ? editUsers : [{id: "X", username: ""}]);
  const { id } = useParams();
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(new Set(userId.toString())); //automatically include logged-in user in the team
  const [originalUserList, setOriginalUserList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getUsers')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.id.toString() !== userId.toString()); //filter out logged-in user from list
        setUsers(filteredUsers);
      })
      .catch(error => {
        console.error('Failed to fetch users:', error);
      });
  }, [setUsers, userId]);

  useEffect(() => {
    if (editTeam != null) {
      console.log(editUsersObject)
      setIsEditTeam(true)
      setTeamName(editTeam.name)
      setDescription(editTeam.description)
      var usersArray = editUsers.map(user => user.id)
      setSelectedUsers(usersArray)
      setOriginalUserList(usersArray)
    }
  }, [])

  const handleUserSelectionChange = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const userIdsArray = Array.from(selectedUsers).map(id => parseInt(id, 10));
    userIdsArray.push(userId);

    if (isEditTeam) {
      var addedUserIds = [];
      var removedUserIds = [];
      for (var i = 0; i < userIdsArray.length; i++) {
        if (!originalUserList.includes(userIdsArray[i])) {
          addedUserIds.push(userIdsArray[i])
        }
      }

      for (var i = 0; i < originalUserList.length; i++) {
        if (!userIdsArray.includes(originalUserList[i])) {
          removedUserIds.push(originalUserList[i])
        }
      }

      onEdit({ id, name: teamName, description, username, addedUserIds, removedUserIds });
    }
    else {
      userIdsArray.shift();
      onCreate({ name: teamName, description, username, userIds: userIdsArray });
    }
  };

  function deleteTeam() {
    axios.post(`http://localhost:8081/deleteTeam?teamId=${editTeam.id}`)
      .then(res => {
        navigate("/teams")
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title">
          <Title2>{isEditTeam ? "Edit " + teamName : "Create a New Team"}</Title2>
        </div>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Label htmlFor="teamName" size="large">
            Team Name
          </Label>
          <Input
            id="teamName"
            className="input"
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <Label htmlFor="description" size="large">
            Description
          </Label>
          <Textarea
            id="description"
            className="input"
            placeholder="Describe the team"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          /><br /><br />
          <Label htmlFor="selectMembers" size="large">Select Members</Label>
          <Dropdown
             aria-labelledby="membersEdit"
             multiselect={true}
             className='input'
             placeholder="Select members"
             defaultValue={editUsersObject.map(user => user.username).filter(un => un != username).join(", ")}
             defaultSelectedOptions={editUsersObject.map(user => user.id)}
             onOptionSelect={(e, data) => handleUserSelectionChange(data.selectedOptions)}
           >
             {users.map((option) => (
               <Option key={option.id} value={option.id}>
                 {option.username}
               </Option>
             ))}
           </Dropdown>
          {/* {isEditTeam ? (
           
          ) :
            (
              <Dropdown
                aria-labelledby="members"
                multiselect={true}
                className='input'
                placeholder="Select members"
                onOptionSelect={(e, data) => handleUserSelectionChange(data.selectedOptions)}
              >
                {users.map((option) => (
                  <Option key={option.id} value={option.id}>
                    {option.username}
                  </Option>
                ))}
              </Dropdown>
            )} */}

          <div className="buttonGroup">
            <div>
              <Button onClick={onClose}>Close</Button>
              {isEditTeam ? (
                <Dialog modalType="alert">
                  <DialogTrigger disableButtonEnhancement>
                    <div className="deleteButton">
                      <Button className="deleteButton">Delete</Button>
                    </div>
                  </DialogTrigger>
                  <DialogSurface>
                    <DialogBody>
                      <DialogTitle>Delete {teamName}?</DialogTitle>
                      <DialogContent>
                        This will permanently delete the team. This action is irreversible.
                      </DialogContent>
                      <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                          <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button onClick={deleteTeam} appearance="primary">Delete</Button>
                      </DialogActions>
                    </DialogBody>
                  </DialogSurface>
                </Dialog>
              ) :
                (<></>)}
            </div>
            <Button appearance="primary" type="submit">{isEditTeam ? "Edit" : "Create"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
