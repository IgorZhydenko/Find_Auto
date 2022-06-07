import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Button, Form, FormControl, Table} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import PostCard from "./PostCard";
import PostCreateForm from "./PostCreateForm";

const Posts = (props) => {
    const [loadNecessity, setLoadNecessity] = useState(true);
    const [newUserPost, setNewUserPost] = useState({});
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const handleShowCreatePostModal = () => setShowCreatePostModal(true);
    const handleCloseCreatePostModal = () => setShowCreatePostModal(false);

    const { t } = useTranslation();

    // console.log(props.posts)
    // console.log(props.userData)
    // console.log(props.updateAllPosts)


    // const getPosts = () => {
    //     console.log('getPosts');
    //     axios(
    //         {
    //             method: 'get',
    //             headers: {
    //                 'Authorization': 'JWT ' + localStorage.getItem('login_token')
    //             },
    //             url: process.env.REACT_APP_LINK +
    //                 process.env.REACT_APP_POSTS,
    //         }
    //     )
    //         .then(res => {
    //             console.log(res.data.results, 'qwetr');
    //             //console.log(res);
    //             //console.log(res.data[2]);
    //             //console.log(JSON.stringify(res.data, 0, 2 ), 'setPosts 40');
    //             props.updateAllPosts(res.data.results);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    /*const addNewUserPost = () => {
        axios(
            {
                method: 'post',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                data: {
                    'name': newPostName,
                    'user': props.userData['userId']
                },
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_USER_POSTS,
            }
        )
            .then(res => {
                const updatedPosts = [...posts];
                updatedPosts.push(res.data);
                setPosts(updatedPosts);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }*/

    // const updateNewPostIndex = (event, timePeriod) => {
    //     const newValue = {...newUserPost};
    //     newValue[timePeriod]['index'] = event.target.value;
    //     setNewUserPost(newValue);
    // }
    //
    // const updateNewPostValue = (event, timePeriod) => {
    //     const newValue = {...newUserPost};
    //     newValue[timePeriod]['value'] = event.target.value;
    //     setNewUserPost(newValue);
    // }

    return (
        <div className='page-body-wrapper'>
            <Button variant="primary" onClick={handleShowCreatePostModal}>Create post</Button>
            <PostCreateForm show={showCreatePostModal}  userData={props.userData} handleClose={handleCloseCreatePostModal} updateAllPosts={props.updateAllPosts}/>
            <div id='post-choosing'>
            <div className='post-choosing-group'>
                    {
                        props.posts.map(post =>
                            {console.log(post)
                                return <PostCard key={post.id} postData={post} updateAllPosts={props.updateAllPosts}/>
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Posts;