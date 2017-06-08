import React, { Component } from 'react';
import { Form, Button, List, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { eventArrayUpdate } from '../actions/events';

class CommentFormList extends Component {
  state = { currentComment: '' }

  handleCommentSubmit = (e) => {
    e.preventDefault();
    let { currentComment } = this.state;
    let { dispatch, eventId } = this.props;
    let { username, avatarUrl } = this.props.user;
    let commentContent = {username, avatarUrl, userComment: currentComment};
    dispatch(eventArrayUpdate( commentContent, eventId, 'ADD_COMMENT' ));
    this.setState({ currentComment: '' });
  }

  commentDeletion = (index) => {
    let { existingComments, dispatch, eventId } = this.props;
    existingComments.splice(index, 1);
    let filteredComments = existingComments;
    dispatch(eventArrayUpdate( filteredComments, eventId, 'REMOVE_COMMENT'));
  }

  displayComments = () => {
    let { existingComments } = this.props;
    let { username } = this.props.user;
    return existingComments.map( (comment, index) => {
      return(
        <List.Item key={index}>
          <Image avatar src={comment.avatarUrl} />
          <List.Content>
            <List.Header>
              { comment.username }
            </List.Header>
              { comment.userComment }
              { username === comment.username &&
                <span>
                <Icon
                  name='remove'
                  size='large'
                  onClick={ () => this.commentDeletion(index) } />
                </span>
              }
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    let { currentComment } = this.state;
    return(
      <div>
        <Form onSubmit = { this.handleCommentSubmit } >
          <Form.TextArea
            label='Discussion'
            value={currentComment}
            id="currentComment"
            placeholder='Enter your comment'
            onChange={ e => this.setState({ currentComment: e.target.value })}
          />
          <Button primary>Add A Comment</Button>
        </Form>
        <List verticalAlign='middle'>
          { this.displayComments() }
        </List>
      </div>
    )
  }
}


export default connect()(CommentFormList);
