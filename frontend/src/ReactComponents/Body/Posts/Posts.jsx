import React, { useState } from "react";
import {Container} from "react-bootstrap";
import PostCard from "./PostCard";
import PostCreateForm from "./PostCreateForm";
import PostFilter from "./PostFilter";

const Posts = (props) => {

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const handleShowCreatePostModal = () => setShowCreatePostModal(true);
    const handleCloseCreatePostModal = () => setShowCreatePostModal(false);

    const isFiltered = (post) =>{
        return post.name.toLowerCase().includes(props.filterData.name.toLowerCase())
            && (props.filterData.isSearch === undefined || post.is_search === props.filterData.isSearch)
            && (props.filterData.vehicleSeenDate === "" || post.vehicle_seen_date === props.filterData.vehicleSeenDate)
            && post.vehicle_seen_place.toLowerCase().includes(props.filterData.vehicleSeenPlace.toLowerCase())
            && post.vin_code.toLowerCase().includes(props.filterData.vinCode.toLowerCase())
            && post.brand.toLowerCase().includes(props.filterData.brand.toLowerCase())
            && post.model.toLowerCase().includes(props.filterData.model.toLowerCase())
            && (props.filterData.year === "" || post.year === props.filterData.year)
            && (props.filterData.color === "" || post.color === props.filterData.color)
            && (props.filterData.myPosts === false || post.user_id === props.userData.userId)
    }

    return (
        <Container className="page-body-wrapper">
            <PostFilter key={"post-filter"} filterData={props.filterData} setFilterData={props.setFilterData} handleShowCreatePostModal={handleShowCreatePostModal}/>

            <PostCreateForm
                show={showCreatePostModal}
                userData={props.userData}
                handleClose={handleCloseCreatePostModal}
                updateAllPosts={props.updateAllPosts}
            />

            <Container className="post-choosing-group d-grid gap-3">
                {props.posts.filter((post)=>{return isFiltered(post)}).map((post) => {
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