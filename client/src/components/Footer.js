import React from 'react';
import {Container, Card} from 'semantic-ui-react';


const Footer = () => {
    return(
      <Container className='aboutBottom'>
        <Card.Group itemsPerRow={3}>
          <Card className='aboutBottom'>
            <Card.Content>
              <Card.Header>Contact Information</Card.Header>
              <Card.Description>
                //TABLE OF OUR INFO HERE
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>Location & Hours</Card.Header>
              <Card.Description>
                123 DevPoint Labs Way
                Salt Lake City, UT
                Open 365 - 24 - 7
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>
            <Card.Content>
              <Card.Header>FAQs</Card.Header>
            </Card.Content>
          </Card>

        </Card.Group>
      </Container>
    )
}

export default Footer;
