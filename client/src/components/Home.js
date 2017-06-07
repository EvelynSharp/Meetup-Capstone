import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Dropdown } from 'semantic-ui-react';
import { getEvents } from '../actions/events';
import EventCards from './EventCards';
import { categoryOptions } from '../categoryOptions';

//<EventList events={events}/>
class Home extends Component {

  state = { filter: '' }

  componentDidMount = () => {
    this.props.dispatch(getEvents());
  }


  render(){
    let { events, username } = this.props;
    let { filter } = this.state;
    let filteredEvents = filter === '' ? events : events.filter( e => e.category === filter );
    let sortedEvents = filteredEvents.sort((a,b) => {
      return new Date(a.date) - new Date(b.date);
    });
    return(
      <div>
        <Header as="h3">
          { username ? `Welcome ${username}` : 'Welcome please sign in' }
        </Header>
        <Dropdown
          id='ddFilter'
          selection
          options={categoryOptions}
          onChange={(e, data) => this.setState({filter: data.value}) }
        />
        <EventCards events={sortedEvents} history={this.props.history} />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { events: state.events, username: state.user.username }
}

export default connect(mapStateToProps)(Home);
