import React from "react";
import { useState, useContext, useEffect } from "react";
import {
    Image,
    Avatar
} from "@fluentui/react-components";
import axios from "axios";

export default function PostAvatar(props) {
    const images = require.context('../../server/public/images', true);
    const [profilePic, setProfilePic] = useState();

    useEffect(() => {
        axios.get(`http://localhost:8081/getUserByUsername?username=${props.username}`)
        .then(res => { 
            try {
                setProfilePic(images(`./${res.data[0].profilePic}`))
            }
            catch (error) {
                setProfilePic(false)
            }
         })
        .catch(err => console.log(err));
    }, [])

    return (
        <>
        {
            profilePic ? (
                <Avatar name={props.username} size={20} image={{src: profilePic}}/>
            ) :
            (
                <Avatar name={props.username} size={20}/>
            )
        }
        </>
    )
}