import {useEffect, useState} from "react";
import {Card, Container, OverlayTrigger, Tooltip, Figure, Accordion} from "react-bootstrap";
import axios from "axios";
import {Button} from "@material-ui/core";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const PostCard = ({postData, updateAllPosts}) => {
    const history = useHistory();
    //console.log(postData, "etrete")
    const { t } = useTranslation();

    return (
        <Card className={"post-card"}>
            {/*<Card.Img variant="top" className={"post-card-image"}*/}
            {/*          src={postData.uploads && postData.uploads[0] && postData.uploads[0].image*/}
            {/*              ? `${process.env.REACT_APP_LINK}${postData.uploads[0].image.slice(1)}`*/}
            {/*              : 'https://bytes.ua/wp-content/uploads/2017/08/no-image.png'} />*/}

            <Figure>
                <Figure.Image
                    width={250}
                    height={250}
                    alt="171x180"
                    src={postData.uploads && postData.uploads[0] && postData.uploads[0].image
                        ? `${process.env.REACT_APP_LINK}${postData.uploads[0].image.slice(1)}`
                        : 'https://bytes.ua/wp-content/uploads/2017/08/no-image.png'}
                />
            </Figure>

            <Card.Body>
                <Card.Title>{postData.name}</Card.Title>

                {<Card.Text>
                    {postData.is_search
                        ? t('post.status_search')
                        : t('post.status_found')}
                </Card.Text>}

                {(postData.registration_number || postData.registration_number !== '') && <Card.Text>
                    {postData.registration_number}
                </Card.Text>}

                {(postData.brand || postData.brand !== '') && <Card.Text>
                    Brand: {postData.brand}
                </Card.Text>}

                {(postData.model || postData.model !== '') && <Card.Text>
                    Model: {postData.model}
                </Card.Text>}

                {(postData.year || postData.year !== '') && <Card.Text>
                    {postData.year}
                </Card.Text>}

                {(postData.color || postData.color !== '') && <Container style={{background:postData.color}} className={"post-card-body-color"}/>}

                {(postData.vehicle_seen_place || postData.vehicle_seen_place !== '') && <Card.Text>
                    {postData.vehicle_seen_place}
                </Card.Text>}

                {(postData.vehicle_seen_date || postData.vehicle_seen_date !== '') && <Card.Text>
                    {postData.vehicle_seen_date}
                </Card.Text>}

                <Button className={"page-open-button"}  onClick={()=>{history.push(`/post/${postData.pk}`, postData)}}>
                    {t('post.open_post')}
                </Button>
        </Card.Body>
</Card>
    )
}

export default PostCard;

{/*{(postData.info || postData.info !== '') && <Card.Text>*/}
{/*{postData.info}*/}
{/*</Card.Text>}*/}

{/*{(postData.vin_code || postData.vin_code !== '') && <Card.Text>*/}
{/*    {postData.vin_code}*/}
{/*</Card.Text>}*/}

// <Card.Text>
//     {postData.color}
// </Card.Text>}
// {(postData.distinct_feature || postData.distinct_feature !== '') && <Card.Text>
//     {postData.distinct_feature}
// </Card.Text>}