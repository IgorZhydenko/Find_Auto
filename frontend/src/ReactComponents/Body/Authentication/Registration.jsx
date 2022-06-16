import {Button, Form, Modal} from "react-bootstrap";
import React, { useState } from 'react';
import axios from 'axios';
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";


const Registration = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    const [error, setError] = useState(false);
    const history = useHistory();
    const { t } = useTranslation();

    const handleForm = event => {
        event.preventDefault();
        if (password !== repassword) {
            setError(true);
            return;
        }

        axios(
            {
                method: 'post',
                url: process.env.REACT_APP_LINK + process.env.REACT_APP_REGISTER,
                data: {
                    'username': username,
                    'password': password,
                    're_password': repassword
                }
            }
        )
            .then(res => {
                history.push('/login');
            })
            .catch(error => {
                setError(true);
            });
    }

    return (
        <div className='auth_container'>
            <div className='page_title'>
                {t("auth.registration")}
            </div>
            <Form onSubmit={handleForm}>
                <Form.Group controlId='registerFormUserName'>
                    <Form.Label>{t("auth.username")}</Form.Label>
                    <Form.Control type='text'
                                  placeholder={t("auth.username_placeholder")}
                                  onChange={event => {
                                      setUsername(event.target.value);
                                      setError(false);
                                  }}
                                  required />
                </Form.Group>

                <Form.Group controlId='registerFormPassword'>
                    <Form.Label className='auth-labels'>{t("auth.password")}</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder={t("auth.password_placeholder")}
                        onChange={event => {
                            setPassword(event.target.value);
                            setError(false);
                        }}
                        className='auth-control'
                        required />
                    <Form.Control
                        id='re_entering_password'
                        type='password'
                        placeholder={t("auth.re_password")}
                        onChange={event => {
                            setRePassword(event.target.value);
                            setError(false);
                        }}
                        required />
                </Form.Group>

                <Form.Text className='error-message'>
                    {error && t("auth.sign_up_error")}
                </Form.Text>

                <Button variant='dark' type='submit' className='auth-button'>
                    {t("auth.sign_up")}
                </Button>
            </Form>
        </div>
    )
}

export default Registration;