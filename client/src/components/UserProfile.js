import React, { Component } from 'react';
import {  Button, Form  } from 'semantic-ui-react';
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
    if(!profileEdit) {
      this.toggleProEdit();
    } else {
      dispatch(updateUserInfo(_id, nickName, birthDate, phoneNumber, username, address, avatarUrl));
      this.toggleProEdit();
    }
  }
  handleChange = (e) => {
    let { id, value } = e.target;
    this.setState({ user: { ...this.state.user, [id] : value } })
  }

  render() {
    let { profileEdit, user } = this.state;

    return (
      <div >
        <Form onSubmit={this.handleProUpdate}>

            <label>Nickname:</label>
            <Form.Input id="nickName" value={ user.nickName } onChange={ profileEdit ? this.handleChange : null } />

            <label>Birth Date:</label>
            <Form.Input id="birthDate" type="date" value={ user.birthDate } onChange={ profileEdit ? this.handleChange : null }/>

            <label>Phone:</label>
            <Form.Input id="phoneNumber" value={ user.phoneNumber } onChange={ profileEdit ? this.handleChange : null } />

            <label>Email:</label>
            <Form.Input id="username" value={ user.username }/>

            <label>Location:</label>
            <Form.Input id="address" value={ user.address } onChange={ profileEdit ? this.handleChange : null }/>
            <Form.Field style={{ textAlign: 'center' }}>
            { profileEdit ?
                <Button className="primBtn" primary>Update</Button>
              :
                <Button className="primBtn" primary>Edit</Button>
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
