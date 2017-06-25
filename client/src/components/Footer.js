import React from 'react';
import { Segment, Button, Item, Icon, Header } from 'semantic-ui-react';


const Footer = () => {
    return(
      <Segment.Group>
        <Segment textAlign='center' color='blue' inverted className='footerSegment'>
          <Header size='large'>Eventech - Organize, Connect, Play!</Header>
        </Segment>
        <Segment.Group horizontal verticalAlign='middle'>
          <Segment textAlign='center' color='grey' inverted>
            <Header size='large'>Contact us!</Header>
            <Button.Group vertical>
              <Button size='massive' color='orange'>eventech@email.com</Button>
              <Button size='massive' color='orange'>801.555.1236</Button>
            </Button.Group>
          </Segment>
          <Segment textAlign='center' color='grey' inverted>
            <Header size='large'>Connect with us!</Header>
            <Button.Group vertical center>
              <Button color='facebook' size='big'>
                <Icon name='facebook' /> Facebook
              </Button>
              <Button color='twitter' size='big'>
                <Icon name='twitter' /> Twitter
              </Button>
              <Button color='linkedin' size='big'>
                <Icon name='linkedin' /> LinkedIn
              </Button>
              <Button color='instagram' size='big'>
                <Icon name='instagram' /> Instagram
              </Button>
            </Button.Group>
          </Segment>
        </Segment.Group>
        <Segment color='blue' inverted>
          <Header size='large'>
            <Icon name='copyright'/>
            2017 - Eventech
          </Header>
        </Segment>
      </Segment.Group>
    )
}

export default Footer;
