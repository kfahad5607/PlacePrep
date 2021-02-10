import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Auth.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Coding from './components/coding/Coding';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/code" component={Coding}/>
      </Switch>
    </Router>
  )
}

export default App
