import {React, useEffect, useState} from "react";
import {Card, Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import axios from "axios";
import {Button, Radio} from "@material-ui/core";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const PostCreateForm = ({show, handleClose, userData, updateAllPosts}) => {
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [isSearch, setIsSearch] = useState(true);
    const [vehicleSeenDate, setVehicleSeenDate] = useState('');
    const [vehicleSeenPlace, setVehicleSeenPlace] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [vinCode, setVinCode] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState(new Date());
    const [color, setColor] = useState('');
    const [distinctFeature, setDistinctFeature] = useState('');
    const [images, setImages] = useState([]);

    const [showResultModal, setShowResultModal] = useState(false);
    const [resultSuccesful, setResultSuccesful] = useState(true);

    const { t } = useTranslation();

    const history = useHistory();

    const handleShowResultModal = () => setShowResultModal(true);
    const handleCloseResultModal = () => {
        if (resultSuccesful) history.push("/posts");
        setShowResultModal(false);
    };

    const onFileChange = event =>
        setImages(event.target.files);

    const verifyData = () =>{
        //name
        //vehicleSeenDate
        //year
        return true
    }

    const saveData = () =>{
        // const formData = new FormData();
        // formData.append('name', name)
        // formData.append('user_id', userData['userId'])
        // formData.append('info', info)
        // formData.append('is_search', isSearch)
        // formData.append('vehicle_seen_date', vehicleSeenDate)
        // formData.append('vehicle_seen_place', vehicleSeenPlace)
        // formData.append('vin_code', vinCode)
        // formData.append('registration_number', registrationNumber)
        // formData.append('brand', brand)
        // formData.append('model', model)
        // formData.append('year', year)
        // formData.append('color', color)
        // formData.append('distinct_feature', distinctFeature)
        // formData.append('uploads', images)
        axios(
            {
                method: 'post',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token'),
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    'name': name,
                    'user_id': userData['userId'],
                    'info': info,
                    'is_search': isSearch,
                    'vehicle_seen_date': vehicleSeenDate,
                    'vehicle_seen_place': vehicleSeenPlace,
                    'vin_code': vinCode,
                    'registration_number': registrationNumber,
                    'brand': brand,
                    'model': model,
                    'year': year,
                    'color': color,
                    'distinct_feature': distinctFeature,
                    'uploads': images
                },
                //data: formData,
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_POSTS,
            }
        )
            .then(res => {
                const formData = new FormData();
                formData.append('post_id', res.data.pk)
                formData.append('image', images[0])
                axios(
                    {
                        method: 'post',
                        headers: {
                            'Authorization': 'JWT ' + localStorage.getItem('login_token'),
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData,
                        url: process.env.REACT_APP_LINK +
                            process.env.REACT_APP_POST_UPLOADS,
                    }
                )
                    .then(res => {
                        //console.log(res.status, "status");
                        //console.log(userData);
                        //console.log("qwertyuiop[");
                        //TODO updateAllPosts(res.data.posts)
                        //savePostUploads(res.data.postId)
                        setResultSuccesful(true);

                        handleShowResultModal();
                    })
                    .catch(err => {
                        handleShowResultModal();
                        console.log(err);
                    })
            })
            // .then(res => {
            //     //console.log(res.status, "status");
            //     //console.log(userData);
            //     //console.log("qwertyuiop[");
            //     //TODO updateAllPosts(res.data.posts)
            //     //savePostUploads(res.data.postId)
            //     setResultSuccesful(true);
            //
            //     handleShowResultModal();
            // })
            .catch(err => {
                setResultSuccesful(false)
                handleShowResultModal(false);
                console.log(err);
            })

    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('post.create')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 post" controlId="formBasicText">
                            <Form.Label>{t('post.name')}</Form.Label>
                            <Form.Control type="text"
                                          placeholder={t('post.enter_name')}
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}/>
                        </Form.Group>

                        <Form>
                            {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label={t('post.status_search')}
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                        checked={isSearch}
                                        onChange={(e) => setIsSearch((postStatus) => !postStatus)}/>
                                    <Form.Check
                                        inline
                                        label={t('post.status_found')}
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                        checked={!isSearch}
                                        onChange={(e) => setIsSearch((postStatus) => !postStatus)}/>
                                </div>
                            ))}
                        </Form>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>{t('post.vehicle_seen_place')}</Form.Label>
                            <Form.Control type="text"
                                          placeholder={t('post.enter_vehicle_seen_place')}
                                          value={vehicleSeenPlace}
                                          onChange={(e) => setVehicleSeenPlace(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="duedate">
                            <Form.Label>{t('post.vehicle_seen_date')}</Form.Label>
                            <Form.Control
                                max={new Date().toISOString().slice(0, 10)}
                                type="date"
                                placeholder={t('post.enter_vehicle_seen_date')}
                                value={vehicleSeenDate}
                                onChange={(e) => setVehicleSeenDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>{t('post.info')}</Form.Label>
                            <Form.Control as="textarea"
                                          placeholder={t('post.enter_info')}
                                          value={info}
                                          onChange={(e) => setInfo(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>{t('post.registration_number')}</Form.Label>
                            <Form.Control type="text"
                                          placeholder={t('post.registration_number')}
                                          value={registrationNumber}
                                          onChange={(e) => setRegistrationNumber(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>{t('post.vin_code')}</Form.Label>
                            <Form.Control type="text"
                                          placeholder={t('post.enter_vin_code')}
                                          value={vinCode}
                                          onChange={(e) => setVinCode(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>{t('post.brand')}</Form.Label>
                            <Form.Control type="text"
                                          placeholder={t('post.enter_brand')}
                                          value={brand}
                                          onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>{t('post.model')}</Form.Label>
                            <Form.Control type="text"
                                          placeholder={t('post.enter_model')}
                                          value={model}
                                          onChange={(e) => setModel(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="duedate">
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
                            value={color}
                            onChange={(e) => {setColor(e.target.value)}}
                        />

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>{t('post.distinct_feature')}</Form.Label>
                            <Form.Control as="textarea"
                                          placeholder={t('post.enter_distinct_feature')}
                                          value={distinctFeature}
                                          onChange={(e) => setDistinctFeature(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFileMultiple" >
                            <Form.Label>{t('post.file')}</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                multiple={false}
                                onChange={onFileChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('close')}
                    </Button>
                    <Button variant="primary" onClick={() => {
                        if(verifyData())
                            saveData()
                        handleClose()}}>
                        {t('post.create')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showResultModal} onHide={handleCloseResultModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {resultSuccesful
                            ? t("created")
                            : t("created_fail")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseResultModal}>
                        {t("close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

/*
* class Vehicle(models.Model):
    vin_code = models.CharField(max_length=30, null=True, blank=True)
    brand = models.CharField(max_length=30, null=True, blank=True)
    model = models.CharField(max_length=30, null=True, blank=True)
    year = models.DateField('Date created', default=timezone.now, null=True, blank=True)
    color = models.CharField(max_length=50, null=True, blank=True)
    distinct_feature = models.TextField(null=True, blank=True)
    info = models.TextField(null=True, blank=True)
    *
class Post(models.Model):
    name = models.CharField(max_length=500)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    vehicle_id = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    info = models.TextField(max_length=500, null=True, blank=True)
    vehicle_seen_place = models.TextField(max_length=500, null=True, blank=True)
    vehicle_seen_date = models.DateField('Date seen', default=timezone.now, null=True, blank=True)
    created = models.DateTimeField('Date created', default=timezone.now)
    closed = models.DateTimeField('Date closed', default=timezone.now)
    is_active = models.BooleanField(default=True)

class PostUploads(models.Model):
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    file = models.FileField(upload_to="post/", max_length=250, null=True, default=None, blank=True)
*
* */
/*
PostCard.propTypes = {
    postData: {
        name : PropTypes.string,
        info : PropTypes.string,
        vehicle_seen_place : PropTypes.string,
        vehicle_seen_date : PropTypes.string,
        created : PropTypes.string,
        closed : PropTypes.string,
    }
}
*/
export default PostCreateForm;