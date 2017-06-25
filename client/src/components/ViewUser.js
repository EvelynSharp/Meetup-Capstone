import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';
import { updateConnections } from '../actions/connections';
import { Header, Grid, Image, Button, Icon  } from 'semantic-ui-react';
import EventList from './EventList';
import moment from 'moment';

class ViewUser extends Component {

  componentWillMount() {
    if (this.props.user._id === this.props.match.params.id ) {
      this.props.history.push('/dashboard');
    }
  }

  componentDidMount() {
    this.props.dispatch(getUserInfo(this.props.match.params.id));

  }

  filterUserEvents = () => {
    let { events } = this.props;
    let { _id } = this.props.userinfo;
    let userEvents =[];
    for ( let i = 0; i < events.length; i++ ) {
      let event = events[i];
      let attendeeList = event.attendeeIds;
      let attIdList = attendeeList.map( att => { return att.id });
      if ( attIdList.includes(_id) ) {
        userEvents.push(event);
      }
    }
    return userEvents;
  }

  findUserEvents = (username, listType) => {
    let allUserEvents = this.filterUserEvents();
    let curEvents = allUserEvents.filter( e => moment(`${e.endDate} ${e.endTime}`).format("X") > moment( new Date() ).format("X"));
    let pastEvents = allUserEvents.filter( e => moment(`${e.endDate} ${e.endTime}`).format("X") <= moment( new Date() ).format("X"));
    if (listType === 'current') {
      if(curEvents.length === 0) {
        return <div style={{ textAlign: "center" }}>This user does not have any future events</div>
      } else {
        return <EventList events={curEvents} history={this.props.history} />
      }
    } else if (listType === 'past') {
      if (pastEvents.length === 0) {
        return <div style={{ textAlign: "center" }}>This user does not have any past events</div>
      } else {
        return <EventList events={pastEvents} history={this.props.history} />
      }

    }
  }

  inviteConnect = () => {
    let { dispatch } = this.props;
    dispatch(updateConnections(this.props.user._id, this.props.userinfo._id, 'UPDATE_INVITER', 'SEND_INV'));
    dispatch(updateConnections(this.props.user._id, this.props.userinfo._id, 'UPDATE_INVITEE', 'SEND_INV'));
  }

  displayFriendStatus = () => {
    let { userinfo, user } = this.props;
    if ( user.friendList.includes( userinfo._id ) ) {
      return <Button className="connectedBtn">Connected</Button>
    } else if ( user.invReceived.includes( userinfo._id ) ) {
      return (
        <div>
          <Button onClick={ () => this.handleInv(userinfo, 'accept') }>Accept</Button>
          <Button onClick={ () => this.handleInv(userinfo, 'decline')}>Decline</Button>
        </div>
      )
    } else if ( user.invSent.includes( userinfo._id ) ) {
      return (
        <Button className="pendingBtn">
          <Icon name="check circle outline" />
          Pending
        </Button>
      )
    } else {
      return <Button className="primBtn" primary onClick={this.inviteConnect}>Connect</Button>
    }
  }


  handleInv = (inviter, action) => {
    let inviterId = inviter._id;
    let inviteeId = this.props.user._id;
    let updatedInvSent = inviter.invSent.filter( id => id !== inviteeId);
    let updatedInvRec = this.props.user.invReceived.filter( id => id !== inviterId)
    let { dispatch } = this.props;
    if ( action === 'accept') {
      dispatch(updateConnections(inviterId, inviteeId, 'UPDATE_INVITER', 'ACCEPT_INV', updatedInvSent ));
      dispatch(updateConnections(inviterId, inviteeId, 'UPDATE_INVITEE', 'ACCEPT_INV', updatedInvRec ));
    } else if ( action === 'decline') {
      dispatch(updateConnections(inviterId, inviteeId, 'UPDATE_INVITER', 'DECLINE_INV', updatedInvSent ));
      dispatch(updateConnections(inviterId, inviteeId, 'UPDATE_INVITEE', 'DECLINE_INV', updatedInvRec ));
    }

  }

  render() {
    let { _id, nickName, username, avatarUrl, profileImage, userBio } = this.props.userinfo;
    let { invSent } = this.props.user;
    // let ifInvited = false;
    // if (_id) {
    //   if ( invSent.includes( _id) ) {
    //     ifInvited = true
    //   }
    // }
    return (
      <Grid>
        <Grid.Column computer={16} mobile={16} tablet={16} textAlign="center">
          <Image src={profileImage === '' ? avatarUrl : profileImage} shape="rounded" centered className='otherUserPro profileImage' />
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16} textAlign="center">
          <Header>{ nickName }</Header>
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16} textAlign="center">
          { this.displayFriendStatus() }
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16} textAlign="center">
          <p>{ userBio } </p>
        </Grid.Column>
        <Grid.Row></Grid.Row>
        <Grid.Row centered>
          <Grid.Column computer={6} mobile={16} tablet={16} textAlign="center">
            <Header>LIVE EVENTS</Header>
          </Grid.Column>
          <Grid.Column computer={6} mobile={16} tablet={16} textAlign="center">
            <Header>PAST EVENTS</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column computer={6} mobile={16} tablet={16} textAlign="center" >
            { this.findUserEvents(username, 'current')}
          </Grid.Column>
          <Grid.Column computer={6} mobile={16} tablet={16} textAlign="center" >
            { this.findUserEvents(username, 'past')}
          </Grid.Column>
          </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { userinfo: state.viewuser, events: state.events, user: state.user }
}

export default connect(mapStateToProps)(ViewUser);
