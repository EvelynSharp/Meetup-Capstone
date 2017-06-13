import  Business1 from '../images/Business1.jpg';
import  Business2 from '../images/Business2.jpg';
import  Business3 from '../images/Business3.jpg';
import  Food1 from '../images/Food1.jpg';
import  Food2 from '../images/Food2.jpg';
import  Food3 from '../images/Food3.jpg';
import  Music1 from '../images/Music1.jpg';
import  Music2 from '../images/Music2.jpg';
import  Music3 from '../images/Music3.jpg';
import  Other1 from '../images/Other1.jpg';
import  Other2 from '../images/Other2.jpg';
import  Other3 from '../images/Other3.jpg';
import  Science1 from '../images/Science1.jpg';
import  Science2 from '../images/Science2.jpg';
import  Science3 from '../images/Science3.jpg';
import  Sports1 from '../images/Sports1.jpg';
import  Sports2 from '../images/Sports2.jpg';
import  Sports3 from '../images/Sports3.jpg';

const imageSet={
  Business: [ Business1, Business2, Business3 ],
  Food: [ Food1, Food2, Food3 ],
  Music: [ Music1, Music2, Music3 ],
  Other: [ Other1, Other2, Other3 ],
  Science: [ Science1, Science2, Science3 ],
  Sports: [ Sports1, Sports2, Sports3 ]
}

const decideImage = (category, imageIndex) => {
  switch(category) {
    case 'Business':
      return imageSet.Business[imageIndex]
    case 'Sports & Fitness':
      return imageSet.Sports[imageIndex]
    case 'Science & Tech':
      return imageSet.Science[imageIndex]
    case 'Music & Arts':
      return imageSet.Music[imageIndex]
    case 'Food & Drink':
      return imageSet.Food[imageIndex]
    default:
      return imageSet.Other[imageIndex]
  }
}

export const randomImageSelection = (category) => {
  let imageIndex = Math.floor((Math.random()*3));
  return decideImage(category, imageIndex);
}

// above for random image selection

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


export const eventArrayUpdate = ( updateContents, eventId, actionType ) => {
  return(dispatch) => {
    fetch(`/api/events/${eventId}`, {
      method: 'PUT',
      headers:{
        'ACCEPT': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ updateContents, actionType })
    }).then( res => res.json() )
      .then( updatedEvent => dispatch({ type: 'UPDATE_EVENT', updatedEvent }))
  }
}


export const deleteEvent = (id) => {
  return(dispatch) => {
    fetch(`/api/events/${id}`, {
      method: 'DELETE'
    }).then( () => dispatch({ type: 'DELETE_EVENT', id}))
  }
}

// export const addAttendee = ( attendeeId, eventId ) => {
//   return(dispatch) => {
//     fetch(`/api/events/${eventId}`, {
//       method: 'PUT',
//       headers:{
//         'ACCEPT': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ attendeeId, actionType: 'ATTEND'})
//     }).then( res => res.json() )
//       .then( updatedEvent => dispatch({ type: 'UPDATE_EVENT', updatedEvent }))
//   }
// }

// export const removeAttendee = (filteredAttendees, eventId) => {
//   return(dispatch) => {
//     fetch(`/api/events/${eventId}`, {
//       method: 'PUT',
//       headers:{
//         'ACCEPT': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ filteredAttendees, actionType: 'UNATTEND'})
//     }).then( res=> res.json() )
//       .then( updatedEvent => dispatch({ type: 'UPDATE_EVENT', updatedEvent}))
//   }
// }


// export const addComment = ( commentContent, eventId ) => {
//   return(dispatch) => {
//     fetch(`/api/events/${eventId}`, {
//       method: 'PUT',
//       headers:{
//         'ACCEPT': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ commentContent, actionType: 'ADD_COMMENT'})
//     }).then( res => res.json() )
//       .then( updatedEvent => dispatch({ type: 'UPDATE_EVENT', updatedEvent }))
//   }
// }


//
// export const removeComment = (filteredComments, eventId) => {
//   return(dispatch) => {
//     fetch(`/api/events/${eventId}`, {
//       method: 'PUT',
//       headers:{
//         'ACCEPT': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ filteredComments, actionType: 'REMOVE_COMMENT'})
//     }).then( res=> res.json() )
//       .then( updatedEvent => dispatch({ type: 'UPDATE_EVENT', updatedEvent}))
//   }
// }
