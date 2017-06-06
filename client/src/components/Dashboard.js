import React, { Component } from 'react';
import { Header, Grid, Menu, Segment  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';
import EventList from './EventList';

class Dashboard extends Component {

  state={ activeItem: 'Account Details' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount = () => {
    this.props.dispatch(getEvents());
  }

  displayDashbord = () => {
    let { activeItem } = this.state;
    let { username, _id, role } = this.props.user;
    let { events } = this.props;
    if(activeItem === 'Account Details') {
      return (
        <div>
          <Header as="h2">{username}</Header>
          <Header as="h3">{_id}</Header>
          <Header as="h3">{role}</Header>
        </div>
      )
    } else if (activeItem === 'My Events') {
      let userEvents = events.filter( event => event.attendeeIds.includes(_id));
      return (
        <div>
            <EventList events={userEvents}/>
        </div>
      )
    }
  }

  render() {

    let { activeItem } = this.state;
    return(
      <Grid>
        <Grid.Column stretch width={4}>
          <Header as="h3">MY ACCOUNT</Header>
          <Menu fluid vertical tabular>
            <Menu.Item
              name='Account Details'
              active={ activeItem === 'Account Details' }
              onClick={ this.handleItemClick }
            />
            <Menu.Item
              name='My Events'
              active={ activeItem === 'My Events' }
              onClick={ this.handleItemClick }
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretch width={12}>
          <Segment>
            { this.displayDashbord() }
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, user: state.user }
}

export default connect(mapStateToProps)(Dashboard);
