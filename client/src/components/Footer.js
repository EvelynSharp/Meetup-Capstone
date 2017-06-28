import React from 'react';
import { Segment, Button, Item, Icon, Header, Grid } from 'semantic-ui-react';


const Footer = () => {
    return(
      <div >
        <Segment.Group>
          <Segment style={{ backgroundColor: '#133070'}} textAlign='center' inverted className='footerSegment'>
            <Header size='large'>Eventech - Organize, Connect, Play!</Header>
          </Segment>
          <Grid >
            <Grid.Row vertical={true} textAlign='center' style={{backgroundColor: '#ffe0b2', marginTop: '0.1em' }} inverted>
              <Grid.Column width={8}>
                <Header size='large' style={{ color: '#133070'}}>Contact us!</Header>
                <Button.Group vertical >
                  <Button size='medium' style={{  backgroundColor: '#40537a', color: 'white'}}>eventech@email.com</Button>
                  <Button size='medium' style={{  backgroundColor: '#40537a', color: 'white'}}>801.555.1236</Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column width={8} >
                <Header size='large'>Connect with us!</Header>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3}/>
                    <Grid.Column width={5}>
                      <Button.Group vertical>
                        <Button color='facebook' size='big'>
                          <Icon name='facebook' /> Facebook
                        </Button>
                        <Button color='twitter' size='big'>
                          <Icon name='twitter' /> Twitter
                        </Button>
                      </Button.Group>
                    </Grid.Column>
                    <Grid.Column width={5}>
                      <Button.Group vertical>
                        <Button color='linkedin' size='big'>
                          <Icon name='linkedin' /> LinkedIn
                        </Button>
                        <Button color='instagram' size='big' style={{ marginBottom: '0.5em'}}>
                          <Icon name='instagram' /> Instagram
                        </Button>
                      </Button.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment style={{ backgroundColor: '#133070', height: '3em'}} inverted>
            <Header as='h4'>
              <Icon name='copyright'/>
              2017 - Eventech
            </Header>
          </Segment>
        </Segment.Group>
      </div>
    )
}

export default Footer;
