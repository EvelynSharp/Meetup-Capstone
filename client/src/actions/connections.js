
export const cleanReduxUsers = () => {
  return(dispatch) => {
    dispatch({ type: 'CLEAR_ALL_USERS' })
  }
}


export const removeConnection = (curUserId, idToRemove, updatedArr, userType ) => {
  return(dispatch) => {
    fetch(`/api/connections/remove/${curUserId}`, {
      method: 'PUT',
      headers:{
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idToRemove, updatedArr, userType })
    }).then( res => res.json() )
      .then( user => {
          if(userType === 'UPDATE_CURUSER') {
            dispatch({ type: 'USER', user })
          } else if (userType === 'UPDATE_CONNECTION') {
            dispatch({ type: 'VIEW_USER', userinfo: user})
          }
      })
  }
}




export const updateConnections = (inviterId, inviteeId, userType, actionType, updatedArr) => {
  return (dispatch) => {
    fetch(`/api/connections/${inviteeId}`, {
      method: 'PUT',
      headers:{
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inviterId, userType, actionType, updatedArr })
    }).then( res => res.json() )
      .then( user => {
        if(actionType === 'SEND_INV'){
          if(userType === 'UPDATE_INVITER') {
            dispatch({ type: 'USER', user })
          } else if (userType === 'UPDATE_INVITEE') {
            dispatch({ type: 'VIEW_USER', userinfo: user})
          }
        } else {
          if(userType === 'UPDATE_INVITER') {
            dispatch({ type: 'VIEW_USER', userinfo: user })
          } else if (userType === 'UPDATE_INVITEE') {
            dispatch({ type: 'USER', user})
          }
        }

      })
      .catch( error => {
        console.log(error);
      })
  }
}

export const handleInvite = (inviter, invitee, action) => {
    let inviterId = inviter._id;
    let inviteeId = invitee._id;
    let updatedInvSent = inviter.invSent.filter( id => id !== inviteeId);
    let updatedInvRec = invitee.invReceived.filter( id => id !== inviterId);
    if ( action === 'accept') {
      updateConnections(inviterId, inviteeId, 'UPDATE_INVITER', 'ACCEPT_INV', updatedInvSent );
      updateConnections(inviterId, inviteeId, 'UPDATE_INVITEE', 'ACCEPT_INV', updatedInvRec );
    } else if ( action === 'decline') {
      updateConnections(inviterId, inviteeId, 'UPDATE_INVITER', 'DECLINE_INV', updatedInvSent );
      updateConnections(inviterId, inviteeId, 'UPDATE_INVITEE', 'DECLINE_INV', updatedInvRec );
    }

}

export const getAllUsers = () => {
  return (dispatch) => {
    fetch(`/api/connections`)
      .then( res => res.json() )
      .then( users => dispatch({ type: 'ALL_USERS', users }))
  }
}
