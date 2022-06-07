import {FormControl, Form} from "react-bootstrap";
import React, {useEffect, useState} from 'react';
import delBtn from '../../../images/del.png';
import acceptBtn from '../../../images/check-png.png';
import axios from "axios";

const VehicleRow = (props) => {
    const [name, setName] = useState('');
    const [vin_code, setVin_code] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');
    const [distinct_feature, setDistinct_feature] = useState('');
    const [info, setInfo] = useState('');

    useEffect(() => {
        setName(props.product.name);
        setVin_code(props.product.vin_code);
        setBrand(props.product.brand);
        setModel(props.product.model);
        setYear(props.product.year);
        setColor(props.product.color);
        setDistinct_feature(props.product.distinct_feature);
        setInfo(props.product.info);
    }, [props.product.id, props.currentTableName])

    const deleteVehicle = () => {
        axios(
            {
                method: 'delete',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_VEHICLE + `${props.product.id}/`
            }
        )
            .then(_ => {
                let newData = props.tableData.slice();
                newData.splice(props.index, 1);
                props.setTableData(newData);
            })
    }

    const updateVehicle = () => {
        let updatedRow = {
            'name': name,
            'vin_code' : vin_code,
            'brand' : brand,
            'model' : model,
            'year' : year,
            'color' : color,
            'distinct_feature' : distinct_feature,
            'info': info
        };

        axios(
            {
                method: 'patch',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                data: updatedRow,
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_VEHICLE + `${props.product.id}/`
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

    return (
        <tr>
            <td>{props.product.id}</td>
            <td>
                <FormControl
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                />
            </td>
            <td>
                <FormControl
                    value={vin_code}
                    onChange={(event) => {
                        setVin_code(event.target.value);
                    }}
                />
            </td>
            <td>
                <FormControl
                    value={brand}
                    onChange={(event) => {
                        setBrand(event.target.value);
                    }}
                />
            </td>
            <td>
                <FormControl
                    value={model}
                    onChange={(event) => {
                        setModel(event.target.value);
                    }}
                />
            </td>
            <td>
                <FormControl
                    value={year}
                    onChange={(event) => {
                        setYear(event.target.value);
                    }}
                />
            </td>
            <td>
                <FormControl
                    value={color}
                    onChange={(event) => {
                        setColor(event.target.value);
                    }}
                />
            </td>
            <td>
                <FormControl
                    value={distinct_feature}
                    onChange={(event) => {
                        setDistinct_feature(event.target.value);
                    }}
                />
            </td>
            <td>
                <FormControl
                    value={info}
                    onChange={(event) => {
                        setInfo(event.target.value);
                    }}
                />
            </td>
        </tr>
    )
}

export default VehicleRow;