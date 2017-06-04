import React from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

const NewEvent = ({ _id, username, role }) => (
  <div>
    <Header as="h2">{username}</Header>
  </div>
)

const mapStateToProps = (state) => {
  return { ...state.user }
}

export default connect(mapStateToProps)(NewEvent);
