import React, { Component } from 'react';
import {  Button, Form, Icon, Menu, Popup  } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateUserInfo } from '../actions/user';

class UserProfile extends Component {

  state = { profileEdit: false, user: {} }

  componentDidMount = () => {
    let { _id, nickName, birthDate, phoneNumber, username, address, avatarUrl } = this.props.user;
    this.setState({ user: { _id, nickName, birthDate, phoneNumber, username, address, avatarUrl } });
  }

  toggleProEdit = () => {
    this.setState({ profileEdit: !this.state.profileEdit })
  }

  handleProUpdate = (e) => {
    e.preventDefault();
    let { profileEdit, user } = this.state;
    let { _id, nickName, birthDate, phoneNumber, username, address, avatarUrl } = user;
    let { dispatch } = this.props;
    if(profileEdit) {
      dispatch(updateUserInfo(_id, nickName, birthDate, phoneNumber, username, address, avatarUrl));
    }
    this.toggleProEdit();
  }

  handleChange = (e) => {
    let { id, value } = e.target;
    this.setState({ user: { ...this.state.user, [id] : value } })
  }

  render() {
    let { profileEdit, user } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleProUpdate} >
          <Form.Group inline>
            <Form.Field width={5}>
              <label>Nickname: </label>
            </Form.Field>
            <Form.Field width={1}>
            </Form.Field>
            <input className={profileEdit ? "userProEdit" : "userProDisp"} id="nickName" value={ user.nickName } onChange={ profileEdit ? this.handleChange : null } />
          </Form.Group>

          <Form.Group inline>
            <Form.Field width={5}>
              <label>Birth Date:</label>
            </Form.Field>
            <Form.Field width={1}>
            </Form.Field>
            <Form.Field>
              { user.birthDate === '' ?
                <div></div>
                :
                <input className={profileEdit ? "userProEdit" : "userProDisp"} id="birthDate" type="date" value={ user.birthDate } onChange={ profileEdit ? this.handleChange : null }/>
              }
            </Form.Field>

          </Form.Group>

          <Form.Group inline>
            <Form.Field width={5}>
              <label>Phone:</label>
            </Form.Field>
            <Form.Field width={1}>
            </Form.Field>
            <input className={profileEdit ? "userProEdit" : "userProDisp"} id="phoneNumber" value={ user.phoneNumber } onChange={ profileEdit ? this.handleChange : null } />
          </Form.Group>

          <Form.Group inline>
            <Form.Field width={5}>
              <label>Email:</label>
            </Form.Field>
            <Form.Field width={1}>
            </Form.Field>
            <input className="userProDisp" id="username" value={ user.username }/>
          </Form.Group>

          <Form.Group inline>
            <Form.Field width={5}>
              <label>Location:</label>
            </Form.Field>
            <Form.Field width={1}>
            </Form.Field>
            <input className={profileEdit ? "userProEdit" : "userProDisp"} id="address" value={ user.address } onChange={ profileEdit ? this.handleChange : null }/>
          </Form.Group>

          <Form.Field style={{ textAlign: 'center' }}>
          { profileEdit ?
              <Button className="primBtn" primary>Update</Button>
            :
              <Menu secondary>
                <Menu.Menu position="right">
                  <Menu.Item as='a'>
                    <Popup
                      trigger={ <Icon className="edit blue large" onClick={this.handleProUpdate}/>}
                      content="Click to edit profile information."
                      basic
                    />

                  </Menu.Item>
                </Menu.Menu>
              </Menu>
          }
          </Form.Field>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(UserProfile);
