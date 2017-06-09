import React from 'react';
import { List} from 'semantic-ui-react';


const EventList = ({ events, history }) => (
  <List selection verticalAlign='middle'>
    { displayEvents(events, history) }
  </List>
);

const displayEvents = ( events, history ) => {
  let sortedEvents = events.sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return sortedEvents.map( (event, index) => {
    return(
      <List.Item
        key={index}
        className="listItem"
        onClick={() => history.push(`/event/${event._id}`)}
      >
          <List.Content>
            <List.Header>
              { event.eventName }
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
