import React from 'react';
import { Header, Form, Button, Message } from 'semantic-ui-react';
import { authenticateLogin } from '../actions/user';
import { connect } from 'react-redux';


class Login extends React.Component {
  defaults = {
                email: '',
                password: '',
              }
  state = { ...this.defaults }

  componentDidMount = () => {
    this.setState({ ...this.defaults })
  }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value }, () => {
      if (id === 'email' || id === 'password') {
        this.props.dispatch({ type: 'RESET_USER_ERROR'});
      }
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    let { title, history, dispatch } = this.props;
    let { email, password, avatarUrl, passwordValidation } = this.state;
    if ( title === 'Register') {
      if (avatarUrl === '' || password !== passwordValidation) {
        if (avatarUrl === '')
          this.setState({ avatarCheck: false });
        if (password !== passwordValidation)
          this.setState({ passwordCheck: false });
      } else {
        dispatch(authenticateLogin(email, password, history));
      }
    } else {
        dispatch(authenticateLogin(email, password, history));
    }
  }

  render() {
    let { title } = this.props;
    let { email, password } = this.state;
    return (
      <div className='pageContainer'>
        <Header as="h3">{title}</Header>
        <Form onSubmit={this.handleSubmit} error >
          <Form.Input
            id="email"
            label="Email:"
            required
            type="email"
            onChange={this.handleChange}
            value={email}
          />
          { title=== 'Login' && this.props.userError === 'NotAUser' &&
            <Message
              error
              content='User does not exist.'
            />
          }
          <Form.Input
            id="password"
            label="Password:"
            required
            type="password"
            onChange={this.handleChange}
            value={password}
          />
          { title=== 'Login' && this.props.userError === 'wrongPW' &&
            <Message
              error
              content='Password entered is incorrect.'
            />
          }
          <Button className="primBtn" primary>Submit</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { userError: state.userError }
}

export default connect(mapStateToProps)(Login);
