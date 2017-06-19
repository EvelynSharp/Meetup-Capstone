import React, { Component } from 'react';
import { Form, Button, Comment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { eventArrayUpdate } from '../actions/events';
import { Link } from 'react-router-dom';

class CommentFormList extends Component {
  state = { currentComment: '' }

  handleCommentSubmit = (e) => {
    e.preventDefault();
    let { currentComment } = this.state;
    let { dispatch, eventId } = this.props;
    let { username, nickName, avatarUrl, _id } = this.props.user;
    let commentContent = {_id, username, nickName, avatarUrl, userComment: currentComment};
    if(currentComment !=='')
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
          <Link  to={`/viewuser/${c._id}`}>
            <Comment.Avatar src={c.avatarUrl}/>
          </Link>
          <Comment.Content>
            <Link  to={`/viewuser/${c._id}`}>
              <Comment.Author as='a'> {c.nickName} ({c.username}) </Comment.Author>
            </Link>
            <Comment.Metadata>
              <div> says: </div>
            </Comment.Metadata>
            <Comment.Text> { c.userComment } </Comment.Text>
            <Comment.Actions>
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
