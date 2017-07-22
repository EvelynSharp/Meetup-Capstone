import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Modal, Button, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';

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
          <span className='modalTextPadding'> Already have an account? </span>
          <Link to={'/login'}> Log in</Link>
        </div>
      </Modal.Content>
    )
  }

  render(){
    let { events, user, history } = this.props;
    if (events.length === 0) {
      return (
        <div style={{paddingBottom: '30%', textAlign: 'top'}}>
          No Matching Events Found
        </div>
      )
    }
    return(
      <Card.Group itemsPerRow={3} >
       { events.map( (event, index) => {
        let timeDateDisp = moment(`${event.begDate} ${event.begTime}`).format("YYYY-MM-DD, hh:mm A");
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
                {timeDateDisp}
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
