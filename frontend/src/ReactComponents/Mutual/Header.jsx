import {Dropdown, Nav} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Header = (props) => {
    const { t } = useTranslation();

    return (
        <Navbar id='site-head' expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
                <div id='site-name'>
                    Find Auto
                </div>
                <Nav className="head-link-container mr-auto">
                    {props.userData === null &&
                    <>
                        <NavLink to='/login' className='header-links'>
                            {t('header.log_in')}
                        </NavLink>
                        <NavLink to='/register' className='header-links'>
                            {t('header.sign_in')}
                        </NavLink>
                    </>
                    }
                    {props.userData && props.userData['isAdmin'] === true &&
                    <>
                        <NavLink to='/administration' className='header-links'>
                            {t('header.admin_page')}
                        </NavLink>
                        <NavLink
                            to='/login'
                            className='header-links'
                            onClick={() => {
                                localStorage.setItem('login_token', '');
                                props.setUserData(null);
                            }}>
                            {t('header.exit')}
                        </NavLink>
                    </>
                    }
                    {props.userData && props.userData['isAdmin'] !== true &&
                    <>
                        <NavLink to='/posts' className='header-links'>
                            {t('header.posts')}
                        </NavLink>
                        <NavLink to='/similarity' className='header-links'>
                            {t('header.similarity')}
                        </NavLink>
                        <NavLink
                            to='/login'
                            className='header-links'
                            onClick={() => {
                                localStorage.setItem('login_token', '');
                                props.setUserData(null);
                            }}>
                            {t('header.exit')}
                        </NavLink>
                    </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;