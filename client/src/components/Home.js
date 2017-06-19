import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Dropdown, Button, Menu, Input } from 'semantic-ui-react';
import { getEvents } from '../actions/events';
import EventCards from './EventCards';
import { categoryOptions } from '../categoryOptions';
import moment from 'moment';

//<EventList events={events}/>
class Home extends Component {

  state = { filter: '' }

  componentDidMount = () => {
    this.props.dispatch(getEvents());
  }

  filterPastEvents = (events) => {
    let curUnixDate = moment(new Date()).format("X");
    let curEvents = events.filter( event => moment(`${event.endDate} ${event.endTime}`).format("X") >= curUnixDate )
    return curEvents;
  }


  render(){
    let { events } = this.props;
    let { filter } = this.state;
    let currentEvents = this.filterPastEvents(events);
    let filteredEvents = filter === '' ? currentEvents : currentEvents.filter( e => e.category === filter );
    let sortedEvents = filteredEvents.sort((a,b) => {
      return moment(`${a.begDate} ${a.begTime}`).format("X") - moment(`${b.begDate} ${b.begTime}`).format("X");
    });
    return(
      <div className="ui container">

        <Menu className='homesearch'>
          <Menu.Item className='homesearch'>
            <Input icon='search' width={4} className='searchBar'/>
            <Button primary className="primBtn" width={3}>SEARCH</Button>
          </Menu.Item>
          <Menu.Item position='right' className='homesearch'>
            Filter By Category:
            <Dropdown
              id='ddFilter'
              selection
              options={categoryOptions}
              onChange={(e, data) => this.setState({filter: data.value}) }
              width={4}
            />
          </Menu.Item>
        </Menu>

        <EventCards events={sortedEvents} history={this.props.history} />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { events: state.events, username: state.user.username }
}

export default connect(mapStateToProps)(Home);
