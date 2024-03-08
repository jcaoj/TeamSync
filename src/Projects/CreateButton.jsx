import React from "react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
} from '@fluentui/react-components';
import { AddSquare16Regular } from "@fluentui/react-icons";
import "./Projects.css";

export default function CreateButton(props) {
    return (
        <>
            <div className="createButton">
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <MenuButton menuIcon={<AddSquare16Regular />} appearance="primary">Create</MenuButton>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem onClick={() => props.setIsProjectModalOpen(true)}>Project</MenuItem>
                            <MenuItem onClick={() => props.setIsPostModalOpen(true)}>Update</MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </div>
        </>
    )
}
