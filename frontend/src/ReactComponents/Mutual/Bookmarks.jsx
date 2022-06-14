import React, { useEffect, useState } from "react";
import {Accordion, Button, Container, Form} from "react-bootstrap";
import {useTranslation } from "react-i18next";
import PostCard from "../Body/Posts/PostCard";
import axios from "axios";


const Bookmarks = (props) => {
    const [postId, setPostId] = useState([]);
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        axios(
            {
                method: 'get',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                data: props.userData.user_id,
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_BOOKMARKS,
            }
        )
            .then(res => {
                //props.updateAllPosts(res.data.results);
                console.log(res.data.results, "ghjghjgj");

                setBookmarkedPosts(res.data.results)
                //setPostId(res.data.results.post_id)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <Container className="page-body-wrapper">

            <Container className="post-choosing-group d-grid gap-3">
                {bookmarkedPosts.map((bookmarkedPost) => {
                    return (
                        <PostCard
                            key={bookmarkedPost.post_id}
                            postData={{...bookmarkedPost.post, post_id: bookmarkedPost.post_id}}
                            //      updateAllPosts={props.updateAllPosts}
                        />
                    );
                })}
            </Container>
        </Container>
    );
};

export default Bookmarks;
