import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Context";
import Logo from "./logo2.png";

import "./Login.css"
import {
    Title1, Body1,
    Input, Label, Image, Subtitle2Stronger,
    Card,
    CardFooter,
    CardHeader,
    CardPreview,
    Button,
    MessageBar,
    MessageBarTitle,
    MessageBarBody,
    MessageBarIntent,
    Link
} from '@fluentui/react-components';
import axios from "axios";

export default function Login() {  
    const {username, setUsername, userId, setUserId, profilePicName, setProfilePicName} = useContext(Context);
    const [usernameTemp, setUsernameTemp] = useState()
    const [password, setPassword] = useState()
    const [isSignUp, setIsSignUp] = useState()
    const [error, setError] = useState();
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        if (isSignUp) {
            axios.get(`http://localhost:8081/getUserByUsername?username=${usernameTemp}`)
            .then(res => {
                if (res.data.length > 0) {
                    setError("Username already exists")
                }
                else {
                    axios.post(`http://localhost:8081/signUp?username=${usernameTemp}&password=${password}`)
                    .then(res => {
                        setError(null);
                        setUsername(usernameTemp)
                        localStorage.setItem("username", usernameTemp)
                        setUserId(res.data.insertId)
                        localStorage.setItem("userId", res.data.insertId)
                        navigate("/projects")
                    })
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
        }
        else {
            axios.get(`http://localhost:8081/getUserByUsername?username=${usernameTemp}`)
            .then(res => {
                console.log(res);
                if (res.data.length == 0) {
                    setError("Username does not exist.")
                }
                else if (res.data[0].password !== password) {
                    setError("Incorrect password.")
                }
                else {
                    setError(null);
                    setUsername(usernameTemp)
                    localStorage.setItem("username", usernameTemp)
                    setUserId(res.data[0].id)
                    localStorage.setItem("userId", res.data[0].id)
                    setProfilePicName(res.data[0].profilePic)
                    localStorage.setItem("profilePicName", res.data[0].profilePic)
                    navigate("/projects")
                }
            })
            .catch(err => console.log(err));
        }
    }

    function startSignUp() {
        setIsSignUp(true)
    }

    function backToLogin() {
        setIsSignUp(false)
    }

    return (
        <>
            <div className="loginContainer">
                <Card className="login">
                    <div className="loginContent">
                        <div className="loginHeader">
                            <Image
                                alt="TeamSync logo"
                                src={Logo}
                                height={200}
                                width={200}
                            />
                            <Title1>TeamSync</Title1><br />
                            <Subtitle2Stronger>{isSignUp ? "Sign Up" : "Login"}</Subtitle2Stronger> <br />
                            {
                                error ? (
                                    <MessageBar intent="error">
                                        <MessageBarBody>
                                            <MessageBarTitle>Error</MessageBarTitle>
                                            {error}
                                        </MessageBarBody>
                                    </MessageBar>
                                ) : ("")
                            }
                        </div>
                        <form onSubmit={login}>
                            <Label htmlFor="username" size="large">
                                Username
                            </Label>
                            <Input id="username"
                                className="input"
                                placeholder="Enter Username"
                                value={usernameTemp}
                                onChange={(e) => setUsernameTemp(e.target.value)}
                                required />

                            <Label htmlFor="password" size="large">
                                Password
                            </Label>
                            <Input id="password"
                                className="input"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />

                            <div className="buttonGroup">
                                <div> {!isSignUp ? (<>
                                    <Body1>Don't have an account? </Body1><Link onClick={startSignUp}>Sign Up</Link>
                                </>
                                ) : (<Link onClick={backToLogin}>Back To Login</Link>)}
                                </div>
                                <Button appearance="primary" type="submit">{isSignUp ? "Sign Up" : "Login"}</Button>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </>
    )
}