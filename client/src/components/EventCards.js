import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Modal, Button, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';


const EventCards = ({ events, user, history }) => (
  <Card.Group>
    { displayEventCards(events, user, history) }
  </Card.Group>
);


const displayEventCards = ( events, user, history ) => {
  return events.map( (event, index) => {
    return(
      <Card key={index}>
        <Image src='#'/>
        <Card.Content >
          <Card.Header>
            <Link className='eventListHeader' to={`/event/${event._id}`}>
              { event.eventName }
            </Link>
          </Card.Header>
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
              <Menu.Item as='a' key={`${index} share`} >
                <Icon name='external share' size="large" />
              </Menu.Item>
              { checkUser(event, user, history, index) }
            </Menu.Menu>
          </Menu>
        </Card.Content>
      </Card>

    )
  })
}

const checkUser = (event, user, history, index) => {
  if(Object.keys(user).length === 0) {
    return (
      <Menu.Item as='a' key={`${index} view`}>
        <Modal size="small" trigger={<Icon name='eye' size="large" />}>
          <Modal.Header>View This Event</Modal.Header>
          <Modal.Content>
            <div>Log in or sign up to view the event you are interested in.</div>
            <Link to={'/register'}>
              <Button primary>SIGN UP</Button>
            </Link>
            <div>
              Already have an account?
              <Link to={'/login'}>Log in</Link>
            </div>
          </Modal.Content>
        </Modal>
      </Menu.Item>
    )
  } else {
    return(
      <Menu.Item as='a' key={`${index} view`} onClick={ () => history.push(`/event/${event._id}`)}>
        <Icon name='eye' size="large" />
      </Menu.Item>
    )
  }
}


const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(EventCards);
