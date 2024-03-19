import React, { useContext, useState, useEffect } from 'react';
import { Button, Textarea, Title2, Label, Input, Checkbox, Dropdown, Option } from '@fluentui/react-components';
import '../Modal.css';
import { Context } from '../Context';
import axios from 'axios';
export default function CreateTeamModal({ onCreate, onClose }) {

  const { users, setUsers, userId, username } = useContext(Context);
  const [teamName, setTeamName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState(new Set(userId.toString())); //automatically include logged-in user in the team

  useEffect(() => {
    axios.get('http://localhost:8081/getUsers')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.id.toString() !== userId.toString()); //filter out logged-in user from list
        setUsers(filteredUsers);
        console.log('Filtered Users:', filteredUsers);
      })
      .catch(error => {
        console.error('Failed to fetch users:', error);
      });
  }, [setUsers, userId]);

  const handleUserSelectionChange = (userId, checked) => {
    setSelectedUsers(prevSelectedUsers => {
      const newSelectedUsers = new Set(prevSelectedUsers);
      const userIdStr = userId.toString();
      if (checked) {
        newSelectedUsers.add(userIdStr);
      } else {
        newSelectedUsers.delete(userIdStr);
      }
      console.log(newSelectedUsers)
      return newSelectedUsers;
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const userIdsArray = Array.from(selectedUsers).map(id => parseInt(id, 10));
    onCreate({ id: Date.now(), name: teamName, description, username, userIds: userIdsArray });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="title">
          <Title2>Create a New Team</Title2>
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
            aria-labelledby="members"
            multiselect={true}
            className='input'
            placeholder="Select members"
            onOptionSelect={(e, data) => handleUserSelectionChange(data.optionValue, true)}
          >
            {users.map((option) => (
              <Option key={option.id} value={option.id}>
                {option.username}
              </Option>
            ))}
          </Dropdown>
          {/* <div className="scrollable-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {users.map(user => (
              <Checkbox
                key={user.id}
                label={user.username}
                checked={selectedUsers.has(user.id.toString())}
                onChange={(e, data) => handleUserSelectionChange(user.id, data.checked)}
              />
            ))}
          </div> */}
          <div className="buttonGroup">
            <Button onClick={onClose}>Close</Button>
            <Button appearance="primary" type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
