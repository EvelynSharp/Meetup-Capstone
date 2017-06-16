import React, { Component } from 'react';
import { Header, Form, Button, Select, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addEvent, updateEvent, randomImageSelection } from '../actions/events';
import { categoryOptions } from '../categoryOptions';
import EventImageDrop from './EventImageDrop';
import moment from 'moment';


class EventForm extends Component {
  defaultData = {
    eventName: '',
    organizer: '',
    begDate: '',
    begTime: '',
    location: '',
    category: '',
    description: '',
    attendeeIds: [],
    imageUrl:'',
    updateEvent: false,
    categoryCheck: true,
    ifPastDate: false,
   }

  state={  ...this.defaultData  }

  componentDidMount = () => {
    // const time = moment("06/15/2017 8:30").format("X");
    // const currentTime = moment(new Date()).subtract(6, 'hours').format("X")
    //
    // const curUnixDate = moment(new Date()).subtract(6, 'hours').format("X");
    // console.log(curUnixDate)
    // console.log(time);
    // console.log('current', currentTime);
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
      } else if (!this.state.ifPastDate) {
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

  handleDateChange = (e) => {
    let { id, value } = e.target;
    this.setState({ ifPastDate: false });
    this.setState({ [id]: value }, () => {
      let { begDate, begTime } = this.state;
      if(begDate !== '' && begTime !== '') {
        this.checkPastTime();
      }
    })
  }

  checkPastTime = () => {
    let { begDate, begTime } = this.state;
    let combinedDate = `${begDate} ${begTime}`;
    let comUnixDate = moment(combinedDate).subtract(6, 'hours').format("X");
    let curUnixDate = moment(new Date()).subtract(6, 'hours').format("X");
    if (comUnixDate < curUnixDate) {
      this.setState({ ifPastDate: true })
    }
  }

  render() {
    let { username, updateEvent } = this.props;
    let { eventName, begDate, begTime, location, category, description, categoryCheck, ifPastDate } = this.state;

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
          <Form.Group inline>
            <label>Start Date:</label>
            <Form.Field required width={4}>
              <input
                id='begDate'
                value={begDate}
                type="date"
                onChange={this.handleDateChange}
                required
              />
            </Form.Field>
            <Form.Field required width={4}>
              <input
                id='begTime'
                value={begTime}
                type="time"
                onChange={this.handleDateChange}
                required
              />
            </Form.Field>
          </Form.Group>
          { ifPastDate &&
            <Message
              error
              content='Event time cannot be in the past.'
            />
          }
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
