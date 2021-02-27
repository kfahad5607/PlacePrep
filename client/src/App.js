import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/layout/Home";
import Alerts from "./components/layout/Alerts";
import { connect } from "react-redux";
import { loadUser } from "./store/actions/authActions";
import PrivateRoute from "./components/routing/PrivateRoute";

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
            <Alerts />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                {user && <PrivateRoute path="/" component={Home} />}
            </Switch>
        </Router>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(App);
