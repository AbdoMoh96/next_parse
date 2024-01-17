'use client'
import React, { useState } from 'react';
import { Button, Divider, Input } from 'antd';
import ParseProvider from "@/Providers/ParseProvider/ParseProvider";
import { useRouter } from 'next/navigation';
import Parse from 'parse';

interface propTypes {}

const LoginPage: React.FC<propTypes> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState< Parse.User<Parse.Attributes> | undefined>(undefined);
    const router = useRouter();

    const doUserLogIn = async function () {
        const usernameValue = username;
        const passwordValue = password;
        try {
            const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
            router.push('/todos/create');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ParseProvider>
        <div className="container">

            <div className='form_container'>
                <h2 className="heading">{'User Login'}</h2>
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
                        style={{
                            width: "100%"
                        }}
                        className="form_button"
                        color={'#208AEC'}
                        size="large"
                    >
                        Login
                    </Button>

                    <Button
                        onClick={() => router.push('/signup')}
                        type="primary"
                        style={{
                            marginTop: "1rem",
                            width: "100%"
                        }}
                        className="form_button"
                        color={'#208AEC'}
                        size="large"
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
        </ParseProvider>
    );
};

export default LoginPage;