import React from "react";
import {Container} from "react-bootstrap";
import {useTranslation } from "react-i18next";

const AboutUs = (props) => {
    const { t } = useTranslation();

    return (
        <Container className="page-body-wrapper">
            <div>
                <h1 className={"home-title"}>
                    <font color={"orange"}><u>Find Auto</u> </font>
                </h1>
                <h2 className={"home-text"}>
                    <p>{t('about_us_text')}</p>
                    <p>{t('about_us_text2')}</p>
                </h2>
                <br/><br/>
                <h3 className={"home-text"}>
                    <p>{t('about_us_info1')}</p>
                    <p>{t('about_us_info2')}</p>
                    <p>{t('about_us_info3')}</p>
                    <p>{t('about_us_info4')}</p>
                    <p>{t('about_us_info5')}</p>
                    <p>{t('about_us_info6')}</p>
                </h3>
            </div>
        </Container>
    );
};

export default AboutUs;
