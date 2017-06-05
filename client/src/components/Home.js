import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, List} from 'semantic-ui-react';
import { getEvents } from '../actions/events';
import { Link } from 'react-router-dom';


class Home extends Component {

  componentDidMount = () => {
    this.props.dispatch(getEvents());
  }

  displayEvents = (events) => {
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

  render(){
    let { events, username } = this.props;

    return(
      <div>
        <Header as="h3">
          { username ? `Welcome ${username}` : 'Welcome please sign in' }
        </Header>
        <List selection verticalAlign='middle'>
          { this.displayEvents(events) }
        </List>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { events: state.events, username: state.user.username }
}

export default connect(mapStateToProps)(Home);
