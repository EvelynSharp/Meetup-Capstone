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

  findUserEvents = (username, listType) => {
    let allUserEvents = this.props.events.filter( event => event.attendeeIds.includes(username) );
    let curEvents = allUserEvents.filter( e => moment(`${e.endDate} ${e.endTime}`).format("X") > moment( new Date() ).format("X"));
    let pastEvents = allUserEvents.filter( e => moment(`${e.endDate} ${e.endTime}`).format("X") <= moment( new Date() ).format("X"));
    if (listType === 'current') {
      return <EventList events={curEvents} history={this.props.history} />
    } else if (listType === 'past') {
      return <EventList events={pastEvents} history={this.props.history} />
    }
  }

  inviteConnect = () => {
    let { dispatch } = this.props;
    dispatch(updateConnections(this.props.user._id, this.props.userinfo._id, 'UPDATE_INVITER', 'SEND_INV'));
    dispatch(updateConnections(this.props.user._id, this.props.userinfo._id, 'UPDATE_INVITEE', 'SEND_INV'));
  }


  render() {
    let { _id, nickName, username, avatarUrl, profileImage, userBio } = this.props.userinfo;
    let { invSent } = this.props.user;
    let ifInvited = false;
    if (_id) {
      if ( invSent.includes( _id) ) {
        ifInvited = true
      }
    }
    return (
      <Grid>
        <Grid.Column computer={16} mobile={16} tablet={16} textAlign="center">
          <Image src={profileImage} shape="rounded" centered className='otherUserPro profileImage' />
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16} textAlign="center">
          <Header>{ nickName }</Header>
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16} textAlign="center">
          { ifInvited ?
              <Button className="pendingBtn">
                <Icon name="check circle outline" />
                Pending
              </Button>
            :
              <Button className="primBtn" primary onClick={this.inviteConnect}>Connect</Button>

            }
        </Grid.Column>
        <Grid.Column computer={16} mobile={16} tablet={16} textAlign="center">
          <p>{ userBio } </p>
        </Grid.Column>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16} tablet={16} textAlign="center">
            <Header>LIVE EVENTS</Header>
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={16} textAlign="center">
            <Header>PAST EVENTS</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column computer={6} mobile={16} tablet={16} textAlign="center">
            { this.findUserEvents(username, 'current')}
          </Grid.Column>
          <Grid.Column computer={6} mobile={16} tablet={16} textAlign="center">
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
