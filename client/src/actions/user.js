export const logout = () => {
  return(dispatch) => {
    fetch('/api/auth/sign_out', {
      method: 'DELETE',
      credentials: 'include',
     }).then( () => dispatch(currentUser()) )
  }
}

const currentUser = (user = {}) => {
  return { type: 'USER', user }
}

export const authenticate = (email, password, title, history) => {
  return (dispatch) => {
    let endpoint = title === 'Register' ? 'signup' : 'signin';
    fetch(`/api/auth/${endpoint}`, {
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
         dispatch(currentUser(user))
         history.push('/dashboard')
       }
     })
  }
}

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
