import React from 'react';
import { Link } from 'react-router-dom';
import { List} from 'semantic-ui-react';



const EventList = ({ events }) => (
  <List selection verticalAlign='middle'>
    { displayEvents(events) }
  </List>
);

const displayEvents = ( events ) => {
  return events.map( (event, index) => {
    return(
      <List.Item key={index} >
        <List.Content>
          <List.Header>
            <Link to={`/event/${event._id}`}>
              { event.eventName }
            </Link>
          </List.Header>
        </List.Content>
      </List.Item>
    )
  })
}

export default EventList;
