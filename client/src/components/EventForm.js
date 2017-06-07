import React, { Component } from 'react';
import { Header, Form, Button, Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addEvent, updateEvent } from '../actions/events';
import { categoryOptions } from '../categoryOptions';

class EventForm extends Component {
  defaultData = { eventName: '', organizer: '', date: '', location: '', category: '', description: '', attendeeIds: [], updateEvent: false }

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
    let { eventName, date, location, category, description } = this.state;
    return(
      <div>
        <Header as="h2">{username}</Header>
        <Form onSubmit={ this.submitNewEvent }>
          <Form.Field required>
            <label>Event Name:</label>
            <input
              id='eventName'
              value={eventName}
              type="text"
              onChange={this.handleEventChange}
              required
            />
          </Form.Field>
          <Form.Field required>
            <label>Date:</label>
            <input
              id='date'
              value={date}
              type="date"
              onChange={this.handleEventChange}
              required
            />
          </Form.Field>
          <Form.Field >
            <label>Location:</label>
            <input
              id='location'
              value={location}
              type="text"
              onChange={this.handleEventChange}
            />
          </Form.Field>
          <Form.Field
            control={Select}
            label="Category: "
            value={category}
            onChange={ (e, data) => {
              this.setState({ category: data.value })
            }}
            id='category'
            options = {categoryOptions}
            required
          />
          <Form.Field>
            <Form.TextArea
              label="Description:"
              id='description'
              value={description}
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
