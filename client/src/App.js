import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import EventForm from './components/EventForm';
import NoMatch from './components/NoMatch';
import Event from './components/Event';
import Register from './components/Register';

const App = () => (
  <div >
    <NavBar />
    <div className="ui container">
      <FetchUser>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path='/event/:id' component={Event} />
          <Route path="/about" component={About} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <Route path="/register" render={ (props) => <Register {...props} title="Register" /> } />
          <Route path="/login" render={ (props) => <Login {...props} title="Login" /> } />
          <ProtectedRoute path="/newevent" component={EventForm} />
          <Route component={NoMatch} />
        </Switch>
      </FetchUser>
    </div>
  </div>
);

export default App;
