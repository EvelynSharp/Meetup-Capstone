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
    begTime: '12:00',
    endDate: '',
    endTime: '12:00',
    location: '',
    category: '',
    description: '',
    attendeeIds: [],
    imageUrl:'',
    updateEvent: false,
    categoryCheck: true,
    ifPastDate: false,
    ifBadEndTime: false,
   }

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
    if(this.state.endDate === '') {
      this.setState({ endTime : '' });
    }
    if (!this.state.updateEvent) {
      if (this.state.category === '') {
        this.setState({ categoryCheck: false })
      } else if (!this.state.ifPastDate && !this.state.ifBadEndTime ) {
        let firstAttendee = [{ email: username, id: _id }];
        this.setState(
          { organizer: username, attendeeIds: firstAttendee, imageUrl: imageDisplay },
          () => {
            let eventDetails = { ...this.state };
            this.props.dispatch(addEvent(eventDetails));
            this.setState({ ...this.defaultData });
            history.push('/');
          })
        }
      } else {
        if(this.state.category === '') {
          this.setState({ categoryCheck: false })
        } else if (!this.state.ifPastDate && !this.state.ifBadEndTime ) {
          let eventDetails = { ...this.state };
          this.props.dispatch(updateEvent(eventDetails));
          this.setState({ ...this.defaultData });
          this.props.toggleEdit();
        }
      }
  }

  setImageUrlState = (imageUrl) => {
    this.setState({ imageUrl })
  }

  handleDateChange = (e) => {
    let { id, value } = e.target;
    this.setState({ ifPastDate: false, ifBadEndTime: false });
    this.setState({ [id]: value }, () => {
      let { begDate, begTime } = this.state;
      if(begDate !== '' && begTime !== '') {
        this.checkBadTime();
      }
    })
  }

  checkBadTime = () => {
    let { begDate, begTime, endDate, endTime } = this.state;
    let comUnixBegDate = moment(`${begDate} ${begTime}`).subtract(6, 'hours').format("X");
    let curUnixDate = moment(new Date()).subtract(6, 'hours').format("X");
    if (comUnixBegDate < curUnixDate) {
      this.setState({ ifPastDate: true })
    }
    if(endDate !== '' && endTime !== '') {
      let comUnixEndDate = moment(`${endDate} ${endTime}`).subtract(6, 'hours').format("X");
      if ( comUnixEndDate <= comUnixBegDate) {
        this.setState({ ifBadEndTime: true });
      }
    }
  }

  render() {
    let { username, updateEvent } = this.props;
    let { eventName, begDate, begTime, endDate, endTime, location, category, description, categoryCheck, ifPastDate, ifBadEndTime } = this.state;

    return(
      <div className={ updateEvent? null : "generalBGContainer"}>
        <div className={ updateEvent? null : "bgOverlay"}>
          <div className={ updateEvent? null : "mainContentContainer"}>
            <div className='formContainer, pageContainer'>
              { !updateEvent &&
                <div>
                  <Header className="pageHeaders">Create A New Event: </Header>
                  <Header as="h4" style={{ marginBottom: '2%', textAlign: 'center'}}>{`Organizer: ${username}`}</Header>
                </div>
              }
              <Form onSubmit={ this.submitNewEvent } error>
                <Form.Group>
                  <Form.Field width={updateEvent ? 1: 3} />
                  <Form.Field required width={updateEvent ? 13: 10}>
                    <label>Event Name:</label>
                    <input
                      id='eventName'
                      value={eventName}
                      type="text"
                      onChange={this.handleEventChange}
                      required
                    />
                  </Form.Field>
                  <Form.Field width={updateEvent ? 1: 3} />
                </Form.Group>
                <Form.Group>
                  <Form.Field width={updateEvent ? 1: 3} />
                  <Form.Field width={updateEvent ? 13: 10}>
                    <label>Location:</label>
                    <input
                      id='location'
                      value={location}
                      type="text"
                      onChange={this.handleEventChange}
                    />
                  </Form.Field>
                  <Form.Field width={updateEvent ? 1: 3} />
                </Form.Group>
                <Form.Group>
                  <Form.Field width={updateEvent ? 1: 3} />
                  <Form.Field
                    width={updateEvent ? 13: 10}
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
                  <Form.Field width={updateEvent ? 1: 3} />
                </Form.Group>
                { !categoryCheck &&
                  <Form.Group>
                    <Form.Field width={updateEvent ? 1: 3} />
                      <Message
                        error
                        content='Please fill out this field.'
                      />
                    <Form.Field width={updateEvent ? 1: 3} />
                  </Form.Group>
                }
                <Form.Group >
                  <Form.Field width={updateEvent ? 1: 3} />
                  <Form.Field width={updateEvent ? 3 : 2}> <label>Start Time:</label> </Form.Field>
                  <Form.Field required width={ updateEvent ? 5 : 4}>
                    <input
                      id='begDate'
                      value={begDate}
                      type="date"
                      onChange={this.handleDateChange}
                      required
                    />
                  </Form.Field>
                  <Form.Field required width={ updateEvent ? 5 : 4}>
                    <input
                      id='begTime'
                      value={begTime}
                      type="time"
                      onChange={this.handleDateChange}
                      required
                    />
                  </Form.Field>

                  <Form.Field width={updateEvent ? 1: 3} />
                </Form.Group>
                { ifPastDate &&
                  <Form.Group>
                    <Form.Field width={updateEvent ? 1: 3} />
                      <Message
                        error
                        content='Event time cannot be in the past.'
                      />
                    <Form.Field width={updateEvent ? 1: 3} />
                  </Form.Group>
                }
                <Form.Group>
                  <Form.Field width={updateEvent ? 1: 3} />
                  <Form.Field width={updateEvent ? 3 : 2}> <label>End Time:</label> </Form.Field>
                  <Form.Field width={ updateEvent ? 5 : 4}>
                    <input
                      id='endDate'
                      value={endDate}
                      type="date"
                      onChange={this.handleDateChange}
                    />
                  </Form.Field>
                  <Form.Field width={ updateEvent ? 5 : 4}>
                    <input
                      id='endTime'
                      value={endTime}
                      type="time"
                      onChange={this.handleDateChange}
                    />
                  </Form.Field>

                  <Form.Field width={updateEvent ? 1: 3} />
                </Form.Group>

                { ifBadEndTime &&
                  <Form.Group>
                    <Form.Field width={updateEvent ? 1: 3} />
                      <Message
                        error
                        content='Event end time cannot be before or the same as start time.'
                      />
                    <Form.Field width={updateEvent ? 1: 3} />
                  </Form.Group>
                }

                { !updateEvent &&
                  <Form.Group style={{ marginTop: '3%', marginBottom: '2%'}}>
                    <Form.Field width={updateEvent ? 1: 3} />
                    <Form.Field>
                      <EventImageDrop setImageUrlState={this.setImageUrlState}/>
                    </Form.Field>
                  </Form.Group>
                }
                <Form.Group>
                  <Form.Field width={updateEvent ? 1: 3} />
                  <Form.Field width={updateEvent ? 13: 10}>
                    <Form.TextArea
                      label="Description:"
                      id='description'
                      value={description}
                      type="text"
                      onChange={this.handleEventChange}
                    />
                  </Form.Field>
                  <Form.Field width={updateEvent ? 1: 3} />
                </Form.Group>
                <Form.Group>
                  <Form.Field width={updateEvent ? 1: 3} />
                  <Form.Field width={updateEvent ? 13: 10} style={{ textAlign: 'center'}}>
                    <Button
                      type='submit'
                      className="primBtn"
                      primary
                    >
                      Submit
                    </Button>
                  </Form.Field>
                  <Form.Field width={updateEvent ? 1: 3} />
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return { ...state.user }
}

export default connect(mapStateToProps)(EventForm);
