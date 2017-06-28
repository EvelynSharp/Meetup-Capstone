import React from 'react';
import Login from './Login';
import Footer from './Footer';
import { Modal, Button, Grid, Segment } from 'semantic-ui-react';

const LoginPage = ({ ...props }) => (

  <div>
    <div className="loginPageCon">
      <div style={{ margin: '13% 32%'}}  >
        <Segment>
          <Grid style={{  padding: '3%'}}>
            <Grid.Row centered >
              <Grid.Column width={1} />
              <Grid.Column width={14} style={{ textAlign: 'center'}}>
                <Login {...props}/>
              </Grid.Column>
              <Grid.Column width={1} />
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    </div>
    <div>
      <Footer />
    </div>
  </div>
)

export default LoginPage;
