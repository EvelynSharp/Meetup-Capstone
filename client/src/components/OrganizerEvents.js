import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image, Header, Grid } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
//render based on if user is the organizer, and if there are other events by this organizer

class OrganizerEvents extends Component{
  state = { ifShow: false }

  componentDidMount=()=>{
    let { curEventId, curOrganizer, events } = this.props;
    let orgEvents = events.filter( event => { return event.organizer === curOrganizer && event._id !== curEventId });
    if (orgEvents.length !== 0) {
      this.setState({ ifShow: true })
    }
  }

  filterPastEvents = (events) => {
    let curUnixDate = moment(new Date()).format("X");
    let curEvents = events.filter( event => moment(`${event.endDate} ${event.endTime}`).format("X") >= curUnixDate )
    return curEvents;
  }

  findOrganizerEvents = () => {
    let { curEventId, curOrganizer, events } = this.props;
    let curEvents = this.filterPastEvents(events);
    let orgEvents = curEvents.filter( event => { return event.organizer === curOrganizer && event._id !== curEventId });
    const maxOrgEvents = 3;
    let sortedOrgEvents = orgEvents.sort((a,b) => {
      return moment(`${a.begDate} ${a.begTime}`).format("X") - moment(`${b.begDate} ${b.begTime}`).format("X");
    });
    if (sortedOrgEvents.length >= maxOrgEvents) {
      let selectedEvents = [ sortedOrgEvents[0], sortedOrgEvents[1], sortedOrgEvents[2] ];
      return this.displayOrgEvents(selectedEvents);
    } else if (sortedOrgEvents.length !== 0 ) {
      return this.displayOrgEvents(sortedOrgEvents);
    }
  }

  displayOrgEvents = ( eventsToDisp ) => {
    return eventsToDisp.map( (event, index) => {
      let timeDateDisp = moment(`${event.begDate} ${event.begTime}`).format("YYYY-MM-DD, hh:mm A");
      return (
        <Card key={index} centered>
          <Card.Content>
            <Link to={`/event/${event._id}`}>
              <Image floated="left" src={event.imageUrl} size="small" onClick={ () => window.scrollTo(0,0)}/>
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

  render() {

    return (

      <div style={{ textAlign: "center", marginTop: '5%'}}>
        { this.state.ifShow &&
          <Header>More Events From This Organizer</Header>
        }
        <Grid centered>
          <Grid.Column width={10}>
            <Card.Group itemsPerRow={1}>
              { this.findOrganizerEvents() }
            </Card.Group>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return { events: state.events }
}

export default connect(mapStateToProps)(OrganizerEvents);
