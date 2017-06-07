import React, { Component } from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

class InviteForm extends Component {
  state={ email: ''}

  componentDidMount(){
    console.log(this.props.event);
    let email = this.composeText();
    this.setState({ email });
  }

  composeText = () => {
    let { organizer, eventName, location, date, _id } = this.props.event;
    let emailText = (organizer + " would like to invite you to " +
      eventName + " at " + location + " on " + date + ". " +
      "Click here to view event: http://localhost:3000/event/" + _id);
    return(emailText);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.shareEvent();
  }


  render(){
    let emailText = this.state.email;
    return(
      <div>
        <Form onSubmit={ this.handleSubmit }>
          <Form.Field type='textArea' rows='10'>
            <input value={emailText}>
            </input>
          </Form.Field>
          <Form.Button>
            Submit
          </Form.Button>
        </Form>
      </div>
    )
  }
}

export default connect()(InviteForm);
