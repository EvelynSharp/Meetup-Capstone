import React from 'react';
import { Header, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import { authenticate } from '../actions/user';
import { connect } from 'react-redux';
import { avatarOptions } from '../avatarOptions';

class Auth extends React.Component {
  defaults = {
                email: '',
                password: '',
                avatarUrl: '',
                avatarCheck: true,
                passwordValidation: '',
                passwordCheck: true,
              }
  state = { ...this.defaults }

  componentDidMount = () => {
    this.setState({ ...this.defaults })
  }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    if (id === 'passwordValidation') {
      this.setState({ passwordCheck: true });
    }

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
        dispatch(authenticate(email, password, avatarUrl, title, history));
      }
    } else {
        dispatch(authenticate(email, password, avatarUrl, title, history));
    }
  }

  render() {
    let { title } = this.props;
    let { email, password, avatarCheck, passwordValidation, passwordCheck} = this.state;
    return (
      <div>
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
          { title=== 'Register' && this.props.userError === 'dupedUser' &&
            <Message
              error
              content='User already exist.'
            />
          }
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
          { title=== 'Register' &&
            <Form.Field>
              <Form.Input
                id="passwordValidation"
                label="Re-enter Password:"
                required
                type="password"
                onChange={this.handleChange}
                value={passwordValidation}
              />
              { !passwordCheck &&
                <Message
                  error
                  content='Password entries need to be the same.'
                />
              }
            </Form.Field>
          }
          { title === 'Register' &&

            <Form.Field required>
              <label>Select Avatar:</label>
              <Dropdown
                selection
                options={ avatarOptions }
                onChange={(e, data) => {
                  this.setState({avatarUrl: data.value, avatarCheck: true })
                  }
                }
              />
              { !avatarCheck &&
                <Message
                  error
                  content='Please fill out this field.'
                />
              }
            </Form.Field>

          }
          <Button className="ui primary button">Submit</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { userError: state.userError }
}

export default connect(mapStateToProps)(Auth);
