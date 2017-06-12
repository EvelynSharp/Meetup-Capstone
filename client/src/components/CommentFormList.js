import React, { Component } from 'react';
import { Form, Button, Comment } from 'semantic-ui-react';
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
    return existingComments.map( (c, index) => {
      return(
        <Comment key={index}>
          <Comment.Avatar src={c.avatarUrl} />
          <Comment.Content>
            <Comment.Author as='a'> { c.username } </Comment.Author>
            <Comment.Metadata>
              <div> Updated At: </div>
            </Comment.Metadata>
            <Comment.Text> { c.userComment } </Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
              { username === c.username &&
                <Comment.Action
                  onClick={ () => this.commentDeletion(index) }
                >Delete</Comment.Action>
              }
            </Comment.Actions>
          </Comment.Content>
        </Comment>
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
          <Button className="primBtn" primary>Add A Comment</Button>
        </Form>
        <Comment.Group>
          { this.displayComments() }
        </Comment.Group>
      </div>
    )
  }
}


export default connect()(CommentFormList);
