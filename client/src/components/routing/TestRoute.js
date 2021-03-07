import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const TestRoute = ({ auth: { isAuthenticated, loading, testDetails }, component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={props => {
                if (!testDetails) {
                    return <Redirect to='/' />;
                }
                else {
                    return <Component {...props} />;
                }
            }} />
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(TestRoute);
