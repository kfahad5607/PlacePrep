import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SideBar from "./components/sidebar/SideBar";
import MainView from "./components/mainview/MainView";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import { connect } from "react-redux";
import { loadUser } from "./store/actions/authActions";
import PrivateRoute from "./components/routing/PrivateRoute";
import ResetPassword from './components/auth/Resetpassword';

const App = (props) => {
    const { auth: { user }, loadUser } = props;

    useEffect(() => {
        loadUser(false, true);
        return () => {
        };
    }, []);
    {
        /* <div style={{ display: 'flex', height: '100vh' }}> */
    }

    {
        /* </div> */
    }
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/ResetPassword/:token" component={ResetPassword} />
                {user && <PrivateRoute path="/" component={Home} />}
                {/* <>
                    <Navbar />
                    <div style={{ display: "flex", height: "100vh" }}>
                        <SideBar />
                        <MainView />
                    </div>
                </> */}
            </Switch>
        </Router>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(App);
