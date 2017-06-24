import React from 'react';
import { Header, Form, Button, Dropdown, Message, Container, Grid } from 'semantic-ui-react';
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
      <div className="generalBGContainer">
        <div className="bgOverlay">
          <div className="mainContentContainer">
            <div className='pageContainer'>
              <Header className="pageHeaders">{title}</Header>
              <Form onSubmit={this.handleSubmit} error>
                <Form.Group>
                  <Form.Field width={2}></Form.Field>
                  <Form.Input width={5} id="nickName" label="NickName:" required onChange={this.handleChange} value={nickName} />
                  <Form.Field width={2}></Form.Field>
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
                  <Form.Field width={2}></Form.Field>
                  <Form.Input width={5} type="date" id="birthDate" label="Birth Date:" onChange={this.handleChange} value={birthDate} />
                  <Form.Field width={2}></Form.Field>
                  <Form.Input width={5} type="tel" id="phoneNumber" label="Phone Number:" onChange={this.handleChange} value={phoneNumber} />
                </Form.Group>
                <Form.Group inline>
                  <Form.Field width={2}></Form.Field>
                  <label>Gender:</label>
                  <Form.Field width={1}></Form.Field>
                  <Form.Radio label="Male" value="Male" checked={ gender==='Male'} onChange={this.genderSelect}/>
                  <Form.Field width={1}></Form.Field>
                  <Form.Radio label="Female" value="Female" checked={ gender==='Female'} onChange={this.genderSelect}/>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={2}></Form.Field>
                  <Form.Input width={12} id="address" label="Location:" onChange={this.handleChange} value={address} />
                </Form.Group>
                <Form.Group>
                  <Form.Field width={2}></Form.Field>
                  <Form.Input id="email" label="Email:" required type="email" onChange={this.handleChange} value={email} width={12} />
                  { this.props.userError === 'dupedUser' &&
                    <Message error content='User already exist.' />
                  }
                </Form.Group>
                <Form.Group >
                  <Form.Field width={2}></Form.Field>
                  <Form.Input
                    id="password"
                    label="Password:"
                    required
                    type="password"
                    onChange={this.handleChange}
                    value={password}
                    width={12}
                  />
                </Form.Group>
                { !pwCharCheck &&
                  <Form.Group >
                    <Form.Field width={2} />
                    <Form.Field width={12}>
                      <Message error content='Password minimum is 8 characters.' />
                    </Form.Field>
                  </Form.Group>
                }

                <Form.Group>
                  <Form.Field width={2}></Form.Field>
                  <Form.Input
                    id="passwordValidation"
                    label="Re-enter Password:"
                    required
                    type="password"
                    onChange={this.handleChange}
                    value={passwordValidation}
                    width={12}
                  />
                </Form.Group>
                { !passwordCheck &&
                  <Form.Group >
                    <Form.Field width={2} />
                    <Form.Field width={12}>
                      <Message error content='Password entries need to be the same.' />
                    </Form.Field>
                  </Form.Group>
                }
                <Form.Group>
                  <Form.Field width={7}></Form.Field>
                  <Button style={{ margin: '1em 0'}} className="primBtn" primary>Submit</Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { userError: state.userError }
}

export default connect(mapStateToProps)(Register);
