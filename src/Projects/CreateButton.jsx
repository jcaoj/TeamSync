import React from "react";
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    Button
} from '@fluentui/react-components';
import { AddSquare16Regular } from "@fluentui/react-icons";
import "./Projects.css";

export default function CreateButton(props) {
    return (
        <>
            <div className="createButton">
                <Menu>
                    <MenuTrigger disableButtonEnhancement>
                        <Button icon={<AddSquare16Regular />} appearance="primary">Create</Button>
                    </MenuTrigger>
                    <MenuPopover>
                        <MenuList>
                            <MenuItem onClick={() => props.setIsProjectModalOpen(true)}>Project</MenuItem>
                            <MenuItem onClick={() => props.setIsPostModalOpen(true)}>Post</MenuItem>
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </div>
        </>
    )
}
