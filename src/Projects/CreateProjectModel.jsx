import React, { useState } from 'react';
import "./Projects.css";
import "../Modal.css";
import { Button, Textarea, Title2, Input, Label, Dropdown, Option } from '@fluentui/react-components';

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

export default function CreateProjectModel({ onCreate, onClose }) {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTeam, setSelectedTeam] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ id: Date.now(), name: projectName, description: description, team: selectedTeam });
    };

    return (
        <div className="modal">
            <div className="modal-content">
            <div className="title">
                <Title2>Create a New Project</Title2>
            </div>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Label htmlFor="projectName" size="large">
                    Name
                </Label>
                <Input id="projectName"
                    className="input"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required />
                <Label htmlFor="team" size="large">
                    Team
                </Label>
                <Dropdown
                    aria-labelledby="team"
                    placeholder="Select a team"
                    className="input"
                    onOptionSelect={(e, data) => setSelectedTeam(data.optionValue)}>
                    {options.map((option) => (
                        <Option key={option} >
                            {option}
                        </Option>
                    ))}
                </Dropdown>
                <Label htmlFor="projectDescription" size="large">
                    Description
                </Label>
                <Textarea
                    className="input"
                    placeholder="Describe the project"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <div className="buttonGroup">
                    <Button onClick={onClose}>Close</Button>
                    <Button appearance="primary" type="submit">Create</Button>
                </div>
            </form>
            </div>
        </div>
    );
}
