import React, { Component } from 'react';
import { Header, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addEvent, updateEvent } from '../actions/events';

class EventForm extends Component {
  defaultData = { eventName: '', organizer: '', date: '', location: '', attendeeIds: [], updateEvent: false }

  state={  ...this.defaultData  }

  componentDidMount = () => {
    if(this.props.updateEvent) {
      let { eventToUpdate, updateEvent } = this.props;
      this.setState({...eventToUpdate, updateEvent});
    }
  }

  handleEventChange = (e) => {
    let { id, value } = e.target;
    this.setState({ [id]: value })
  }

  submitNewEvent = (e) => {
    e.preventDefault();
    let { _id, username, history } = this.props;
    if (!this.state.updateEvent) {
      this.setState(
        { organizer: username, attendeeIds: [ _id ]},
        () => {
          let eventDetails = { ...this.state };
          this.props.dispatch(addEvent(eventDetails));
          this.setState({ ...this.defaultData });
          history.push('/');
        })
      } else {
        let eventDetails = { ...this.state };
        this.props.dispatch(updateEvent(eventDetails));
        this.setState({ ...this.defaultData });
        this.props.toggleEdit();
      }
  }

  render() {
    let { username } = this.props;
    let { eventName, date, location } = this.state;
    return(
      <div>
        <Header as="h2">{username}</Header>
        <Form onSubmit={ this.submitNewEvent }>
          <Form.Field>
            <label>Event Name:</label>
            <input
              id='eventName'
              value={eventName}
              type="text"
              onChange={this.handleEventChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Date:</label>
            <input
              id='date'
              value={date}
              type="date"
              onChange={this.handleEventChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Location:</label>
            <input
              id='location'
              value={location}
              type="text"
              onChange={this.handleEventChange}
            />
          </Form.Field>
          <Button
            type='submit'
            className='ui primary button'
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return { ...state.user }
}

export default connect(mapStateToProps)(EventForm);
