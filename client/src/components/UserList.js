import React, { Component } from 'react';
import { Item, Button, List, Image, Icon, Grid, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAllUsers,
         updateConnections,
         handleInvite,
         removeConnection,
         cleanReduxUsers
       } from '../actions/connections';


class UserList extends Component {

  componentWillUnmount = () => {
    this.props.dispatch(cleanReduxUsers());
  }

  componentDidMount = () => {
    this.props.dispatch(getAllUsers());
  }

//curUserId, idToRemove, curUserFriends, removeIdFriends, userType
  deleteConnection = (userToRemove) => {
   let { dispatch, user } = this.props;
   let curUserId = user._id;
   let idToRemove = userToRemove._id;
   let curUserFriends = user.friendList.filter( id => id !== idToRemove );
   let removeIdFriends = userToRemove.friendList.filter( id => id !== curUserId );
   dispatch(removeConnection(curUserId, idToRemove, curUserFriends, 'UPDATE_CURUSER'));
   dispatch(removeConnection(curUserId, idToRemove, removeIdFriends, 'UPDATE_CONNECTION'));
  }

  displayFriendList = ( users ) => {
    let { history } = this.props;
    return users.map( (user, index) => {
      return (
        <List.Item
          key={index}
          className="listItem"
        >
          <Image
            avatar
            onClick={() => history.push(`/viewuser/${user._id}`)}
            src={ user.profileImage === '' ? user.avatarUrl : user.profileImage }
          />
          <List.Content>
            <List.Header onClick={() => history.push(`/viewuser/${user._id}`)}> { user.nickName } </List.Header>
            <List.Description>{ user.userBio }</List.Description>
          </List.Content>
          <List.Content floated="right">
            <div className="removeIcon" onClick={ () => this.deleteConnection(user) }>Delete</div>
          </List.Content>
        </List.Item>
      )
    })
  }

  displayInvList = (users) => {
    let { history, dispatch } = this.props;
    return users.map( (user, index) => {
      return (
        <Item
          key={index}
          className="listItem"
        >
          <Item.Image onClick={() => history.push(`/viewuser/${user._id}`)} size='tiny' src={user.avatarUrl} />
          <Item.Content>
            <Item.Header onClick={() => history.push(`/viewuser/${user._id}`)}> { user.nickName } </Item.Header>
            <Item.Description>{ user.userBio }</Item.Description>
            <Item.Extra>
              <Button className="acceptBtn" onClick={ () => this.handleInv(user, 'accept') }>Accept</Button>
              <Button className="deleteBtn" onClick={ () => this.handleInv(user, 'decline') }>Decline</Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      )
    })
  }


  findUserInfo = ( arrToFilterBy, actionType) => {
    let filteredUsers = this.props.users.filter( user => arrToFilterBy.includes(user._id));
    if (actionType === 'Invites') {
      return this.displayInvList(filteredUsers);
    } else if (actionType === 'Friends') {
      return this.displayFriendList(filteredUsers)
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



  render(){
    let { history } = this.props;
    let { friendList, invReceived } = this.props.user;
    return(
      <div>
        { friendList.length === 0 && invReceived.length === 0 &&
          <div className="dashboardDisp">
            <p className='modalText'>Make some new connections through Eventech!</p>
            <Button className="primBtn" primary onClick={ () => history.push('/')} >Browse Events</Button>
            <Button secondary onClick={ () => history.push('/newevent')}>Create An Event</Button>
          </div>
        }
        <Grid>
          { invReceived.length !== 0 &&
            <Grid.Row className="dashboardDisp">
              <div>
                <Header>Pending Connection Request</Header>
                <Divider  />
              </div>
            </Grid.Row>
          }
          <Grid.Row style={{ marginLeft: '10%' }}>
            <Grid.Column width={10}>
              <Item.Group relaxed='very' divided>
                { this.findUserInfo( invReceived, "Invites" )}
              </Item.Group>
            </Grid.Column>
          </Grid.Row>
          { friendList.length !== 0 &&
            <Grid.Row className="dashboardDisp">
              <div>
                <Header>Your Connections</Header>
                <Divider  />
              </div>
            </Grid.Row>
          }
          <Grid.Row style={{ marginLeft: '10%' }}>
            <Grid.Column width={10}>
              <List relaxed='very' selection divided verticalAlign='middle'>
                { this.findUserInfo(  friendList, "Friends" )}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return { users: state.allusers, user: state.user}
}

export default connect(mapStateToProps)(UserList);
