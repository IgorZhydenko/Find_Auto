import {Card, Container} from "react-bootstrap";
import {Button} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import React from "react";

const PostCard = ({postData}) => {
    const history = useHistory();

    const { t } = useTranslation();

    return (
        <Card className={"post-card"}>
            <Card.Img variant="top" className={"post-card-image"}
                      src={postData.uploads && postData.uploads[0] && postData.uploads[0].image
                          ? `${process.env.REACT_APP_LINK}${postData.uploads[0].image.slice(1)}`
                          : 'https://bytes.ua/wp-content/uploads/2017/08/no-image.png'} />

            <Card.Body>
                <Card.Title>{postData.name}</Card.Title>

                {<Card.Text>
                    {postData.is_search
                        ? t('post.status_search')
                        : t('post.status_found')}
                </Card.Text>}

                {(postData.registration_number || postData.registration_number !== '') && <Card.Text>
                    <b>{t('post.registration_number')}</b>: {postData.registration_number}
                </Card.Text>}

                {(postData.brand || postData.brand !== '') && <Card.Text>
                    <b>{t('post.brand')}</b>: {postData.brand}
                </Card.Text>}

                {(postData.model || postData.model !== '') && <Card.Text>
                    <b>{t('post.model')}</b>: {postData.model}
                </Card.Text>}

                {(postData.year || postData.year !== '') && <Card.Text>
                    <b>{t('post.year')}</b>: {postData.year}
                </Card.Text>}

                <Card.Text>
                    <b>{t('post.color')}</b>:
                </Card.Text>
                {(postData.color || postData.color !== '') && <Container style={{background:postData.color}} className={"post-card-body-color"}/>}

                {(postData.vehicle_seen_place || postData.vehicle_seen_place !== '') && <Card.Text>
                    <b>{t('post.vehicle_seen_place')}</b>: {postData.vehicle_seen_place}
                </Card.Text>}

                {(postData.vehicle_seen_date || postData.vehicle_seen_date !== '') && <Card.Text>
                    <b>{t('post.vehicle_seen_date')}</b>: {postData.vehicle_seen_date}
                </Card.Text>}

                <Button className={"page-open-button"} onClick={()=>{history.push(`/post/${postData.pk}`, postData)}}>
                    {t('post.open_post')}
                </Button>
        </Card.Body>
</Card>
    )
}

export default PostCard;