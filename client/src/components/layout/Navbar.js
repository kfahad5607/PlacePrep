import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

const Navbars = (props) => {

    const { logout } = props;
    const {isAuthenticated, user } = props.auth;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebarBtn = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const onlogout = () => {
        logout();
    }

    const authLinks = (
        <Fragment>
            <span>
                <img className="nav__user-img" src="/profile.jpg" />
                <span className='user-name'>Hello {user && user.name}</span>
            </span>
            <span>
                <a href="#" onClick={onlogout}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span className="hide-sm"> Logout</span>
                </a>
            </span>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </Fragment>
    );
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <div id='sidebar-btn' onClick={toggleSidebarBtn} >
                <i className='fas fa-bars menu-icon' ></i>
            </div>
            <Navbar.Brand className="brand-name">
                <img
                    alt=""
                    src="./assets/img/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{" "}
                PlacePrep
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    { isAuthenticated ? authLinks: guestLinks}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout})(Navbars);
