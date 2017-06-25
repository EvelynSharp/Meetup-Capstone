import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Header, Icon, Image, Item, Button, Grid, Accordion, Container } from 'semantic-ui-react';
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
import UserList from './UserList';
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
      let newAttendee = { email: user.username, id: user._id };
      dispatch(eventArrayUpdate( newAttendee, event._id, 'ATTEND'));
    } else if (actionType === 'UNATTEND') {
      let filteredAttendees = event.attendeeIds.filter( a => a.id !== user._id);
      dispatch(eventArrayUpdate(filteredAttendees, event._id, 'UNATTEND'));
    }
  }

  displayAttendOption = (isOrganizer) => {
    let { attendeeIds = [] } = this.props.event;
    let { username, _id } = this.props.user;
    let attendeeIdArr = attendeeIds.map( a => {return a.id});
    let isAttendee = attendeeIdArr.includes( _id );
    if (!isOrganizer && isAttendee) {
      return (
        <div style={{ marginBottom: '1em'}}>
          <button onClick={() => this.toggleAttendance('UNATTEND')} className="ui positive active button">Attending</button>
        </div>
      )
    } else if (!isAttendee) {
      return(
        <div style={{ marginBottom: '1em'}}>
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
    let email='';
    if (location!=='')
      email = (nickName + " would like to invite you to " +
        eventName + " at " + location + " on " + begDate + ". " +
        "Click here to view event: http://localhost:3000/event/" + _id);
    else {
      email = (nickName + " would like to invite you to " +
        eventName + " on " + begDate + ". " +
        "Click here to view event: http://localhost:3000/event/" + _id);
    }
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
    let emailAddress=attendees[1].email;
    for(let i = 2; i < attendees.length; i++)
      emailAddress+=","+attendees[i].email;
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
      return <Header as="h4" style={{ color: '#bdbdbd'}}>You are hosting this event</Header>
    } else {
      return (
        <Header as="h4" style={{ color: '#bdbdbd'}}>
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

  getAttendeeIdList = ( attendeeList = [] ) => {
    let attendeeIdList=[];
    if (attendeeList.length !== 0){
      attendeeIdList = attendeeList.map( att => { return att.id });
    }
    return attendeeIdList;
  }

  render() {
    let { eventName, organizer, begDate, begTime, endDate, endTime, location, description, attendeeIds, _id, comments, imageUrl } = this.props.event;
    let edit = this.state.edit;
    let eventToUpdate = this.props.event;
//    let dateDisplay = begDate.slice(0, 10);
//<Image src={imageUrl} centered/>
    let isOrganizer;
    if(organizer === this.props.user.username) {
      isOrganizer = true;
    } else {
      isOrganizer = false;
    }
    let begDateDisp = moment(`${begDate} ${begTime}`).format("YYYY-MM-DD, hh:mm A");
    let endDateDisp = moment(`${endDate} ${endTime}`).format("YYYY-MM-DD, hh:mm A");
    let attendeeIdList = this.getAttendeeIdList( attendeeIds );
    return(
      <div>
          <div className='eventWrap'>
          <Grid style={{ background: `url(${imageUrl})`}}>

            <Grid.Row className="eventTopGrid" style={{ marginTop: '2em', paddingBottom: '0'}}>

              <Grid.Column width={2}/>
              <Grid.Column stretched width={8} textAlign="center" style={{ padding:'0', marginRight: '0'}}>
                { this.state.updateImage ?
                      <EventImageDrop resetUpdateImage={this.resetUpdateImage} toUpdate={true} eventid={_id}/>
                  :
                    <div >
                      <div
                        className='eventBgImg'
                        style={{ backgroundImage: `url(${imageUrl})`}}
                      >
                        <div style={{ background: 'rgba(0,0,0,0.3)', zIndex: '1', height:'100%', width: '100%%'}}>
                          <h3 className="eventImgText"> { eventName }</h3>
                        </div>
                      </div>
                    </div>

                }
              </Grid.Column>
              <Grid.Column width={4} style={{ border: '1px solid #eeeeee', height: '20em', marginLeft: '0', background: '#f5f5f5'}}>
                <div style={{ marginLeft: '10%', marginRight: '10%'}}>
                <Header as="h3" style={{ color: '#424242', marginTop: '18%' }}>{ begDate ? `${begDate.slice(0, 10)}` : null}</Header>
                <Header as="h1" >{ eventName }</Header>
                { this.displayHoster(isOrganizer) }
                </div>
              </Grid.Column>
              <Grid.Column width={2}/>

            </Grid.Row>

          </Grid>
          <Grid className="eventBottomBg">
            <Grid.Row style={{ padding: '0'}}>
              <Grid.Column width={2}/>
              <Grid.Column textAlign="center" width={8} className="eventBtContent">
                <div>
                { isOrganizer &&
                  <div style={{ margin: '1.5em 2em' }}>
                    <Button className="primBtn" onClick={this.setUpdateImage} primary>Update Photo</Button>
                    <Button onClick={this.seleteEventImage} secondary>Use Stock Photo</Button>
                  </div>
                }
                </div>
              </Grid.Column>
              <Grid.Column width={4} className="eventBtContent"/>
              <Grid.Column width={2}/>
            </Grid.Row >
            <Grid.Row style={{ padding: '0'}}>
              <Grid.Column width={2}/>
              <Grid.Column width={8} className="eventBtContent" textAlign="center">
                { edit ?
                  <div style={{ marginTop: '2em'}}>
                    <EventForm
                      eventToUpdate={eventToUpdate}
                      toggleEdit={this.toggleEdit}
                      updateEvent={true}
                    />
                  </div>
                  :
                  <div style={{ marginTop: '2em'}}>


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
              <Grid.Column width={4} className="eventBtContent"/>
              <Grid.Column width={2}/>
            </Grid.Row>
            { !edit &&
              <Grid.Row style={{ padding: '0'}}>
                <Grid.Column width={2}/>
                <Grid.Column width={12} className="eventBtContent">
                  <p style={{ margin: '2em 2em'}}> { description } </p>
                </Grid.Column>
                <Grid.Column width={2}/>
              </Grid.Row>
            }
            { !edit &&
              <Grid.Row style={{ padding: '0'}}>
                <Grid.Column width={2} />
                <Grid.Column width={7} className="eventBtContent" >
                  <div style={{ margin: '0 0.2em 0 1em'}}>
                    <CommentFormList
                      eventId={ _id }
                      existingComments={ comments }
                      user={this.props.user}
                    />
                  </div>
                </Grid.Column>

                <Grid.Column width={5} className="eventBtContent">
                  <div style={{ marginRight: '1em'}}>
                    <Accordion styled style={{ marginTop: '1.6em'}}>
                      <Accordion.Title>View Attendees</Accordion.Title>
                      <Accordion.Content>
                        <UserList history={this.props.history} dispFor="events" attendeeList={attendeeIdList}/>
                      </Accordion.Content>
                    </Accordion>
                  </div>
                </Grid.Column>
                <Grid.Column width={2}/>
              </Grid.Row>
            }
            { !edit && !isOrganizer &&
              <Grid.Row style={{ padding: '0'}}>
                <Grid.Column width={2}/>
                <Grid.Column width={12} className="eventBtContent">
                  <OrganizerEvents curEventId={_id} curOrganizer={organizer}/>
                </Grid.Column>
                <Grid.Column width={2}/>
              </Grid.Row>
            }

          </Grid>
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
