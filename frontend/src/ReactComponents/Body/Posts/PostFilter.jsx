import {Button, Form, Accordion} from "react-bootstrap";
import {TextField} from "@material-ui/core";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";

const PostFilter = (props) => {
    const [myPosts, setMyPosts] = useState(false);
    const [name, setName] = useState('');
    const [isSearch, setIsSearch] = useState(undefined);
    const [vehicleSeenDate, setVehicleSeenDate] = useState('');
    const [vehicleSeenPlace, setVehicleSeenPlace] = useState('');
    const [vinCode, setVinCode] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [color, setColor] = useState('');


    const { t } = useTranslation();

    const useFilter = async() => {
        props.setFilterData({myPosts, name, isSearch, vehicleSeenDate, vehicleSeenPlace, registrationNumber, vinCode, brand, model, year, color})
    }

    return (
        <Accordion className={"page-accordion-container"}>
            <Accordion.Item className={"page-accordion"}>
                <Accordion.Header>{t('filter')}</Accordion.Header>
                <Accordion.Body>
                    <div className={"page-filter"}>
                        <input
                            type="checkbox"
                            id="my_posts"
                            name="my_posts"
                            value={myPosts}
                            onChange={(e) => setMyPosts((myPosts) => !myPosts)}
                        />
                        <label htmlFor="my_posts">{t('post.my_posts')}</label>
                    </div>

                    <div className={"page-filter"}>
                        <TextField
                            id="filter_name"
                            key={"filter-name"}
                            label={t('post.name')}
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <Form>
                        {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3 filter-check">
                                <Form.Check
                                    inline
                                    label={t('post.status_search')}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-1`}
                                    checked={isSearch==true}
                                    onChange={(e) => setIsSearch((postStatus) => !postStatus)}
                                />
                                <Form.Check
                                    inline
                                    label={t('post.status_found')}
                                    name="group1"
                                    type={type}
                                    id={`inline-${type}-2`}
                                    checked={isSearch==false}
                                    onChange={(e) => setIsSearch((postStatus) => !postStatus)}
                                />
                            </div>
                        ))}
                    </Form>

                    <Form.Group className="mb-3 page-filter" controlId="duedate">
                        <Form.Label>{t('post.vehicle_seen_date')}</Form.Label>
                        <Form.Control
                            max={new Date().toISOString().slice(0, 10)}
                            type="date"
                            placeholder={t('post.enter_vehicle_seen_date')}
                            value={vehicleSeenDate}
                            onChange={(e) => setVehicleSeenDate(e.target.value)}
                        />
                    </Form.Group>

                    <div className={"page-filter"}>
                        <TextField
                            id="filter_seen_place"
                            label={t('post.vehicle_seen_place')}
                            variant="outlined"
                            value={vehicleSeenPlace}
                            onChange={(e) => setVehicleSeenPlace(e.target.value)}
                        />
                    </div>

                    <div className={"page-filter"}>
                        <TextField
                            id="filter_number"
                            label={t('post.registration_number')}
                            variant="outlined"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                        />
                    </div>

                    <div className={"page-filter"}>
                        <TextField
                            id="filter_vin"
                            label={t('post.vin_code')}
                            variant="outlined"
                            value={vinCode}
                            onChange={(e) => setVinCode(e.target.value)}
                        />
                    </div>

                    <div className={"page-filter"}>
                        <TextField id="filter_brand"
                                   label={t('post.brand')}
                                   variant="outlined"
                                   value={brand}
                                   onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    <div className={"page-filter"}>
                        <TextField id="filter_model"
                                   label={t('post.model')}
                                   variant="outlined"
                                   value={model}
                                   onChange={(e) => setModel(e.target.value)}
                        />
                    </div>

                    <Form.Group className="mb-3 page-filter" controlId="duedate">
                        <Form.Label>{t('post.year')}</Form.Label>
                        <Form.Control
                            max={new Date().toISOString().slice(0, 10)}
                            type="date"
                            placeholder={t('post.enter_year')}
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Label htmlFor="exampleColorInput">{t('post.color')}</Form.Label>
                    <Form.Control
                        type="color"
                        id="exampleColorInput"
                        title={t('post.enter_color')}
                        className={"filter-color"}
                        value={color}
                        onChange={(e) => {setColor(e.target.value)
                        }}
                    />

                    <div>
                        <Button
                            className={"page-button"}
                            variant="primary"
                            onClick={useFilter}>
                            {t('accept-filter')}
                        </Button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>

            <Button className={"page-button"} variant="primary" onClick={props.handleShowCreatePostModal}>
                {t('create-post')}
            </Button>
        </Accordion>
    )
};

export default PostFilter;