import React from 'react';
import Login from './Login';
import { Modal, Button } from 'semantic-ui-react';

const LoginPage = ({ ...props }) => (
  <div className="ui container">
    <div className="signInModalCon">
        <Login {...props} />
    </div>
  </div>
)

export default LoginPage;
