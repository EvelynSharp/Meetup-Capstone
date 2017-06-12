import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Modal, Button, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';


class EventCards extends Component {

  checkUser = (event, user, history, index) => {
    if(Object.keys(user).length === 0) {
      return (
        <Menu.Item as='a' key={`${index} view`}>
          <Modal size="small" trigger={
            <span data-tooltip="view event">
              <Icon className='eye large red' />
            </span>
            }>
            <Modal.Header>View This Event</Modal.Header>
            { this.loginModal() }
          </Modal>
        </Menu.Item>
      )
    } else {
      return(
        <Menu.Item as='a' key={`${index} view`} onClick={ () => history.push(`/event/${event._id}`)}>
          <span data-tooltip="View event"><Icon className='eye large blue'/></span>
        </Menu.Item>
      )
    }
  }

  loginModal() {
    return (
      <Modal.Content>
        <div className='modalText'>Sign Up for Eventech to view the event you are interested in. </div>
        <Link to={'/register'}>
          <Button primary className="primBtn">SIGN UP</Button>
        </Link>
        <div className='modalTextFooter'>
          Already have an account?
          <Link to={'/login'}> Log in</Link>
        </div>
      </Modal.Content>
    )
  }

  render(){
    let { events, user, history } = this.props;
    return(
      <Card.Group>
       { events.map( (event, index) => {
        return(
          <Card key={index}>
            { Object.keys(user).length === 0 ?
                <Modal size="small" trigger={ <Image src={event.imageUrl} /> }>
                  <Modal.Header>View This Event</Modal.Header>
                  { this.loginModal() }
                </Modal>
              :
                <Link to={`/event/${event._id}`}>
                  <Image src={event.imageUrl} />
                </Link>
            }
            <Card.Content >
              { Object.keys(user).length === 0 ?
                  <Modal size="small" trigger={ <Card.Header> { event.eventName } </Card.Header> } >
                    <Modal.Header>View This Event</Modal.Header>
                    { this.loginModal() }
                  </Modal>
                :
                  <Card.Header>
                    <Link className='eventListHeader' to={`/event/${event._id}`}>
                       { event.eventName }
                    </Link>
                  </Card.Header>
              }
              <Card.Meta>
                {`Date: ${event.date.slice(0, 10)}`}
              </Card.Meta>
              <Card.Description>
                {`Location: ${event.location}`}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Menu secondary>
                <Menu.Item key={`${index} tag`}>
                  { `#${event.category}` }
                </Menu.Item>
                <Menu.Menu position="right" >
                  { this.checkUser(event, user, history, index) }
                </Menu.Menu>
              </Menu>
            </Card.Content>
          </Card>
        )
      }) }
      </Card.Group>
    )
  }
}


const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(EventCards);
