import {FormControl, Form} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import delBtn from '../../../images/del.png';
import acceptBtn from '../../../images/check-png.png';
import axios from "axios";

const UserRow = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setUserName(props.user.username);
        setPassword(props.user.password);
    }, [props.user.id, props.currentTableName])

    const updateUserTable = () => {
        let updatedRow = {
            'username': userName,
            'password': password,
            'is_admin': isAdmin
        };

        axios(
            {
                method: 'patch',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                data: updatedRow,
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_USERS + `${props.user.id}/`
            }
        )
            .then(_ => {
                let newData = props.tableData.slice();
                newData[props.index] = {
                    ...newData[props.index],
                    ...updatedRow
                };
                props.setTableData(newData);
            })
    }

    const deleteUser = () => {
        axios(
            {
                method: 'delete',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_USERS + `${props.user.id}/`
            }
        )
            .then(_ => {
                let newData = props.tableData.slice();
                newData.splice(props.index, 1);
                props.setTableData(newData);
            })
    }

    useEffect(() => {
        setUserName(props.user.username);
        setPassword(props.user.password);
        setIsAdmin(props.user.is_admin);
    }, [props.user.id, props.currentTableName])

    return(
        <tr>
            <td>{props.user.id}</td>
            <td>
                <FormControl
                    value={userName}
                    onChange={(event) => {
                        setUserName(event.target.value);
                    }}
                />
            </td>
            <td>
                <FormControl
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </td>
            <td>
                <Form.Check type="checkbox"
                            checked={isAdmin}
                            onChange={_ => setIsAdmin(!isAdmin)}
                />
            </td>
            <td>
                <img
                    className='ration-product-btn'
                    src={userName === props.user.username && password === props.user.password
                    && props.user.is_admin === isAdmin ? delBtn : acceptBtn}
                    onClick={_ => {
                        if (userName === props.user.username && password === props.user.password
                            && props.user.is_admin === isAdmin) {
                            deleteUser();
                        } else {
                            updateUserTable();
                        }
                    }}
                />
            </td>
        </tr>
    )
}

export default UserRow;