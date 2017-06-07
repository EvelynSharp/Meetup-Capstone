import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { getEvents } from '../actions/events';
import EventCards from './EventCards';

//<EventList events={events}/>
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
        <EventCards events={events} history={this.props.history} />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { events: state.events, username: state.user.username }
}

export default connect(mapStateToProps)(Home);
