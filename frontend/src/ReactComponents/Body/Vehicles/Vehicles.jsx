import React, {useEffect, useState} from "react";
import axios from "axios";
import VehicleRow from "./VehicleRow";
import {useTranslation} from "react-i18next";
import { Bar } from 'react-chartjs-2';
import {Form} from "react-bootstrap";

const Vehicle = (props) => {
    const { t } = useTranslation();
    const [vehicles, setVehicles] = useState({});
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (props.userData && firstLoad) {
            getVehicles();
        }
        setFirstLoad(false);
    }, [firstLoad])

    const getVehicles = () => {
        axios(
            {
                method: 'get',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_VEHICLES,
            }
        )
            .then(res => {
                console.log(res.data);
                setVehicles(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
/*
    const getStatistics = (index) => {
        axios(
            {
                method: 'get',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_STATISTICS +
                    `?user=${props.userData['userId']}&time_period=${timePeriods[index]}`,
            }
        )
            .then(res => {
                console.log(res.data);
                setStatistics(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
*/

    const evaluateName = () => {
        switch (props.name) {
            case 'vin_code':
                return t('statistics.pulse');
            case 'brand':
                return t('statistics.systolic_pressure');
            case 'model':
                return t('statistics.diastolic_pressure');
            case 'year':
                return t('statistics.saturation');
            case 'color':
                return t('statistics.steps');
            case 'distinct_feature':
                return t('statistics.calories');
            case 'info':
                return t('statistics.calories');
            default:
                return props.name;
        }
    }

return (
    <div className='page-body-wrapper'>
        <div className='health-indications'>
            {
                Object.entries(vehicles).map(indicator =>
                    indicator[0] != 'microelements'
                        ? <VehicleRow
                            name={indicator[0]}
                            value={indicator[1][1]}
                            verdict={indicator[1][0]}
                            micro={false}
                        />
                        : ''
                )
            }
        </div>
        {
            vehicles['microelements'] && Object.keys(vehicles['microelements']).length > 0 &&
            <div>
                <div id='consumed-microelements'>
                    {t('statistics.consumed_microelements') + ':'}
                </div>
                <div className='health-indications'>
                    {
                        Object.entries(userHealthIndicators['microelements']).map(indicator =>
                            <HealthIndicator
                                name={indicator[0]}
                                value={indicator[1][1]}
                                verdict={indicator[1][0]}
                                micro={true}
                            />
                        )
                    }
                </div>
            </div>
        }

        <div>
            <div id='statistics-title'>{t('statistics.statistics')}</div>
            <div id='time-period-wrapper'>
                <Form.Control
                    id='time-period'
                    as="select"
                    onChange={event => {
                        const index = event.target.selectedIndex - 1;
                        if (index !== -1) {
                            getStatistics(index);
                        }
                    }}
                >
                    <option>--------</option>
                    {
                        timePeriods.map(timePeriod =>
                            <option>{t(`statistics.${timePeriod}`)}</option>
                        )
                    }
                </Form.Control>
            </div>
            <div id='stat-region'>
                {
                    Object.entries(statistics).map(statItem =>

                        <div className='stat-bar-wrapper'>
                            <div className='static-indication-title'>
                                {t(`statistics.${statItem[0]}`)}
                            </div>
                            <div className='stat-bar'>
                                {
                                    statItem[1]['data'].length > 0 ?
                                        <Bar
                                            data={
                                                {
                                                    labels: statItem[1]['labels'].map(item =>
                                                        t("date_format",
                                                            { date:
                                                                    new Date(
                                                                        item.slice(0, 4),
                                                                        item.slice(5, 7),
                                                                        item.slice(8, 10)
                                                                    )
                                                            })
                                                    ),
                                                    datasets: [
                                                        {
                                                            type: statItem[0] === 'calories' ? 'bar' : 'line',
                                                            label: '',
                                                            data: statItem[1]['data'],
                                                            fill: true,
                                                            backgroundColor: getColor(),
                                                        },
                                                    ],
                                                }
                                            } />
                                        : <div>
                                            {t('statistics.no_data')}
                                        </div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
)
}