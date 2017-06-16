import React, { Component } from 'react';
import { Header, Form, Button, Select, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addEvent, updateEvent, randomImageSelection } from '../actions/events';
import { categoryOptions } from '../categoryOptions';
import EventImageDrop from './EventImageDrop';


class EventForm extends Component {
  defaultData = { eventName: '', organizer: '', date: '', location: 'current location', category: '', description: '', attendeeIds: [], imageUrl:'', updateEvent: false, categoryCheck: true }

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
    let imageDisplay;
    if(this.state.imageUrl === '') {
      imageDisplay= randomImageSelection(this.state.category);

    } else {
      imageDisplay = this.state.imageUrl;
    }
    if (!this.state.updateEvent) {
      if (this.state.category === '') {
        this.setState({ categoryCheck: false })
      } else {
        this.setState(
          { organizer: username, attendeeIds: username, imageUrl: imageDisplay },
          () => {
            let eventDetails = { ...this.state };
            this.props.dispatch(addEvent(eventDetails));
            this.setState({ ...this.defaultData });
            history.push('/');
          })
        }
      } else {
        let eventDetails = { ...this.state };
        this.props.dispatch(updateEvent(eventDetails));
        this.setState({ ...this.defaultData });
        this.props.toggleEdit();
      }
  }

  setImageUrlState = (imageUrl) => {
    this.setState({ imageUrl })
  }

  render() {
    let { username, updateEvent } = this.props;
    let { eventName, date, location, category, description, categoryCheck } = this.state;

    return(
      <div className='formContainer, pageContainer'>
        <Header as="h2" className="eventFormHeader">Please Provide Event Details: </Header>
        <Header as="h4">{`Organizer: ${username}`}</Header>
        <Form onSubmit={ this.submitNewEvent } error>
          <Form.Field required width={7}>
            <label>Event Name:</label>
            <input
              id='eventName'
              value={eventName}
              type="text"
              onChange={this.handleEventChange}
              required
            />
          </Form.Field>
          <Form.Field width={7}>
            <label>Location:</label>
            <input
              id='location'
              value={location}
              type="text"
              onChange={this.handleEventChange}
            />
          </Form.Field>
          <Form.Field
            width={4}
            control={Select}
            label="Category: "
            value={category}
            onChange={ (e, data) => {
              this.setState({ category: data.value, categoryCheck: true })
            }}
            id='category'
            options = {categoryOptions}
            required
          />
          { !categoryCheck &&
            <Message
              error
              content='Please fill out this field.'
            />
          }
          <Form.Field required width={4}>
            <label>Date:</label>
            <input
              id='date'
              value={date}
              type="date"
              onChange={this.handleEventChange}
              required
            />
          </Form.Field>
          { !updateEvent &&
            <Form.Field>
              <EventImageDrop setImageUrlState={this.setImageUrlState}/>
            </Form.Field>
          }
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
            className="primBtn"
            primary
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
