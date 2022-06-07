import React, {useEffect, useState} from "react";
import {FormControl, Button, Container} from "react-bootstrap";
import delBtn from '../../../images/del.png';
import acceptBtn from '../../../images/check-png.png';
import axios from "axios";
import {useLocation, useParams} from "react-router-dom";
//import {Button} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import PostCreateForm from "./PostCreateForm";
import PostEditForm from "./PostEditForm";

const PostPage = ({userData, updateAllPosts}) => {
    const {state: postData}=useLocation()
    const [showEditPostModal, setShowEditPostModal] = useState(false);

    const { t } = useTranslation();

    const handleShowEditPostModal = () => setShowEditPostModal(true);
    const handleCloseEditPostModal = () => setShowEditPostModal(false);

    //console.log("test postPage", userData, postData)
    /*const deletePost = () => {
        axios(
            {
                method: 'delete',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                url: process.env.REACT_APP_LINK + process.env.REACT_APP_POSTS +
                    posts[chosenPostIndex]['id'] + '/',
            }
        )
            .then(res => {
                console.log(res.data.results);
                const newValue = [...posts];
                newValue.splice(chosenPostIndex, 1);
                setPosts(newValue);
                choosePostIndex(-1);
                document.getElementById('post-name-select').selectedIndex = 0;
            })
            .catch(err => {
                console.log(err);
            })
    }*/
    //if(userData.userId==postData.user_id) return 'kurwa matj';

    return (
        <Container>
            {JSON.stringify(postData)}
            {userData.userId==postData.user_id && <>
                <Button variant="primary" onClick={handleShowEditPostModal}>{t('post.edit_post')}</Button>
                <PostEditForm show={showEditPostModal}  userData={userData} postData={postData} handleClose={handleCloseEditPostModal} updateAllPosts={updateAllPosts}/>
                <Button variant="primary" onClick={()=>{}}>{t('post.delete_post')}</Button>
            </>}
        </Container>

    )
}

export default PostPage;