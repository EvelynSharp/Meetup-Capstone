import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Dropdown, Button, Menu, Input } from 'semantic-ui-react';
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
        
        <Menu className='homesearch'>
          <Menu.Item className='homesearch'>
            <Input icon='search' width={4} className='searchBar'/>
            <Button primary width={3}>Search</Button>
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
