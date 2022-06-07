import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Form, FormControl, Table, Button, Modal} from "react-bootstrap";
import axios from "axios";
import UserRow from "./UserRow";
import Restore from "../../Auxiliary/Restore";
import Backup from "../../Auxiliary/Backup";
import UpdateCertificate from "../../Auxiliary/UpdateCertificate";

const Administration = () => {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationIndex, setNotificationIndex] = useState(0);
    const [chosenTableIndex, setChosenTableIndex] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [currentTableName, setCurrentTableName] = useState('location');

    const { t } = useTranslation();

    const notifications = [
        t('admin.update_certificate_message'),
        t('admin.restore_db_message'),
        t('admin.create_backup_message'),
    ];

    useEffect(() => {
        getUsers();
        setFirstLoad(false);
    }, [firstLoad])

    useEffect(() => {
        switch (chosenTableIndex) {
            case 0:
                getUsers();
                break;
        }
    }, [chosenTableIndex]);

    const getUsers = () => {
        getTableData(process.env.REACT_APP_LINK +
            process.env.REACT_APP_USERS, 'user')
            .then(_ => {
            });
    }

    const postDataToTable = (requestURL, data) => {
        axios(
            {
                method: 'post',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                data: data,
                url: requestURL
            }
        )
            .then(res => {
                setChosenTableIndex(-1);
                setChosenTableIndex(chosenTableIndex);
            })
            .catch(err => console.log(err))
    }

    const getTableData = (requestURL, tableName) => {
        return axios(
            {
                method: 'get',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                url: requestURL
            }
        )
            .then(res => {
                setTableData(res.data);
                setCurrentTableName(tableName);
            })
    }

    const closeNotification = () => {
        setShowNotification(false)
    }

    const makeBackup = () => {
        axios(
            {
                method: 'post',
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_BACKUP,
            }
        )
            .then(_ => {
                setNotificationIndex(2);
                setShowNotification(true);
            })
    }

    const restoreDatabase = () => {
        axios(
            {
                method: 'post',
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_RESTORE_DB,
            }
        )
            .then(_ => {
                setNotificationIndex(1);
                setShowNotification(true);
            })
    }

    const updateCertificate = () => {
        const command = 'mkcert -cert-file cert.pem -key-file key.pem 0.0.0.0 localhost 127.0.0.1 ::1';
        setNotificationIndex(0);
        setShowNotification(true);
    }

    const getUserTableMarkup = () => {
        return(
            <div className='table-div'>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{t('admin.username')}</th>
                        <th>{t('admin.password')}</th>
                        <th>{t('admin.is_admin')}</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tableData.map((user, index) =>
                            <UserRow
                                user={user}
                                tableData={tableData}
                                currentTableName={currentTableName}
                                setTableData={setTableData}
                                index={index}
                            />
                        )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }

    return (
        <div className='page-body-wrapper'>
            <div onClick={_ => restoreDatabase()}>
                <Restore />
            </div>
            <div onClick={_ => makeBackup()}>
                <Backup />
            </div>
            <div onClick={_ => updateCertificate()}>
                <UpdateCertificate />
            </div>
            <div id='table-name-wrapper'>
                <div className='admin-subheader'>
                    {t('admin.choose_table')}
                </div>
                <Form.Control
                    id='table-name-input'
                    as="select"
                    onChange={event => {
                        setChosenTableIndex(event.target.selectedIndex);
                    }}
                >
                    <option>{t('admin.users')}</option>
                </Form.Control>
            </div>
            <div>
                {chosenTableIndex === 0 && getUserTableMarkup()}
            </div>
            <div id='new-entity-div'>
                <div className='admin-subheader'>
                    {t('admin.add_new_entity')}
                </div>
                <div className='new-entity-wrapper'>
                    {chosenTableIndex === 0 &&
                    <div>
                        <div className='new-entity-field'>
                            <div>{t('admin.username')}</div>
                            <FormControl
                                className='new-entity-input'
                                id='new-user-username'
                            />
                        </div>
                        <div className='new-entity-field'>
                            <div>{t('admin.password')}</div>
                            <FormControl
                                className='new-entity-input'
                                id='new-user-password'
                            />
                        </div>
                        <Button className='auth-button last-btn' onClick={() => {
                            postDataToTable(
                                process.env.REACT_APP_LINK +
                                process.env.REACT_APP_REGISTER,
                                {
                                    'username': document.getElementById('new-user-username').value,
                                    'password': document.getElementById('new-user-password').value,
                                    're_password': document.getElementById('new-user-password').value,
                                }
                            );
                        }}>
                            {t('admin.add')}
                        </Button>
                    </div>
                    }
                </div>
            </div>
            <Modal show={showNotification} onHide={closeNotification}>
                <Modal.Header closeButton>
                    <Modal.Title>{notifications[notificationIndex]}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeNotification}>
                        {t('admin.ok')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Administration;