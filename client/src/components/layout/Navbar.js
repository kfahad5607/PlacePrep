import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";

const Navbars = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebarBtn = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const authLinks = (
        <Fragment>
            <span>
                <img className="nav__user-img" src="/profile.jpg" />
                <span className='user-name'>Hello Shaibaz</span>
            </span>
            <span>
                <a href="#!">
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
        <Navbar bg="dark" variant="dark">
            <div id='sidebar-btn' onClick={toggleSidebarBtn} >
                <i className='fas fa-bars menu-icon' ></i>
            </div>
            <Navbar.Brand>
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
                    {/* Signed in as: <a href="#login">Mark Otto</a> */}
                    {authLinks}
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navbars;
