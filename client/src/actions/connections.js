export const updateConnections = (inviterId, inviteeId, userType, actionType, updatedArr) => {
  return(dispatch) => {
    fetch(`/api/connections/${inviteeId}`, {
      method: 'PUT',
      headers:{
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inviterId, userType, actionType, updatedArr })
    }).then( res => res.json() )
      .then( user => {
        if(userType === 'UPDATE_INVITER') {
          dispatch({ type: 'USER', user })
        } else if (userType === 'UPDATE_INVITEE') {
          dispatch({ type: 'VIEW_USER', userinfo: user})
        }
      })
  }
}


export const getAllUsers = () => {
  return (dispatch) => {
    fetch(`/api/connections`)
      .then( res => res.json() )
      .then( users => dispatch({ type: 'ALL_USERS', users }))
  }
}
