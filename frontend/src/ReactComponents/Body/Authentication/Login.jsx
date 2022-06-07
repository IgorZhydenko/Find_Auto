import {useHistory} from "react-router-dom";
import React, { useState } from 'react';
import {Button, Form} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import axios from 'axios';
import jwt_decode from "jwt-decode";


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(false);
    const history = useHistory();
    const { t } = useTranslation();
    //REACT_APP_LOGIN=auth/token/login/
    const handleForm = event => {
        event.preventDefault();
        console.log(username);
        console.log(password);
        axios(
            {
                method: 'post',
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_LOGIN,
                data: {
                    'username': username,
                    'password': password
                }
            }
        )
            .then(res => {
                localStorage.setItem('login_token', res.data.access);
                const decodedToken = jwt_decode(res.data.access);
                props.setUserData({
                    'isAdmin': decodedToken['is_admin'],
                    'userId': decodedToken['user_id'],
                });
                history.push('/');
            })
            .catch(err => {
                console.log(err);
                setStatus(true);
            })
    }

    return (
        <div className='page-body-wrapper'>
            <div className='auth_container'>
                <div className='page_title'>
                    {t("auth.authorization")}
                </div>
                <Form onSubmit={handleForm}>
                    <Form.Group controlId='loginFormUserName'>
                        <Form.Label>
                            {t("auth.username")}
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder={t("auth.username_placeholder")}
                            onChange={event => {
                                setUsername(event.target.value);
                                setStatus(false);
                            }}
                            required />
                    </Form.Group>

                    <Form.Group controlId='loginFormPassword'>
                        <Form.Label>
                            {t("auth.password")}
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder={t("auth.password_placeholder")}
                            onChange={event => {
                                setPassword(event.target.value);
                                setStatus(false);
                            }}
                            required />
                    </Form.Group>
                    <Form.Text className='error-message' id='auth-incorrect'>
                        {
                            status && t("auth.log_in_error")
                        }
                    </Form.Text>
                    <Button type='submit' className='auth-button'>
                        {t("auth.log_in")}
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login;