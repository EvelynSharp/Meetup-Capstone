import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image, Modal, Button } from 'semantic-ui-react';


const EventCards = ({ events }) => (
  <Card.Group>
    { displayEventCards(events) }
  </Card.Group>
);



const displayEventCards = ( events ) => {
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
          <Icon name='external share' size="large" />
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
        </Card.Content>
      </Card>

    )
  })
}

export default EventCards;
