'use client'
import React, { useState } from 'react';
import { Button, Divider, Input } from 'antd';
import Parse from 'parse';
import ParseProvider from "@/Providers/ParseProvider/ParseProvider";

interface propTypes {}

const SignUpPage: React.FC<propTypes> = () => {
    // State variables
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const doUserRegistration = async function (): Promise<boolean> {
        // Note that these values come from state variables that we've declared before
        const usernameValue: string = username;
        const passwordValue: string = password;
        try {
            const createdUser = await Parse.User.signUp(usernameValue, passwordValue, {});
            alert(
                `Success! User ${createdUser.getUsername()} was successfully created!`,
            );
            return true;
        } catch (error: any) {
            alert(`Error! ${error}`);
            return false;
        };
    };

    return (
        <ParseProvider>
        <div className="container">
            <div className='form_container'>
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
                        onClick={() => doUserRegistration()}
                        type="primary"
                        className="form_button"
                        color={'#208AEC'}
                        style={{
                            width: "100%"
                        }}
                        size="large"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
        </ParseProvider>
    );
};

export default SignUpPage;