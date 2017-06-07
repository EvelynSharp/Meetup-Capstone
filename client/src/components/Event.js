import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon } from 'semantic-ui-react';
import { getEvents, deleteEvent, addAttendee, removeAttendee } from '../actions/events';
import EventForm from './EventForm';
import InviteForm from './InviteForm';

class Event extends Component {

  state={ edit: false, share: false }

  componentDidMount = () => {
    this.refreshEvents();
  }

  refreshEvents = () => {
    this.props.dispatch(getEvents());
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  }

  shareEvent = () => {
    this.setState({ share: !this.state.share });
  }

  handleDelete = (_id) => {
    let { dispatch, history } = this.props;
    dispatch(deleteEvent(_id));
    history.push('/');
  }

  toggleAttendance = (actionType) => {
    let { dispatch, user, event } = this.props;
    if(actionType === 'ATTEND') {
      dispatch(addAttendee(user._id, event._id));
    } else if (actionType === 'UNATTEND') {
      let filteredAttendees = event.attendeeIds.filter( id => id !== user._id);
      dispatch(removeAttendee(filteredAttendees, event._id));
    }
  }

  displayAttendOption = (isOrganizer) => {
    let { attendeeIds } = this.props.event;
    let isAttendee = attendeeIds.includes(this.props.user._id);
    if(isOrganizer) {
      return(
        <button className="ui positive active button">Attending</button>
      )
    } else if (!isOrganizer && isAttendee) {
      return (
        <div>
          <button onClick={() => this.toggleAttendance('UNATTEND')} className="ui positive active button">Attending</button>
          <span>Click to Unregister</span>
        </div>
      )
    } else if (!isAttendee) {
      return(
        <div>
          <button onClick={() => this.toggleAttendance('ATTEND')} className="ui active button">Not Attending</button>
          <span>Click to Register</span>
        </div>
      )
    }
  }

  render() {
    let { eventName, organizer, date, location, description, _id } = this.props.event;
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
      <div>
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
          <Header as="h3">{ eventName }</Header>
          <Header as="h6">{ organizer }</Header>
          <Header as="h4">{ dateDisplay }</Header>
          <Header as="h4">{ location }</Header>
          <p> { description } </p>
          { this.displayAttendOption(isOrganizer) }
          <div>
            { isOrganizer &&
              <span>
              <Icon
                name='edit'
                size='large'
                onClick={ this.toggleEdit }
              />
              <Icon
                name='remove'
                size='large'
                onClick={ () => this.handleDelete(_id) }
              />
            </span>
            }
            <Icon
              name='external share'
              size='large'
              onClick={ this.shareEvent }
            />
          </div>
        </div>
      }
      { share ?
        <div>
          <InviteForm
            event={ this.props.event }
            shareEvent={ this.shareEvent }/>
        </div>
        :
        <div>
        </div>
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
