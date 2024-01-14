'use client'
import React, { useState, FC, ReactElement } from 'react';
import { Button, Divider, Input } from 'antd';
import './App.css';
import ParseProvider from "@/Providers/parse.provider";

interface propTypes {}

const LoginPage: React.FC<propTypes> = () => {
    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const Parse = ParseProvider();

    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        setCurrentUser(currentUser);
        return currentUser;
    };

    const doUserLogIn = async function () {
        // Note that these values come from state variables that we've declared before
        const usernameValue = username;
        const passwordValue = password;
        try {
            const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
            // logIn returns the corresponding ParseUser object
            alert(
                `Success! User ${loggedInUser.get(
                    'username'
                )} has successfully signed in!`
            );
            // To verify that this is in fact the current user, `current` can be used
            const currentUser = await Parse.User.current();
            console.log(loggedInUser === currentUser);
            // Clear input fields
            setUsername('');
            setPassword('');
            // Update state variable holding current user
            getCurrentUser();
            return true;
        } catch (error) {
            // Error can be caused by wrong parameters or lack of Internet connection
            alert(`Error! ${error}`);
            return false;
        }
    };

    return (
        <div>
            <div className="header">
                <img
                    className="header_logo"
                    alt="Back4App Logo"
                    src={
                        'https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png'
                    }
                />
                <p className="header_text_bold">{'React on Back4App'}</p>
                <p className="header_text">{'User Registration'}</p>
            </div>
            <div className='container'>
                <h2 className="heading">{'User Registration'}</h2>
                <Divider />
                <div className="form_wrapper">
                    <Input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username"
                        size="large"
                        className="form_input"
                    />
                    <Input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Password"
                        size="large"
                        type="password"
                        className="form_input"
                    />
                </div>
                <div className="form_buttons">
                    <Button
                        onClick={() => doUserLogIn()}
                        type="primary"
                        className="form_button"
                        color={'#208AEC'}
                        size="large"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;