import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import SideBar from "./components/sidebar/SideBar";
import MainView from "./components/mainview/MainView";
import Navbar from "./components/layout/Navbar"
import Home from "./components/layout/Home"
import { connect } from "react-redux";
import { loadUser } from "./store/actions/authActions";
import PrivateRoute from "./components/routing/PrivateRoute";

const App = (props) => {
    const { loadUser } = props;
    loadUser(false, true);
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
                <PrivateRoute path ="/" component={Home} />
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

export default connect(null, { loadUser })(App);
