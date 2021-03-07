import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ auth: { isAuthenticated, loading, testDetails }, component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (!isAuthenticated) {
                return <Redirect to='/login' />;
            }
            else if (isAuthenticated && !testDetails) {
                return <Component {...props} />;
            }
            else if (isAuthenticated && testDetails) {
                return <Redirect to={`/${testDetails.type}/${testDetails.test}`} />;
            }
        }} />
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute);
