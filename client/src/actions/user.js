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
    fetch(`/api/cloudinarys/user/${userid}`, {
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

export const authenticateNew = (nickName, birthDate, phoneNumber, address, gender, email, password, avatarUrl, title, history) => {
  return (dispatch) => {
    fetch(`/api/auth/signup`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ nickName,
                             birthDate,
                             phoneNumber,
                             address,
                             gender,
                             email,
                             password,
                             avatarUrl })
   }).then( res => res.json() )
     .then( user => {
        if(user.username) {
          dispatch(currentUser(user));
          history.push('/dashboard');
        } else {
            dispatch({ type: 'USER_ERROR', userError: 'dupedUser' });
        }
      }
    )
  }}

  export const authenticateLogin = (email, password, history) => {
    return (dispatch) => {
      fetch(`/api/auth/signin`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ email, password })
     }).then( res => res.json() )
       .then( user => {
          if(user.username) {
            dispatch(currentUser(user));
            history.push('/dashboard');
          } else {

              if (user === 'User not found'){
                dispatch({ type: 'USER_ERROR', userError: 'NotAUser' });
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
