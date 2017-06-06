import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, List} from 'semantic-ui-react';
import { getEvents } from '../actions/events';
import { Link } from 'react-router-dom';
import EventList from './EventList';


class Home extends Component {

  componentDidMount = () => {
    this.props.dispatch(getEvents());
  }

  render(){
    let { events, username } = this.props;

    return(
      <div>
        <Header as="h3">
          { username ? `Welcome ${username}` : 'Welcome please sign in' }
        </Header>
        <EventList events={events}/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { events: state.events, username: state.user.username }
}

export default connect(mapStateToProps)(Home);
