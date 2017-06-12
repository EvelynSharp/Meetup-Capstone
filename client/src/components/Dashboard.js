import React, { Component } from 'react';
import { Header, Grid, Menu, Segment, Image, Button  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';
import { removeUserImage } from '../actions/user';
import EventList from './EventList';
import ImageDropzone from './ImageDropzone';

class Dashboard extends Component {

  state={ activeItem: 'Account Details', updateImage: false }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount = () => {
    this.props.dispatch(getEvents());
  }

  setUpdateImage = () => {
    this.setState({ updateImage: true });
  }

  resetUpdateImage = () => {
    this.setState({ updateImage: false });
  }

  deleteProfileImage =() => {
    this.props.dispatch(removeUserImage(this.props.user._id));

  }


  displayDashbord = () => {
    let { activeItem, updateImage } = this.state;
    let { username, _id, role, profileImage } = this.props.user;
    let { events, history } = this.props;
    let profileImageDisplay;
    if(profileImage === '' || updateImage ) {
      profileImageDisplay = (
        <ImageDropzone resetUpdateImage={this.resetUpdateImage} userid={_id}/>
      )
    } else {
      profileImageDisplay = (
        <div>
          <Image src={profileImage} />
          <Button className="primBtn" onClick={this.setUpdateImage} primary>Update Photo</Button>
          <Button onClick={this.deleteProfileImage} secondary>Delete Photo</Button>
        </div>
      )
    }
    if(activeItem === 'Account Details') {
      return (
        <div>
          { profileImageDisplay }
          <Header as="h2">{username}</Header>
          <Header as="h3">{_id}</Header>
          <Header as="h3">{role}</Header>
        </div>
      )
    } else if (activeItem === 'My Events') {
      let userEvents = events.filter( event => event.attendeeIds.includes(_id));
      return (
        <div>
            <EventList events={userEvents} history={history}/>
        </div>
      )
    }
  }

  render() {

    let { activeItem } = this.state;
    return(
      <Grid className='pageContainer'>
        <Grid.Column width={4}>
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

        <Grid.Column  width={12}>
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
