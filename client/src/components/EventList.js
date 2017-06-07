import React from 'react';
import { Link } from 'react-router-dom';
import { List} from 'semantic-ui-react';



const EventList = ({ events }) => (
  <List selection verticalAlign='middle'>
    { displayEvents(events) }
  </List>
);

const displayEvents = ( events ) => {
  let sortedEvents = events.sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return sortedEvents.map( (event, index) => {
    return(
      <List.Item key={index} className="listItem">
          <List.Content>
            <List.Header>
              <Link className='eventListHeader' to={`/event/${event._id}`}>
                { event.eventName }
              </Link>
            </List.Header>
            { event.date }
            <br />
            { event.location }
          </List.Content>
      </List.Item>
    )
  })
}

export default EventList;
