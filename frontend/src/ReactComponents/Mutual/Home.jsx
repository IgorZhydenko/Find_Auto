import React from "react";
import {Container} from "react-bootstrap";
import {useTranslation } from "react-i18next";

const Home = (props) => {
    const { t } = useTranslation();

    return (
        <Container className="page-body-wrapper">
            <div>
                <h1 className={"home-title"}>
                    <font color={"orange"}><u>Find Auto</u> </font>
                </h1>
                <br/><br/>
                <h2 className={"home-text"}>
                    {t('home_title')}
                </h2>
                <br/><br/>
                <h3 className={"home-text"}>
                    <p>{t('home_info1')}</p>
                    <p>{t('home_info2')}</p>
                    <p>{t('home_info3')}</p>
                    <p>{t('home_info4')}</p>
                </h3>
            </div>
        </Container>
    );
};

export default Home;
