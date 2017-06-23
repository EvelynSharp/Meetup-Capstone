import React from 'react';
import { Container, Card, Table, List } from 'semantic-ui-react';


const Footer = () => {
    return(
      <Container className='aboutBottom' textAlign='center'>
        <Card.Group itemsPerRow={3}>
          <Card className='footerCards'>
            <Card.Content>
              <Card.Header>Contact Information</Card.Header>
              <Card.Description>
              <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.Cell>Phone:</Table.Cell>
                      <Table.Cell>801-555-1234</Table.Cell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>Email:</Table.Cell>
                      <Table.Cell>sayhi@eventech.com</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Card.Description>
            </Card.Content>
          </Card>

          <Card className='footerCards'>
            <Card.Content>
              <Card.Header>Location & Hours</Card.Header>
              <Card.Description>
                123 DevPoint Labs Way <br />
                Salt Lake City, UT <br />
                Open 365 - 24 - 7
              </Card.Description>
            </Card.Content>
          </Card>
          <Card className='footerCards'>
            <Card.Content>
              <Card.Header>FAQs</Card.Header>
              <Card.Description>
                <List>
                  <List.Item>How do I organize an event?</List.Item>
                  <List.Item>How can I invite my friends?</List.Item>
                  <List.Item>How can I see who is coming?</List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>

        </Card.Group>
      </Container>
    )
}

export default Footer;
