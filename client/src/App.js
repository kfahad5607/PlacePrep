import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Auth.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import SideBar from './components/sidebar/SideBar';
import MainView from './components/mainview/MainView';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const App = () => {
  const store = configureStore();
  {/* <div style={{ display: 'flex', height: '100vh' }}> */ }

  {/* </div> */ }
  return (
    <Provider store={store} >
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <>
            <div style={{ display: 'flex', height: '100vh' }} >
              <SideBar />
              <MainView />
            </div>
          </>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
