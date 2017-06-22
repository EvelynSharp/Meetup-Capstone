import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Image, Item, Button, Grid } from 'semantic-ui-react';
import { getEvents,
         deleteEvent,
         eventArrayUpdate,
         updateEvent,
         randomImageSelection
       } from '../actions/events';
import EventForm from './EventForm';
import CommentFormList from './CommentFormList';
import EventImageDrop from './EventImageDrop';
import OrganizerEvents from './OrganizerEvents';
import moment from 'moment';

class Event extends Component {

  state={ edit: false, updateImage: false }

  componentDidMount = () => {
    this.refreshEvents();
  }

  refreshEvents = () => {
    this.props.dispatch(getEvents());
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  }

  handleDelete = (_id) => {
    let { dispatch, history } = this.props;
    dispatch(deleteEvent(_id));
    history.push('/');
  }

  toggleAttendance = (actionType) => {
    let { dispatch, user, event } = this.props;
    if(actionType === 'ATTEND') {
      dispatch(eventArrayUpdate( user.username, event._id, 'ATTEND'));
    } else if (actionType === 'UNATTEND') {
      let filteredAttendees = event.attendeeIds.filter( id => id !== user.username);
      dispatch(eventArrayUpdate(filteredAttendees, event._id, 'UNATTEND'));
    }
  }

  displayAttendOption = (isOrganizer) => {
    let { attendeeIds } = this.props.event;
    let isAttendee = attendeeIds.includes(this.props.user.username);
    if (!isOrganizer && isAttendee) {
      return (
        <div>
          <button onClick={() => this.toggleAttendance('UNATTEND')} className="ui positive active button">Attending</button>
        </div>
      )
    } else if (!isAttendee) {
      return(
        <div>
          <button onClick={() => this.toggleAttendance('ATTEND')} className="ui active button">Not Attending</button>
        </div>
      )
    }
  }

  setUpdateImage = () => {
    this.setState({ updateImage: true });
  }

  resetUpdateImage = () => {
    this.setState({ updateImage: false });
  }

  seleteEventImage = () => {
    let newEventImage = randomImageSelection(this.props.event.category);
    let newEventDetails = { ...this.props.event, imageUrl: newEventImage };
    this.props.dispatch(updateEvent(newEventDetails));
  }

  sendEmail = (emailAddress, emailSubject, email) => {
    window.open("mailto:"+emailAddress+"?subject="+emailSubject+"&Body="+email);
  }

  sendInvite = () => {
    let emailSubject="An Invitation from Eventech";
    let emailAddress="";
    let { eventName, location, begDate, _id } = this.props.event;
    let nickName = this.props.user.nickName;
    let email = (nickName + " would like to invite you to " +
        eventName + " at " + location + " on " + begDate + ". " +
        "Click here to view event: http://localhost:3000/event/" + _id);
    this.sendEmail(emailAddress, emailSubject, email);
  }

  sendEmailToOrganizer = () => {
    let emailSubject="re: " + this.props.event.eventName;
    let emailAddress= this.props.event.organizer;
    let email = "";
    this.sendEmail(emailAddress, emailSubject, email);
  }

  contactAttendees = () => {
    let emailSubject="re: " + this.props.event.eventName;
    let attendees = this.props.event.attendeeIds;
    let emailAddress=attendees[1];
    for(let i = 2; i < attendees.length; i++)
      emailAddress+=","+attendees[i];
    let email="";
    this.sendEmail(emailAddress, emailSubject, email);
  }

  displayEdit = () => {
    let { endDate, endTime } = this.props.event;
    if( moment(`${endDate} ${endTime}`).format("X") <= moment( new Date() ).format("X")) {
      return <Icon className='edit link large red' disabled />
    } else {
      return <Icon className='edit link large red' onClick={ this.toggleEdit } />
    }
  }

  displayHoster = (isOrganizer) => {
    if (isOrganizer) {
      return <Header as="h3">You are hosting this event</Header>
    } else {
      return (
        <Header as="h3">
          Hosted by:
          <span
            data-tooltip="Email the organizer"
            onClick={ this.sendEmailToOrganizer }>
              { " " + this.props.event.organizer }
          </span>
        </Header>
      )
    }
  }

  displayEventActions = ( isOrganizer ) => {
    if (isOrganizer) {
      return(
        <span>
          <span data-tooltip="edit event">
            { this.displayEdit() }
          </span>
          <span data-tooltip="contact guests">
            <Icon className='send link large purple' onClick={ this.contactAttendees } />
          </span>
          <span data-tooltip="delete event">
            <Icon className='remove link large blue' onClick={ () => this.handleDelete(this.props.event._id) } />
          </span>
        </span>
      )
    }
  }

  render() {
    let { eventName, organizer, begDate, begTime, endDate, endTime, location, description, _id, comments, imageUrl } = this.props.event;
    let edit = this.state.edit;
    let eventToUpdate = this.props.event;
//    let dateDisplay = begDate.slice(0, 10);
    let isOrganizer;
    if(organizer === this.props.user.username) {
      isOrganizer = true;
    } else {
      isOrganizer = false;
    }
    let begDateDisp = moment(`${begDate} ${begTime}`).format("YYYY-MM-DD, hh:mm A");
    let endDateDisp = moment(`${endDate} ${endTime}`).format("YYYY-MM-DD, hh:mm A");
    return(
      <div className="ui container">
        <div className='pageContainer'>
        <Grid verticalAlign="top" style={{ marginTop: '3%'}}>
          <Grid.Row>
            <Grid.Column width={6}>
              { this.state.updateImage ?
                    <EventImageDrop resetUpdateImage={this.resetUpdateImage} toUpdate={true} eventid={_id}/>
                :
                  <div>
                    <Image src={imageUrl} />
                    { isOrganizer &&
                      <div>
                        <Button className="primBtn" onClick={this.setUpdateImage} primary>Update Photo</Button>
                        <Button onClick={this.seleteEventImage} secondary>Delete</Button>
                      </div>
                    }
                  </div>
              }
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={8}>
              { edit ?
                <div>
                  <EventForm
                    eventToUpdate={eventToUpdate}
                    toggleEdit={this.toggleEdit}
                    updateEvent={true}
                  />
                </div>
                :
                <div>
                  <Header as="h1">{ eventName }</Header>
                  { this.displayHoster(isOrganizer) }
                  <Header as="h5">{`Start Time: ${begDateDisp}`}</Header>
                  { endDate !== '' && endTime !== '' ?
                      <Header as="h5">{`End Time: ${endDateDisp}`}</Header>
                    :
                      <Header as="h5">{`End Time: TBD`}</Header>
                  }
                  <Header as="h4">{ location }</Header>
                   { this.displayAttendOption(isOrganizer) }
                   { this.displayEventActions(isOrganizer) }
                    <span data-tooltip="share event">
                        <Icon className='external share link large green' onClick={ this.sendInvite } />
                    </span>
                  </div>
              }
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
             <p> { description } </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <div className="ui divider hidden" />
        { !edit &&
          <CommentFormList
            eventId={ _id }
            existingComments={ comments }
            user={this.props.user}
          />
        }

      </div>
      <div>
      { !edit && !isOrganizer &&
        <OrganizerEvents curEventId={_id} curOrganizer={organizer}/>
      }
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return { event: state.events.find( n => n._id === props.match.params.id) || {},
           user: state.user
          }
}

export default connect(mapStateToProps)(Event);
