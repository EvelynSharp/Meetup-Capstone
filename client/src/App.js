import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import NewEvent from './components/NewEvent';
import NoMatch from './components/NoMatch';


const App = () => (
  <div className="ui container">
    <NavBar />
    <FetchUser>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <Route path="/register" render={ (props) => <Auth {...props} title="Register" /> } />
        <Route path="/login" render={ (props) => <Auth {...props} title="Login" /> } />
        <ProtectedRoute path="/newevent" component={NewEvent} />
        <Route component={NoMatch} />
      </Switch>
    </FetchUser>
  </div>
);

export default App;
