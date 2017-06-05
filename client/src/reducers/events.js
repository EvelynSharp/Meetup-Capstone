const events = (state=[], action) => {
  switch(action.type) {
    case 'GET_EVENTS':
      if(action.events)
        return action.events
      return []
    case 'ADD_EVENT':
      return [ action.newEvent, ...state ]
    case 'UPDATE_EVENT':
      return state.map( event => {
        if(event._id === action.updatedEvent._id)
          return action.updatedEvent
        return event;
      })
    case 'DELETE_EVENT':
      return state.filter( e => e._id !== action.id)
    default:
      return state;
  }
}

export default events;
