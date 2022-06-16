import {React, useEffect, useState} from "react";
import {Card, Form, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import axios from "axios";
import {Button, Radio} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'

const PostEditForm = ({show, handleClose, userData, updateAllPosts, postData}) => {
    const [name, setName] = useState(postData.name || '');
    const [info, setInfo] = useState(postData.info);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSearch, setIsSearch] = useState(postData.is_search);
    const [vehicleSeenDate, setVehicleSeenDate] = useState(postData.vehicle_seen_date);
    const [vehicleSeenPlace, setVehicleSeenPlace] = useState(postData.vehicle_seen_place);
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [vinCode, setVinCode] = useState(postData.vin_code);
    const [brand, setBrand] = useState(postData.br);
    const [model, setModel] = useState(postData.model);
    const [year, setYear] = useState(postData.year);
    const [color, setColor] = useState(postData.color);
    const [distinctFeature, setDistinctFeature] = useState(postData.distinct_feature);
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

    console.log(process.env.REACT_APP_LINK +
        process.env.REACT_APP_POSTS + postData.pk,)

    const saveData = () =>{
        axios(
            {
                method: 'put',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                data: {
                    'name': name,
                    'user_id': userData['userId'],
                    'info': info,
                    'phone_number': phoneNumber,
                    'is_search': isSearch,
                    'vehicle_seen_date': vehicleSeenDate,
                    'vehicle_seen_place': vehicleSeenPlace,
                    'registration_number': registrationNumber,
                    'vin_code': vinCode,
                    'brand': brand,
                    'model': model,
                    'year': year,
                    'color': color,
                    'distinct_feature': distinctFeature,
                },
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_POSTS + postData.pk + "/",
            }
        )
            .then(res => {
                const formData = new FormData();
                formData.append('post_id', res.data.pk)
                formData.append('image', images[0])
                axios(
                    {
                        method: 'put',
                        headers: {
                            'Authorization': 'JWT ' + localStorage.getItem('login_token'),
                            'Content-Type': 'multipart/form-data'
                        },
                        data: formData,
                        url: process.env.REACT_APP_LINK +
                            process.env.REACT_APP_POST_UPLOADS + postData.uploads[0].pk + "/" ,
                    }
                )
                    .then(res => {
                        setResultSuccesful(true);
                        handleShowResultModal();
                    })
                    .catch(err => {
                        handleShowResultModal();
                        console.log(err);
                    })
            })
            .catch(err => {
                setResultSuccesful(false);
                handleShowResultModal(false);
                console.log(err);
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('post.edit')}</Modal.Title>
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

                        <PhoneInput
                            placeholder={t('enter_phone_number')}
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e)}
                        />

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
                            onChange={(e) => {setColor(e.target.value)
                            }}
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        saveData()
                        handleClose()}}>
                        {t('post.edit')}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showResultModal} onHide={handleCloseResultModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {resultSuccesful
                            ? t("edited")
                            : t("edited_fail")}
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
export default PostEditForm;