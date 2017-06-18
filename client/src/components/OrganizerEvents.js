import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image, Header, Grid } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
//render based on if user is the organizer, and if there are other events by this organizer

const OrganizerEvents = ({ curEventId, curOrganizer, events }) => (
  <div style={{ textAlign: "center"}}>
    <Header>More Events From This Organizer</Header>
    <Grid centered>
      <Grid.Column width={10}>
        <Card.Group itemsPerRow={1}>
          { findOrganizerEvents(curEventId, curOrganizer, events) }
        </Card.Group>
      </Grid.Column>
    </Grid>
  </div>
)

const findOrganizerEvents = ( curEventId, curOrganizer, events) => {
  let orgEvents = events.filter( event => { return event.organizer === curOrganizer && event._id !== curEventId });
  const maxOrgEvents = 3;
  let sortedOrgEvents = orgEvents.sort((a,b) => {
    return moment(`${a.begDate} ${a.begTime}`).format("X") - moment(`${b.begDate} ${b.begTime}`).format("X");
  });
  if (sortedOrgEvents.length >= maxOrgEvents) {
    let selectedEvents = [ sortedOrgEvents[0], sortedOrgEvents[1], sortedOrgEvents[2] ];
    return displayOrgEvents(selectedEvents);
  } else if (sortedOrgEvents.length !== 0 ) {
    return displayOrgEvents(sortedOrgEvents);
  }
}

const displayOrgEvents = ( eventsToDisp ) => {
  return eventsToDisp.map( (event, index) => {
    let timeDateDisp = moment(`${event.begDate} ${event.begTime}`).format("YYYY-MM-DD, hh:mm A");
    return (
      <Card key={index} centered>

        <Card.Content>
          <Link to={`/event/${event._id}`}>
            <Image floated="left" src={event.imageUrl} size="small"/>
          </Link>
          <Card.Header>
            <Link className='eventListHeader' to={`/event/${event._id}`}>
              { event.eventName }
            </Link>
          </Card.Header>
          <Card.Meta> { timeDateDisp } </Card.Meta>
          <Card.Description> {`Location: ${event.location}`} </Card.Description>
        </Card.Content>
        <Card.Content></Card.Content>
      </Card>
    )
  })
}


const mapStateToProps = (state) => {
  return { events: state.events }
}

export default connect(mapStateToProps)(OrganizerEvents);
