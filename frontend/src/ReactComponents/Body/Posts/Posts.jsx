import React, { useState } from "react";
import {Accordion, Button, Container, Form} from "react-bootstrap";
import {useEffect,  useTranslation } from "react-i18next";
import PostCard from "./PostCard";
import PostCreateForm from "./PostCreateForm";
import {TextField} from "@material-ui/core";
import {colors} from "../../../colors/colors";

const Posts = (props) => {
    const [name, setName] = useState('');
    const [isSearch, setIsSearch] = useState(true);
    const [vehicleSeenDate, setVehicleSeenDate] = useState('');
    const [vehicleSeenPlace, setVehicleSeenPlace] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [vinCode, setVinCode] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState(new Date());
    const [color, setColor] = useState('');

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const handleShowCreatePostModal = () => setShowCreatePostModal(true);
    const handleCloseCreatePostModal = () => setShowCreatePostModal(false);

    const { t } = useTranslation();

    const useFilter = () =>{
        //TODO filter
    }

    return (
        <Container className="page-body-wrapper">

            <Accordion  defaultActiveKey="0" className={"page-accordion-container"}>
                <Accordion.Item className={"page-accordion"}>
                    <Accordion.Header>{t('filter')}</Accordion.Header>
                    <Accordion.Body>
                        <div className={"page-filter"}>
                            <input  type="checkbox" id="my_posts" name="my_posts"/>
                                <label htmlFor="my_posts">My posts</label>
                        </div>

                        <div className={"page-filter"}>
                            <TextField
                                id="filter_name"
                                label={t('post.name')}
                                variant="outlined"
                                //onChange={(e) => setName(e.target.value)}
                                value={props.filterData.name}
                                onChange={(e) => {
                                    props.setFilterData(() => ({...props.filterData, name: e.target.value}))
                                }}
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
                                        checked={props.filterData.isSearch}
                                        // onChange={(e) => setIsSearch( true)}
                                        onChange={(e) => {
                                            props.setFilterData(() => ({...props.filterData, isSearch: true}))
                                        }}
                                    />
                                    <Form.Check
                                        inline
                                        label={t('post.status_found')}
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        checked={!props.filterData.isSearch}
                                        //onChange={(e) => setIsSearch(false)}
                                        onChange={(e) => {
                                            props.setFilterData(() => ({...props.filterData, isSearch: false}))
                                        }}
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
                                value={props.filterData.vehicleSeenDate}
                                //onChange={(e) => setVehicleSeenDate(e.target.value)}
                                onChange={(e) => {
                                    props.setFilterData(() => ({...props.filterData, vehicleSeenDate: e.target.value}))
                                }}
                            />
                        </Form.Group>

                        <div className={"page-filter"}>
                            <TextField
                                id="filter_seen_place"
                                label={t('post.vehicle_seen_place')}
                                variant="outlined"
                                //onChange={(e) => setVehicleSeenPlace(e.target.value)}
                                value={props.filterData.vehicleSeenPlace}
                                onChange={(e) => {
                                    props.setFilterData(() => ({...props.filterData, vehicleSeenPlace: e.target.value}))
                                }}
                            />
                        </div>

                        <div className={"page-filter"}>
                            <TextField
                                id="filter_number"
                                label={t('post.registration_number')}
                                variant="outlined"
                                //onChange={(e) => setRegistrationNumber(e.target.value)}
                                value={props.filterData.registrationNumber}
                                onChange={(e) => {
                                    props.setFilterData(() => ({...props.filterData, registrationNumber: e.target.value}))
                                }}
                            />
                        </div>

                        <div className={"page-filter"}>
                            <TextField
                                id="filter_vin"
                                label={t('post.vin_code')}
                                variant="outlined"
                                value={props.filterData.vinCode}
                                //onChange={(e) => setVehicleSeenDate(e.target.value)}
                                onChange={(e) => {
                                    props.setFilterData(() => ({...props.filterData, vinCode: e.target.value}))
                                }}
                            />
                        </div>

                        <div className={"page-filter"}>
                            <TextField id="filter_brand"
                                       label={t('post.brand')}
                                       variant="outlined"
                                       //onChange={(e) => setBrand(e.target.value)}
                                       value={props.filterData.brand}
                                       onChange={(e) => {
                                           props.setFilterData(() => ({...props.filterData, brand: e.target.value}))
                                       }}
                            />
                        </div>

                        <div className={"page-filter"}>
                            <TextField id="filter_model"
                                       label={t('post.model')}
                                       variant="outlined"
                                       //onChange={(e) => setModel(e.target.value)}
                                       value={props.filterData.model}
                                       onChange={(e) => {
                                           props.setFilterData(() => ({...props.filterData, model: e.target.value}))
                                       }}
                            />
                        </div>

                        <Form.Group className="mb-3 page-filter" controlId="duedate">
                            <Form.Label>{t('post.year')}</Form.Label>
                            <Form.Control
                                max={new Date().toISOString().slice(0, 10)}
                                type="date"
                                placeholder={t('post.enter_year')}
                                //value={vehicleSeenDate}
                                //onChange={(e) => setYear(e.target.value)}
                                value={props.filterData.year}
                                onChange={(e) => {
                                    props.setFilterData(() => ({...props.filterData, year: e.target.value}))
                                }}
                            />
                        </Form.Group>

                        <Form.Label htmlFor="exampleColorInput">{t('post.color')}</Form.Label>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            title={t('post.enter_color')}
                            className={"filter-color"}
                            //value={color}
                            //onChange={(e) => {setColor(e.target.value)}}
                            value={props.filterData.color}
                            onChange={(e) => {
                                props.setFilterData(() => ({...props.filterData, color: e.target.value}))
                            }}
                        />

                        {/*<Form.Select aria-label="Color">*/}
                        {/*    {colors.map((color) => {*/}
                        {/*        return <option value={color}><Container  style={{background:color}} className="post-card-body-color"/>{color}</option>*/}
                        {/*    })}*/}
                        {/*</Form.Select>*/}

                        {/*<div>*/}
                        {/*    <Button*/}
                        {/*        className={"page-button"}*/}
                        {/*        variant="primary"*/}
                        {/*        onClick={useFilter}>*/}
                        {/*        {t('accept-filter')}*/}

                        {/*    </Button>*/}
                        {/*</div>*/}
                    </Accordion.Body>
                </Accordion.Item>

                <Button className={"page-button"} variant="primary" onClick={handleShowCreatePostModal}>
                    {t('create-post')}
                </Button>
            </Accordion>

            <PostCreateForm
                show={showCreatePostModal}
                userData={props.userData}
                handleClose={handleCloseCreatePostModal}
                updateAllPosts={props.updateAllPosts}
            />

            <Container className="post-choosing-group d-grid gap-3">
                {props.posts.map((post) => {
                    console.log(post);
                    return (
                        <PostCard
                            key={post.id}
                            postData={post}
                            updateAllPosts={props.updateAllPosts}
                        />
                    );
                })}
            </Container>
        </Container>
    );
};

export default Posts;
