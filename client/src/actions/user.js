export const logout = () => {
  return(dispatch) => {
    fetch('/api/auth/sign_out', {
      method: 'DELETE',
      credentials: 'include',
     }).then( () => dispatch(currentUser()) )
  }
}

export const removeUserImage = (userid) => {
  return(dispatch) => {
    fetch(`/api/cloudinarys/${userid}`, {
      method: 'PUT',
      headers:{
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ profileImage: ''})
    }).then( res => res.json() )
      .then( updatedUser => dispatch(currentUser(updatedUser)));
  }
}

export const currentUser = (user = {}) => {
  return { type: 'USER', user }
}

export const authenticate = (email, password, avatarUrl, title, history) => {
  return (dispatch) => {
    let endpoint = title === 'Register' ? 'signup' : 'signin';
    fetch(`/api/auth/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ email, password, avatarUrl })
   }).then( res => res.json() )
     .then( user => {
        if(user.username) {
          dispatch(currentUser(user));
          history.push('/dashboard');
        } else {
          if(endpoint==="signup"){
            dispatch({ type: 'USER_ERROR', userError: 'dupedUser' });
          } else {
            dispatch({ type: 'USER_ERROR', userError: 'wrongPW' });
          }
        }
      }
    )
  }}

export const tryFetchUser = (cb) => {
  return (dispatch) => {
    fetch('/api/auth/user', {
      method: 'GET',
      credentials: 'include'
    }).then( res => res.json() )
      .then( user => dispatch(currentUser(user)) )
      .then( () => cb() )
  }
}
