import React, { Component } from 'react';
import { Header, Grid, Menu, Segment, Image, Button, Form, Icon, Popup  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';
import { removeUserImage, updateUserBio } from '../actions/user';
import EventList from './EventList';
import ImageDropzone from './ImageDropzone';
import UserProfile from './UserProfile';
import UserList from './UserList';
import moment from 'moment';

class Dashboard extends Component {

  state={ activeItem: 'Account Details', updateImage: false, bioEdit: false, userBio: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount = () => {
    this.props.dispatch(getEvents());
    this.setState({ userBio: this.props.user.userBio })
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

  toggleBioEdit = () => {
    this.setState({ bioEdit: !this.state.bioEdit })
  }

  handleBioUpdate =(e) => {
    e.preventDefault();
    let { dispatch } = this.props;
    if(this.state.bioEdit){
      dispatch(updateUserBio(this.props.user._id, this.state.userBio))
    }
    this.toggleBioEdit();
  }

  filterUserEvents = () => {
    let { events } = this.props;
    let { _id } = this.props.user;
    let userEvents =[];
    for ( let i = 0; i < events.length; i++ ) {
      let event = events[i];
      let attendeeList = event.attendeeIds;
      let attIdList = attendeeList.map( att => { return att.id });
      if ( attIdList.includes(_id) ) {
        userEvents.push(event);
      }
    }
    return userEvents;
  }

  displayDashbord = () => {
    let { activeItem, updateImage, bioEdit } = this.state;
    let {  _id, username, profileImage, friendList, invReceived } = this.props.user;
    let { events, history } = this.props;
    let profileImageDisplay;
    if(profileImage === '' || updateImage ) {
      profileImageDisplay = (
        <Grid.Column computer={8} mobile={16} tablet={16}>
          <ImageDropzone resetUpdateImage={this.resetUpdateImage} userid={_id} profileImage={profileImage}/>
        </Grid.Column>
      )
    } else {
      profileImageDisplay = (
        <Grid.Column computer={8} mobile={16} tablet={16} textAlign="center">
          <Image src={profileImage} shape="rounded" centered className='imagedrop profileImage' />
          <Button className="primBtn" onClick={this.setUpdateImage} primary>Update Photo</Button>
          <Button onClick={this.deleteProfileImage} secondary>Delete Photo</Button>
        </Grid.Column>
      )
    }
    if(activeItem === 'Account Details') {
      return (
        <Grid columns={16}>
          <Grid.Row>
              { profileImageDisplay }
            <Grid.Column computer={8} mobile={16} tablet={16}>
              <UserProfile />
            </Grid.Column>
          </Grid.Row>
            <Grid.Column width={1}/>
            <Grid.Column computer={15} mobile={16} tablet={16}>
              <Form onSubmit={ this.handleBioUpdate }>
                <Form.Field >
                  <label style={{ marginLeft: '2%'}}>Bio</label>
                  <textarea
                      rows="3"
                      className={ bioEdit ? "userProEdit" : "userProDisp" }
                      id="userBio"
                      value={this.state.userBio}
                      onChange={ bioEdit ?
                                    (e) => { this.setState({ userBio: e.target.value }) }
                                  :
                                    null
                                }
                  />
                </Form.Field>
                { bioEdit ?
                    <Button className="primBtn" primary>Update</Button>
                  :
                    <Menu secondary>
                      <Menu.Menu position="right">
                        <Menu.Item as='a'>
                        <Popup
                          trigger={ <Icon className="edit blue large" onClick={this.handleBioUpdate}/>}
                          content="Click to edit bio."
                          basic
                        />
                        </Menu.Item>
                      </Menu.Menu>
                    </Menu>

                }

              </Form>
            </Grid.Column>
          <Grid.Row>
          </Grid.Row>
        </Grid>
      )
    } else if (activeItem === 'My Events') {
      // let userEvents = events.filter( event =>  {
      //   event.attendeeIds.filter( att => {
      //     att.id === _id
      //   })
      // } ) ;

      let userEvents = this.filterUserEvents();
      let curUserEvents = this.filterPastEvents(userEvents);
      return (
        <div >
        { curUserEvents.length !== 0 ?
            <div className="dashboardDisp">
              <EventList events={curUserEvents} history={history}/>
            </div>
          :
            <div className="dashboardDisp">
              <p className='modalText'>You have not yet signed up for any events</p>
              <Button className="primBtn" primary onClick={ () => history.push('/')} >Browse Events</Button>
              <Button secondary onClick={ () => history.push('/newevent')}>Create An Event</Button>
            </div>
        }
        </div>
      )
    } else if (activeItem === 'Attended Events') {
      let userEvents = this.filterUserEvents();
      let pastUserEvents = this.getPastEvents(userEvents);
      return (
        <div>
        { pastUserEvents.length !== 0 ?
            <div className="dashboardDisp">
              <EventList events={pastUserEvents} history={history}/>
            </div>
          :
            <div className="dashboardDisp">
              <p className='modalText'>You have not yet attended any events</p>
              <Button className="primBtn" primary onClick={ () => history.push('/')} >Browse Events</Button>
              <Button secondary onClick={ () => history.push('/newevent')}>Create An Event</Button>
            </div>
        }
        </div>
      )
    } else if (activeItem === 'Connections') {
      return (
        <UserList history={history} dispFor="dashboard"/>
      )
    }
  }

  filterPastEvents = (events) => {
    let curUnixDate = moment(new Date()).format("X");
    let curEvents = events.filter( event => moment(`${event.endDate} ${event.endTime}`).format("X") >= curUnixDate )
    return curEvents;
  }

  getPastEvents = (events) => {
    let curUnixDate = moment(new Date()).format("X");
    let pastEvents = events.filter( event => moment(`${event.endDate} ${event.endTime}`).format("X") <= curUnixDate )
    return pastEvents;
  }


  render() {

    let { activeItem } = this.state;
    return(
      <div className="generalBGContainer">
        <div className="bgOverlay">
          <div className="mainContentContainer" >
            <Grid className='pageContainer'>
              <Grid.Column width={4}>
                <Header as="h3" style={{ marginLeft: '1em'}}>MY ACCOUNT</Header>
                <Menu fluid vertical tabular style={{ marginLeft: '1em'}}>
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
                  <Menu.Item
                    name='Attended Events'
                    active={ activeItem === 'Attended Events' }
                    onClick={ this.handleItemClick }
                  />
                  <Menu.Item
                    name='Connections'
                    active={ activeItem === 'Connections' }
                    onClick={ this.handleItemClick }
                  />
                </Menu>
              </Grid.Column>

              <Grid.Column  width={12}>
                <Segment className="dashboardCont" style={{ minHeight: '600px'}}>
                  { this.displayDashbord() }
                </Segment>
              </Grid.Column>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, user: state.user }
}

export default connect(mapStateToProps)(Dashboard);
