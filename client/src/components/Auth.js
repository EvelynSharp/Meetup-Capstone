import React from 'react';
import { Header, Form, Button, Dropdown, Message } from 'semantic-ui-react';
import { authenticate } from '../actions/user';
import { connect } from 'react-redux';
import { avatarOptions } from '../avatarOptions';

class Auth extends React.Component {
  defaults = { email: '', password: '', avatarUrl: '', avatarCheck: true, passwordValidation: '' }
  state = { ...this.defaults }

  componentDidMount = () => {
    this.setState({ ...this.defaults })
  }

  handleChange = (e) => {
    let { target: { id, value }} = e;
    this.setState({ [id]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, history, dispatch } = this.props;
    let { email, password, avatarUrl, passwordValidation } = this.state;
    if ( title === 'Register' && avatarUrl === '') {
      this.setState({ avatarCheck: false });
    } else if ( title ==='Register' && password !== passwordValidation) {
      alert("Passwords must match");
    } else {
      dispatch(authenticate(email, password, avatarUrl, title, history));
    }
  }

  render() {
    let { title } = this.props;
    let { email, password, avatarCheck, passwordValidation } = this.state;
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
          <Form.Input
            id="password"
            label="Password:"
            required
            type="password"
            onChange={this.handleChange}
            value={password}
          />
          { title=== 'Register' &&
            <Form.Input
              id="passwordValidation"
              label="Re-enter Password:"
              required
              type="password"
              onChange={this.handleChange}
              value={passwordValidation}
            />
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

export default connect()(Auth);
