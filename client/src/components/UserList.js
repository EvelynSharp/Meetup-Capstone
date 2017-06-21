import React, { Component } from 'react';
import { Item, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getAllUsers, updateConnections, handleInvite } from '../actions/connections';


class UserList extends Component {

  componentDidMount = () => {
    this.props.dispatch(getAllUsers())
  }

  displayFriendList = ( users ) => {
    let { history } = this.props;
    return users.map( (user, index) => {
      return (
        <Item
          key={index}
          className="listItem"
        >
          <Item.Image onClick={() => history.push(`/viewuser/${user._id}`)} size='tiny' src={user.avatarUrl} />
          <Item.Content>
            <Item.Header onClick={() => history.push(`/viewuser/${user._id}`)}> { user.nickName } </Item.Header>
            <Item.Meta>{ user.username }</Item.Meta>
            <Item.Description>{ user.userBio }</Item.Description>
          </Item.Content>
        </Item>
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
          </Item.Content>
          <Item.Content>
            <Button onClick={ () => this.handleInv(user, 'accept') }>Accept</Button>
            <Button onClick={ () => this.handleInv(user, 'decline') }>Decline</Button>
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
        <Item.Group relaxed='very' divided>
          { this.findUserInfo( invReceived, "Invites" )}
        </Item.Group>
        <Item.Group relaxed='very' divided>
          { this.findUserInfo(  friendList, "Friends" )}
        </Item.Group>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return { users: state.allusers, user: state.user}
}

export default connect(mapStateToProps)(UserList);
