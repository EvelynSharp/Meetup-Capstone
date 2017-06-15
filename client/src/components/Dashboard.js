import React, { Component } from 'react';
import { Header, Grid, Menu, Segment, Image, Button, Form, TextArea, Icon  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';
import { removeUserImage, updateUserBio } from '../actions/user';
import EventList from './EventList';
import ImageDropzone from './ImageDropzone';
import UserProfile from './UserProfile';

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

  displayDashbord = () => {
    let { activeItem, updateImage, bioEdit } = this.state;
    let {  _id, profileImage } = this.props.user;
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
            <Grid.Column computer={16} mobile={16} tablet={16}>
              <Form onSubmit={ this.handleBioUpdate }>
                <Form.Field>
                  <label>Bio</label>
                  <textarea
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
                          <Icon className="edit blue large" onClick={this.handleBioUpdate}/>
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
          <Segment className="dashboardCont">
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
