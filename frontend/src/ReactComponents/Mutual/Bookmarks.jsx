import React, { useEffect, useState } from "react";
import {Container} from "react-bootstrap";
import PostCard from "../Body/Posts/PostCard";
import axios from "axios";


const Bookmarks = (props) => {
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

    useEffect(() => {
        axios(
            {
                method: 'get',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('login_token')
                },
                url: process.env.REACT_APP_LINK +
                    process.env.REACT_APP_BOOKMARKS + props.userData.userId + "/",
            }
        )
            .then(res => {
                setBookmarkedPosts(res.data)
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
                        />
                    );
                })}
            </Container>
        </Container>
    );
};

export default Bookmarks;
