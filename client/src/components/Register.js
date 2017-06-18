import React from 'react';
import { Header, Form, Button, Dropdown, Message, Container } from 'semantic-ui-react';
import { authenticateNew } from '../actions/user';
import { connect } from 'react-redux';
import { avatarOptions } from '../avatarOptions';

class Register extends React.Component {
  defaults = {
                nickName: '',
                birthDate: '',
                phoneNumber: '',
                address:'',
                gender: '',
                email: '',
                password: '',
                avatarUrl: '',
                userBio: '',
                avatarCheck: true,
                passwordValidation: '',
                passwordCheck: true,
                pwCharCheck: true
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
    if (id === 'password') {
      this.setState({ pwCharCheck: true });
    }
    this.setState({ [id]: value });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    let { title, history, dispatch } = this.props;
    let { nickName, birthDate, phoneNumber, address, gender, email, password, avatarUrl, userBio, passwordValidation} = this.state;
    if (avatarUrl === '' || password.length < 8 || password !== passwordValidation ) {
      if (avatarUrl === '')
        this.setState({ avatarCheck: false });
      if (password.length < 8)
        this.setState({ pwCharCheck: false });
      if (password !== passwordValidation)
        this.setState({ passwordCheck: false });
    } else {
      dispatch(authenticateNew(nickName, birthDate, phoneNumber, address, gender, email, password, avatarUrl, userBio, title, history));
    }
  }

  genderSelect = (e, {value}) => {
    this.setState({ gender: value });
  }

  render() {
    let { title } = this.props;
    let { email,
          password,
          avatarCheck,
          passwordValidation,
          passwordCheck,
          nickName,
          birthDate,
          phoneNumber,
          address,
          gender,
          pwCharCheck
        } = this.state;
    return (
      <Container>
        <div className='pageContainer'>
          <Header as="h3">{title}</Header>
          <Form onSubmit={this.handleSubmit} error >
            <Form.Group>
              <Form.Input width={5} id="nickName" label="NickName:" required onChange={this.handleChange} value={nickName} />
              <Form.Field width={1}></Form.Field>
              <Form.Field required width={5}>
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
                  <Message error content='Please fill out this field.' />
                }
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Input width={5} type="date" id="birthDate" label="Birth Date:" onChange={this.handleChange} value={birthDate} />
              <Form.Field width={1}></Form.Field>
              <Form.Input width={5} type="tel" id="phoneNumber" label="Phone Number:" onChange={this.handleChange} value={phoneNumber} />
            </Form.Group>
            <Form.Group inline>
              <label>Gender:</label>
              <Form.Field width={1}></Form.Field>
              <Form.Radio label="Male" value="Male" checked={ gender==='Male'} onChange={this.genderSelect}/>
              <Form.Field width={1}></Form.Field>
              <Form.Radio label="Female" value="Female" checked={ gender==='Female'} onChange={this.genderSelect}/>
            </Form.Group>
            <Form.Input width={11} id="address" label="Address:" onChange={this.handleChange} value={address} />
            <Form.Input id="email" label="Email:" required type="email" onChange={this.handleChange} value={email} width={11} />
            { this.props.userError === 'dupedUser' &&
              <Message error content='User already exist.' />
            }
            <Form.Input
              id="password"
              label="Password:"
              required
              type="password"
              onChange={this.handleChange}
              value={password}
              width={11}
            />
            { !pwCharCheck &&
              <Message error content='Password minimum is 8 characters.' />
            }
            <Form.Input
              id="passwordValidation"
              label="Re-enter Password:"
              required
              type="password"
              onChange={this.handleChange}
              value={passwordValidation}
              width={11}
            />
            { !passwordCheck &&
              <Message error content='Password entries need to be the same.' />
            }
            <Button className="primBtn" primary>Submit</Button>
          </Form>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { userError: state.userError }
}

export default connect(mapStateToProps)(Register);
