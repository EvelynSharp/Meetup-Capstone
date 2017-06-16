import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Image, Button } from 'semantic-ui-react';
import { getEvents,
         deleteEvent,
         eventArrayUpdate,
         updateEvent,
         randomImageSelection
       } from '../actions/events';
import EventForm from './EventForm';
import InviteForm from './InviteForm';
import CommentFormList from './CommentFormList';
import EventImageDrop from './EventImageDrop';

class Event extends Component {

  state={ edit: false, share: false, updateImage: false }

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
      console.log("attempting to attend");
      dispatch(eventArrayUpdate( user._id, event._id, 'ATTEND'));
    } else if (actionType === 'UNATTEND') {
      let filteredAttendees = event.attendeeIds.filter( id => id !== user._id);
      dispatch(eventArrayUpdate(filteredAttendees, event._id, 'UNATTEND'));
    }
  }

  displayAttendOption = (isOrganizer) => {
    let { attendeeIds } = this.props.event;
    let isAttendee = attendeeIds.includes(this.props.user._id);
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
    let { eventName, location, date, _id } = this.props.event;
    let username = this.props.user.username;
    let email = (username + " would like to invite you to " +
        eventName + " at " + location + " on " + date + "." +
        "\n\nClick here to view event:\nhttp://localhost:3000/event/" + _id);
    this.sendEmail(emailAddress, emailSubject, email);
  }

  sendEmailToOrganizer = () => {
    let emailSubject="re: " + this.props.event.eventName;
    let emailAddress= this.props.event.organizer;
    let email = "";
    this.sendEmail(emailAddress, emailSubject, email);
  }

  render() {
    let { eventName, organizer, date, location, description, _id, comments, imageUrl } = this.props.event;
    let { edit, share } = this.state;
    let eventToUpdate = this.props.event;
    let dateDisplay = date.slice(0, 10);
    let isOrganizer;
    if(organizer === this.props.user.username) {
      isOrganizer = true;
    } else {
      isOrganizer = false;
    }
    return(
      <div className='pageContainer'>
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
          {isOrganizer ?
            <Header as="h3">You are hosting this event</Header>
            :
            <Header as="h3">
              Hosted by:
              <span
                data-tooltip="Email the organizer"
                onClick={ this.sendEmailToOrganizer }>
                  {" " + organizer }
              </span>
            </Header>
          }
          <Header as="h4">{ dateDisplay }</Header>
          <p> { description } </p>
          <Header as="h4">{ location }</Header>
          { this.displayAttendOption(isOrganizer) }
          <div>
            { isOrganizer &&
              <span>
                <span data-tooltip="edit event">
                  <Icon className='edit link large red' onClick={ this.toggleEdit } />
                </span>
                <span data-tooltip="delete event">
                  <Icon className='remove link large blue' onClick={ () => this.handleDelete(_id) } />
                </span>
              </span>
            }
            <span data-tooltip="share event">
                <Icon className='external share link large green' onClick={ this.sendInvite } />
            </span>
          </div>
        </div>
      }
      { !edit &&
        <CommentFormList
          eventId={ _id }
          existingComments={ comments }
          user={this.props.user}
        />
      }

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
