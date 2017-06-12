import React, { Component } from 'react';
import { Header, Form, Button, Select, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addEvent, updateEvent } from '../actions/events';
import { categoryOptions } from '../categoryOptions';
import  Business1 from '../images/Business1.jpg';
import  Business2 from '../images/Business2.jpg';
import  Business3 from '../images/Business3.jpg';
import  Food1 from '../images/Food1.jpg';
import  Food2 from '../images/Food2.jpg';
import  Food3 from '../images/Food3.jpg';
import  Music1 from '../images/Music1.jpg';
import  Music2 from '../images/Music2.jpg';
import  Music3 from '../images/Music3.jpg';
import  Other1 from '../images/Other1.jpg';
import  Other2 from '../images/Other2.jpg';
import  Other3 from '../images/Other3.jpg';
import  Science1 from '../images/Science1.jpg';
import  Science2 from '../images/Science2.jpg';
import  Science3 from '../images/Science3.jpg';
import  Sports1 from '../images/Sports1.jpg';
import  Sports2 from '../images/Sports2.jpg';
import  Sports3 from '../images/Sports3.jpg';
import EventImageDrop from './EventImageDrop';


class EventForm extends Component {
  defaultData = { eventName: '', organizer: '', date: '', location: 'current location', category: '', description: '', attendeeIds: [], imageUrl:'', updateEvent: false, categoryCheck: true }

  state={  ...this.defaultData  }

  imageSet={
    Business: [ Business1, Business2, Business3 ],
    Food: [ Food1, Food2, Food3 ],
    Music: [ Music1, Music2, Music3 ],
    Other: [ Other1, Other2, Other3 ],
    Science: [ Science1, Science2, Science3 ],
    Sports: [ Sports1, Sports2, Sports3 ]
  }


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
      let imageIndex = Math.floor((Math.random()*3));
      imageDisplay = this.decideImage(this.state.category, imageIndex);
    } else {
      imageDisplay = this.state.imageUrl;
    }
    if (!this.state.updateEvent) {
      if (this.state.category === '') {
        this.setState({ categoryCheck: false })
      } else {
        this.setState(
          { organizer: username, attendeeIds: _id, imageUrl: imageDisplay },
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

  decideImage = (category, imageIndex) => {
    switch(category) {
      case 'Business':
        return this.imageSet.Business[imageIndex]
      case 'Sports & Fitness':
        return this.imageSet.Sports[imageIndex]
      case 'Science & Tech':
        return this.imageSet.Science[imageIndex]
      case 'Music & Arts':
        return this.imageSet.Music[imageIndex]
      case 'Food & Drink':
        return this.imageSet.Food[imageIndex]
      default:
        return this.imageSet.Other[imageIndex]
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
