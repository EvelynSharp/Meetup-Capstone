import React from 'react';
import { Item } from 'semantic-ui-react';


const EventList = ({ events, history }) => (
  <Item.Group relaxed='very' divided>
    { displayEvents(events, history) }
  </Item.Group>
);

const displayEvents = ( events, history ) => {
  let sortedEvents = events.sort((a,b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return sortedEvents.map( (event, index) => {
    return(
        <Item
          key={index}
          className="listItem"
          onClick={() => history.push(`/event/${event._id}`)}
        >
          <Item.Image size='small' src={event.imageUrl} />
          <Item.Content>
            <Item.Meta>{ event.date }</Item.Meta>
            <Item.Header> { event.eventName } </Item.Header>
            <Item.Description>{ event.location }</Item.Description>
            <Item.Extra> {`#${ event.category }`}</Item.Extra>
          </Item.Content>
        </Item>
    )
  })
}

export default EventList;
