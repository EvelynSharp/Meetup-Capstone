import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Modal, Button } from 'semantic-ui-react';
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
        <Card.Content>
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
          <a><Icon name='external share' size="large" /></a>
          { checkUser(event, user, history) }
        </Card.Content>
      </Card>

    )
  })
}

const checkUser = (event, user, history) => {
  if(Object.keys(user).length === 0) {
    return (
      <span>
        <Modal size="small" trigger={<a><Icon name='eye' size="large" /></a>}>
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
      </span>
    )
  } else {
    return <a><Icon name='eye' size="large" onClick={ () => history.push(`/event/${event._id}`)}/></a>
  }
}


const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(EventCards);
