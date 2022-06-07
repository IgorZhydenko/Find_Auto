import {useEffect, useState} from "react";
import {Card, OverlayTrigger, Tooltip} from "react-bootstrap";
import axios from "axios";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const PostCard = ({postData, updateAllPosts}) => {
    const history = useHistory();

    const { t } = useTranslation();

    return (
        <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>{postData.name}</Card.Title>
                {(postData.info || postData.info !== '') && <Card.Text>
                {postData.info}
                </Card.Text>}
                {<Card.Text>
                    {postData.is_search}
                </Card.Text>}
                {(postData.vin_code || postData.vin_code !== '') && <Card.Text>
                    {postData.vin_code}
                </Card.Text>}
                {(postData.brand || postData.brand !== '') && <Card.Text>
                    {postData.brand}
                </Card.Text>}
                {(postData.model || postData.model !== '') && <Card.Text>
                    {postData.model}
                </Card.Text>}
                {(postData.year || postData.year !== '') && <Card.Text>
                    {postData.year}
                </Card.Text>}
                {(postData.color || postData.color !== '') && <Card.Text>
                    {postData.color}
                </Card.Text>}
                {(postData.distinct_feature || postData.distinct_feature !== '') && <Card.Text>
                    {postData.distinct_feature}
                </Card.Text>}
                {(postData.vehicle_seen_place || postData.vehicle_seen_place !== '') && <Card.Text>
                    {postData.vehicle_seen_place}
                </Card.Text>}
                {(postData.vehicle_seen_date || postData.vehicle_seen_date !== '') && <Card.Text>
                    {postData.vehicle_seen_date}
                </Card.Text>}
            <Button variant="primary" onClick={()=>{history.push(`/post/${postData.id}`, postData)}}>{t('post.open_post')}</Button>
        </Card.Body>
</Card>
    )
}
/*
PostCard.propTypes = {
    postData: {
        name : PropTypes.string,
        info : PropTypes.string,
        vehicle_seen_place : PropTypes.string,
        vehicle_seen_date : PropTypes.string,
        created : PropTypes.string,
        closed : PropTypes.string,
        name = models.CharField(max_length=500)
    status_search = bool
    vin_code = string
    brand = string
    model = string
    year = date
    color = string
    distinct_feature = string
    vehicle_seen_place = string
    vehicle_seen_date = date
    }
}
*/
export default PostCard;