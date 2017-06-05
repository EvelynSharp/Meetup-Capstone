
export const getEvents = () => {
  return(dispatch) => {
    fetch('/api/events')
      .then( res => res.json() )
      .then( events => dispatch({ type: 'GET_EVENTS', events}))
  }
}

export const addEvent = (eventDetails) => {
  return(dispatch) => {
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...eventDetails })
    }).then( res => res.json() )
      .then( newEvent => dispatch({ type: 'ADD_EVENT', newEvent }))
  }
}

export const updateEvent = (eventDetails) => {
  return(dispatch) => {
    fetch(`/api/events/${eventDetails._id}`, {
      method: 'PUT',
      headers:{
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...eventDetails })
    }).then( res => res.json() )
      .then( updatedEvent => {
        dispatch({ type: 'UPDATE_EVENT', updatedEvent})
      })
  }
}

export const addAttendee = ( attendeeId, eventId ) => {
  return(dispatch) => {
    fetch(`/api/events/${eventId}`, {
      method: 'PUT',
      headers:{
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ attendeeId, actionType: 'ATTEND'})
    }).then( res => res.json() )
      .then( updatedEvent => dispatch({ type: 'UPDATE_EVENT', updatedEvent }))
  }
}

export const removeAttendee = (filteredAttendees, eventId) => {
  return(dispatch) => {
    fetch(`/api/events/${eventId}`, {
      method: 'PUT',
      headers:{
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filteredAttendees, actionType: 'UNATTEND'})
    }).then( res=> res.json() )
      .then( updatedEvent => dispatch({ type: 'UPDATE_EVENT', updatedEvent}))
  }
}

export const deleteEvent = (id) => {
  return(dispatch) => {
    fetch(`/api/events/${id}`, {
      method: 'DELETE'
    }).then( () => dispatch({ type: 'DELETE_EVENT', id}))
  }
}
