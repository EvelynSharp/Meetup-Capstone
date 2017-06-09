import React, { Component } from 'react';
import { Header, Form, Button, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
class InviteForm extends Component {
  state={ emailAddress: '', email: ''}
  componentDidMount(){
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
    let {emailAddress, email} = this.state;
    if(emailAddress!== "")
      this.props.shareEvent(emailAddress, email);
  }
  handleChange = (e) => {
    let { id, value } = e.target;
    this.setState({ [id]: value });
  }
  render(){
    let emailText = this.state.email;
    return(
      <div>
        <Form onSubmit={ this.handleSubmit }>
          <Form.Field>
            <input
              type='email'
              id='emailAddress'
              placeholder="enter recipient's email address"
              onChange={this.handleChange}>
            </input>
          </Form.Field>
          <Form.Field>
            <Input type='TextArea' id='emailText' value={emailText} onChange={this.handleChange}>
            </Input>
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
