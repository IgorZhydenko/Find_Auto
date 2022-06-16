import React, { useEffect, useState } from "react";
import {FormControl, Button, Container, Modal, Form, Figure, Table} from "react-bootstrap";
import delBtn from "../../../images/del.png";
import acceptBtn from "../../../images/check-png.png";
import axios from "axios";
import {useHistory, useLocation, useParams} from "react-router-dom";
//import {Button} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PostCreateForm from "./PostCreateForm";
import PostEditForm from "./PostEditForm";
import PhoneInput from "react-phone-number-input";

const PostPage = ({ userData, updateAllPosts }) => {
    const { state: postData } = useLocation();
    const [bookmarkId, setBookmarkId] = useState('');
    const [bookmarked, setBookmarked] = useState(false);
    const [showEditPostModal, setShowEditPostModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [resultSuccesful, setResultSuccesful] = useState(true);

    const { t } = useTranslation();

    const history = useHistory();

    const handleShowEditPostModal = () => setShowEditPostModal(true);
    const handleCloseEditPostModal = () => setShowEditPostModal(false);

    const handleShowResultModal = () => setShowResultModal(true);
    const handleCloseResultModal = () => {
        if (resultSuccesful) history.push("/posts");
        setShowResultModal(false);
    };

    const handleShowConfirmModal = () => setShowConfirmModal(true);
    const handleCloseConfirmModal = () => setShowConfirmModal(false);
    useEffect(() => {
        console.log(process.env.REACT_APP_BOOKMARK, "tyutyu");
        axios({
            method: "get",
            headers: {
                Authorization: "JWT " + localStorage.getItem("login_token"),
            },
            // data: {
            //     'user_id': userData.userId,
            //     'post_id': postData.pk,
            // },
            url:
                process.env.REACT_APP_LINK +
                process.env.REACT_APP_BOOKMARK + userData.userId + "/" + postData.pk + "/",
        })
            .then((res) => {
                //TODO если есть в закладках - то возвращается тру ну и там понятно уже
                //bookmarked = res.data.resultsl
                //console.log(res.data, "qweqwrqrrq")
                //setBookmarked(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const deletePost = () => {
        axios({
            method: "delete",
            headers: {
                Authorization: "JWT " + localStorage.getItem("login_token"),
            },
            url:
                process.env.REACT_APP_LINK +
                process.env.REACT_APP_POSTS +
                postData.pk +
                "/",
        })
            .then((res) => {
                //console.log(res, "delete post");
                if (res.status === 204)
                    setResultSuccesful(true);

                handleShowResultModal();

                //showResultModal()
            })
            .catch((err) => {
                setResultSuccesful(false)
                handleShowResultModal();
                console.log(err);
            });
    };

    const makeBookmark = () =>{
        axios({
            method: "post",
            headers: {
                Authorization: "JWT " + localStorage.getItem("login_token"),
            },
            data: {
                'user_id': userData.userId,
                'post_id': postData.pk,
            },
            url:
                process.env.REACT_APP_LINK +
                process.env.REACT_APP_BOOKMARKS
        })
            .then((res) => {
                //console.log(res.data, "qweqwe");
                setBookmarkId(res.data.pk)
                setBookmarked(true)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteBookmark = () =>{
        axios({
            method: "delete",
            headers: {
                Authorization: "JWT " + localStorage.getItem("login_token"),
            },
            url:
                process.env.REACT_APP_LINK +
                process.env.REACT_APP_BOOKMARKS +
                bookmarkId +
                "/",
        })
            .then((res) => {
                setBookmarked(false)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container className={"post-page"}>

            {/*<Table striped bordered hover>*/}
            {/*    <tbody>*/}
            {/*    <tr>*/}
            {/*        <td>{t('post.name')}</td>*/}
            {/*        <td>{postData.name}</td>*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*        <td>2</td>*/}
            {/*        <td>Jacob</td>*/}
            {/*        <td>Thornton</td>*/}
            {/*        <td>@fat</td>*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*        <td>3</td>*/}
            {/*        <td colSpan={2}>Larry the Bird</td>*/}
            {/*        <td>@twitter</td>*/}
            {/*    </tr>*/}
            {/*    </tbody>*/}
            {/*</Table>*/}

            <Container className={"post-page-image"}>
            <Figure>
                <Figure.Image
                    width={1500}
                    height={1500}
                    alt="500x500"

                    src={postData.uploads && postData.uploads[0] && postData.uploads[0].image
                        ? `${process.env.REACT_APP_LINK}${postData.uploads[0].image.slice(1)}`
                        : 'https://bytes.ua/wp-content/uploads/2017/08/no-image.png'}
                />
            </Figure>
            </Container>

            <Container className={"post-page-text"}>
            <h1>{postData.name}</h1>

            {<p>
                {postData.is_search
                    ? t('post.status_search')
                    : t('post.status_found')}
            </p>}

            {(postData.phone_number || postData.phone_number !== '') && <p>
                {t('post.phone_number')}: {postData.phone_number}
            </p>}

            {/*<PhoneInput*/}
            {/*    placeholder={t('enter_phone_number')}*/}
            {/*    value={postData.phoneNumber}*/}
            {/*/>*/}

            {(postData.registration_number || postData.registration_number !== '') && <p>
                {t('post.registration_number')}: {postData.registration_number}
            </p>}

            {(postData.brand || postData.brand !== '') && <p>
                {t('post.brand')}: {postData.brand}
            </p>}

            {(postData.model || postData.model !== '') && <p>
                {t('post.model')}: {postData.model}
            </p>}

            {(postData.year || postData.year !== '') && <p>
                {t('post.year')}: {postData.year}
            </p>}

            <p>{t('post.color')}: {(postData.color || postData.color !== '') &&
            <Container style={{background:postData.color}} className={"post-page-body-color"}/>}
            </p>

            {(postData.vehicle_seen_place || postData.vehicle_seen_place !== '') && <p>
                {t('post.vehicle_seen_place')}: {postData.vehicle_seen_place}
            </p>}

            {(postData.vehicle_seen_date || postData.vehicle_seen_date !== '') && <p>
                {t('post.vehicle_seen_date')}: {postData.vehicle_seen_date}
            </p>}

            {(postData.info || postData.info !== '') && <p>
                {t('post.info')}: {postData.info}
            </p>}

            {(postData.vin_code || postData.vin_code !== '') && <p>
                {t('post.vin_code')}: {postData.vin_code}
            </p>}

            {(postData.distinct_feature || postData.distinct_feature !== '') && <p>
                {t('post.distinct_feature')}: {postData.distinct_feature}
            </p>}

            <Container className={"post-page-container"}>
                {bookmarked
                    ? <Button variant="primary" onClick={deleteBookmark}>
                        {t("post.delete_bookmark")}
                    </Button>
                    : <Button variant="primary" onClick={makeBookmark}>
                        {t("post.make_bookmark")}
                    </Button>}

                {userData.userId == postData.user_id && (
                    <>
                        <Button variant="primary" onClick={handleShowEditPostModal}>
                            {t("post.edit_post")}
                        </Button>
                        <PostEditForm
                            show={showEditPostModal}
                            userData={userData}
                            postData={postData}
                            handleClose={handleCloseEditPostModal}
                            updateAllPosts={updateAllPosts}
                        />

                        <Button
                            variant="primary"
                            onClick={() => {
                                handleShowConfirmModal();
                            }}
                        >
                            {t("post.delete_post")}
                        </Button>

                        <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{t("confirmation")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    {t("deleting")}
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        deletePost();
                                        handleCloseConfirmModal();
                                    }}
                                >
                                    {t("accept")}
                                </Button>
                                <Button variant="secondary" onClick={handleCloseConfirmModal}>
                                    {t("close")}
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showResultModal} onHide={handleCloseResultModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {resultSuccesful
                                        ? t("deleted")
                                        : t("deleted_fail")}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseResultModal}>
                                    {t("close")}
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )}
            </Container>
            </Container>
        </Container>
    );
};

export default PostPage;
