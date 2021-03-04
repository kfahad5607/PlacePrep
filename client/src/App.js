import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Auth.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/layout/Home";
import Alerts from "./components/layout/Alerts";
import QuizPage from './components/quiz/QuizPage';
import { connect } from "react-redux";
import { loadUser, setTestDetails } from "./store/actions/authActions";
import PrivateRoute from "./components/routing/PrivateRoute";
// import TestRoute from './components/routing/TestRoute';
import ResetPassword from './components/auth/Resetpassword';
import TestRoute from "./components/routing/TestRoute";

const App = (props) => {
    const { auth: { user, error }, setTestDetails, loadUser } = props;

    useEffect(() => {
        loadUser(false, true);

        return () => {
        };

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user?.currentTest) {
            setTestDetails({
                type: 'quiz',
                test: user.currentTest.slug
            });
        }
        //eslint-disable-next-line
    }, [user]);


    return (
        <Router>
            <Alerts />
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/ResetPassword/:token" component={ResetPassword} />
                {/* <PrivateRoute path="/" component={Home} /> */}
                <TestRoute path='/quiz/:slug' component={QuizPage} />
                {user && <PrivateRoute path="/" component={Home} />}
            </Switch>
        </Router>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { loadUser, setTestDetails })(App);
