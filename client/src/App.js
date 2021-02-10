import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Auth.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Coding from './component/coding/Coding';

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
