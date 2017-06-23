import React from 'react';
import { Container, Header, Grid, Icon, Card, Segment, Image, List } from 'semantic-ui-react';
import  JoeyImage from '../images/JoeyImage.jpg';
import KamiImage from '../images/KamiImage.jpg';
import EvelynImage from '../images/EvelynImage.jpg';
import AbtCallAction from './AbtCallAction';

const About = ({ history }) => (

<div>
  <Container className='pageContainer'>
    <Segment raised>
      <Header as='h1' textAlign="center" color="blue">What is EventTech?</Header>
      <Header as='h3' textAlign="center">
        EventTech is the worlds newest event technology platform. We build the technology to allow anyone to create, share, find and attend new things to do that fuel their passions and enrich their lives. Music festivals, venues, marathons, conferences, hackathons, air guitar contests, political rallies, fundraisers, gaming competitions — you name it, we power it. Our mission? To bring the world together through live experiences.
      </Header>
    </Segment>

  <Card.Group itemsPerRow={3}>
    <Card>
      <Icon fitted color='orange' name='unhide' size='massive'/>
      <Card.Content >
        <Card.Header className='cardHeader'>
          BROWSE..
        </Card.Header>
        <Card.Description>
          <List divided size='big'>
            <List.Item>
              <List.Content>
                <List.Header className='aboutPageText'>Events in your area</List.Header>
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Content>
                <List.Header className='aboutPageText'>Events of all types</List.Header>
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Content>
                <List.Header className='aboutPageText'>Events with friends</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>

     <Card>
      <Icon fitted color='orange' name='edit' size='massive'/>
      <Card.Content >
        <Card.Header className='cardHeader'>
          ORGANIZE..
        </Card.Header>
        <Card.Description>
          <List divided verticalAlign='middle' size='big'>
            <List.Item>
              <List.Content>
                <List.Header className='aboutPageText'>Choose a time</List.Header>
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Content>
                <List.Header className='aboutPageText'>Choose a place</List.Header>
              </List.Content>
            </List.Item>

            <List.Item>
              <List.Content>
                <List.Header className='aboutPageText'>Choose attendees</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
     </Card>

     <Card>
      <Icon fitted color='orange' name='send outline' size='massive'/>
       <Card.Content >
         <Card.Header className='cardHeader'>
           INVITE..
         </Card.Header>
         <Card.Description>
           <List divided verticalAlign='middle' size='big'>
             <List.Item>
               <List.Content>
                 <List.Header className='aboutPageText'>Friends</List.Header>
               </List.Content>
             </List.Item>

             <List.Item>
               <List.Content>
                 <List.Header className='aboutPageText'>Family</List.Header>
               </List.Content>
             </List.Item>

             <List.Item>
               <List.Content>
                 <List.Header className='aboutPageText'>Colleagues</List.Header>
               </List.Content>
             </List.Item>
           </List>
         </Card.Description>
       </Card.Content>
     </Card>
    </Card.Group>

    <Segment raised padded textAlign='center'>
      <List animated divided horizontal size='huge'>
        <List.Item>
          <List.Content className='iconBar'>
            <Icon inverted circular color='blue' name='briefcase' size='large'/>
            <List.Header>Business</List.Header>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content className='iconBar'>
            <Icon inverted circular color='red' name='heart' size='large'/>
            <List.Header>Health & Fitness</List.Header>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content className='iconBar'>
            <Icon inverted circular color='purple' name='laptop' size='large'/>
            <List.Header>Science & Tech</List.Header>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content className='iconBar'>
            <Icon inverted circular color='green' name='music' size='large'/>
            <List.Header>Music & Arts</List.Header>
          </List.Content>
        </List.Item>

        <List.Item>
          <List.Content className='iconBar'>
            <Icon inverted circular color='yellow' name='food' size='large'/>
            <List.Header>Food & Drink</List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Segment>

    <Segment raised>
      <Header as='h1' textAlign="center" color="blue">How did we get started?</Header>
      <Header as='h3' textAlign="center">The chief metaphor used to describe building a company is designing an organism. This has defined their approach to growing and nurturing meeting organizer startup EventTech. If you look at it this way, they say, you’re much more likely to create something that can adapt to shifting environments and survive without micromanagement. Like any organism, a startup will die if it can’t properly identify and leverage nutrients.</Header>
    </Segment>

     <Grid divided='vertically'>
      <Grid.Row columns={3}>
        <Grid.Column>
          <Card>
           <Icon fitted color='orange' name='code' size='massive'/>
            <Card.Content >
              <Card.Header className='cardHeader'>
                CODE..
              </Card.Header>
              <Card.Description>
                <List divided verticalAlign='middle' size='big'>
                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>We attended boot camp</List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>We learned JavaScript stuff</List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>We practiced hard</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>

        <Grid.Column>
          <Card>
           <Icon fitted color='orange' name='lightbulb' size='massive'/>
            <Card.Content >
              <Card.Header className='cardHeader'>
                IDEA..
              </Card.Header>
              <Card.Description>
                <List divided verticalAlign='middle' size='big'>
                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>We thought of a solid idea</List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>We put our new skills to use</List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>We just made it</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>

        <Grid.Column>
          <Card>
           <Icon fitted color='orange' name='like outline' size='massive'/>
            <Card.Content >
              <Card.Header className='cardHeader'>
                CREATE..
              </Card.Header>
              <Card.Description>
                <List divided verticalAlign='middle' size='big'>
                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>NodeJS</List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>ReactJS</List.Header>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Content>
                      <List.Header className='aboutPageText'>Semantic UI</List.Header>
                    </List.Content>
                  </List.Item>
                </List>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Segment raised>
      <Header as='h1' textAlign="center" color="blue">Who are we?</Header>
      <Header as='h3' textAlign="center">We learned to code at DevPoint Labs coding boot camp.</Header>
    </Segment>

    <Grid divided='vertically'>
     <Grid.Row columns={3}>
       <Grid.Column>
         <Card>
           <Image src={KamiImage} height='300px' centered />
           <Card.Content>
             <Card.Header>
               Kami Dewey
             </Card.Header>
             <Card.Meta>
               <span>
                 30 years old
               </span>
             </Card.Meta>
             <Card.Description>
               Kami is from Seattle, WA.
             </Card.Description>
             <Card.Content>
              <Grid divided='vertically'>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <a href='https://github.com/kamity87' target='_blank'><Icon link fitted color='blue' name='github' size='huge'/></a>
                  </Grid.Column>
                  <Grid.Column>
                    <a href='https://www.facebook.com/kamity' target='_blank'><Icon link fitted color='blue' name='facebook square' size='huge'/></a>
                  </Grid.Column>
                  <Grid.Column>
                    <Icon link fitted color='blue' name='linkedin' size='huge'/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
             </Card.Content>
           </Card.Content>
         </Card>
       </Grid.Column>

       <Grid.Column>
         <Card>
           <Image src={EvelynImage} height='300px' centered />
           <Card.Content>
             <Card.Header>
               Evelyn Sharp
             </Card.Header>
             <Card.Meta>
               <span>
                 27 years old
               </span>
             </Card.Meta>
             <Card.Description>
               Evelyn is from China.
             </Card.Description>
             <Card.Content>
              <Grid divided='vertically'>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <a href='https://github.com/EvelynSharp' target='_blank'><Icon fitted link color='blue' name='github' size='huge'/></a>
                  </Grid.Column>
                  <Grid.Column>
                    <Icon link fitted color='blue' name='facebook square' size='huge'/>
                  </Grid.Column>
                  <Grid.Column>
                    <Icon link fitted color='blue' name='linkedin' size='huge'/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
             </Card.Content>
           </Card.Content>
         </Card>
       </Grid.Column>

       <Grid.Column>
         <Card>
           <Image src={JoeyImage} height='300px' centered/>
           <Card.Content>
             <Card.Header>
               Joey Schrader
             </Card.Header>
             <Card.Meta>
               <span>
                 28 years old
               </span>
             </Card.Meta>
             <Card.Description>
               Joey is from Riverton, UT.
             </Card.Description>
             <Card.Content>
              <Grid divided='vertically'>
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <a href='https://github.com/mojo3131' target='_blank'><Icon link fitted color='blue' name='github' size='huge'/></a>
                  </Grid.Column>
                  <Grid.Column>
                    <a href='https://www.facebook.com/joey.schrader.3' target='_blank'><Icon link fitted color='blue' name='facebook square' size='huge'/></a>
                  </Grid.Column>
                  <Grid.Column>
                    <a href='https://www.linkedin.com/in/joey-schrader-472388aa' target='_blank'><Icon link fitted color='blue' name='linkedin' size='huge'/></a>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
             </Card.Content>
           </Card.Content>
         </Card>
       </Grid.Column>
     </Grid.Row>
    </Grid>

  </Container>
</div>

)

export default About;
