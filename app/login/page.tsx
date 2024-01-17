'use client'
import React, { useState, useEffect} from 'react';
import { Button, Divider, Input } from 'antd';
import './App.css';
import Parse from 'parse';
import { initializeParse } from  '@parse/react';
import parseConfig from "@/config/parse";

interface propTypes {}

const LoginPage: React.FC<propTypes> = () => {
    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState< Parse.User<Parse.Attributes> | undefined>(undefined);

    useEffect(() => {
        initializeParse(
            parseConfig.serverUrl,
            parseConfig.applicationId,
            parseConfig.javascriptKey
        );
    }, []);

    const getCurrentUser = async function () {
        const currentUser = await Parse.User.current();
        setCurrentUser(currentUser);
        return currentUser;
    };

    const doUserLogIn = async function () {
        const usernameValue = username;
        const passwordValue = password;
        try {
            const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
            alert(
                `Success! User ${loggedInUser.get(
                    'username'
                )} has successfully signed in!`
            );
            const currentUser = await Parse.User.current();
            console.log(loggedInUser === currentUser);
            setUsername('');
            setPassword('');
            getCurrentUser();
            return true;
        } catch (error) {
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