import React from 'react';
import { Container, Header, Grid, Icon, Card, Segment } from 'semantic-ui-react';

const About = () => (

<Container>
    <Segment raised>
      <Header as='h1' textAlign="center" color="blue">What is EventTech?</Header>
      <Header as='h3' textAlign="center">
        EventTech is the worlds newest event technology platform. We build the technology to allow anyone to create, share, find and attend new things to do that fuel their passions and enrich their lives. Music festivals, venues, marathons, conferences, hackathons, air guitar contests, political rallies, fundraisers, gaming competitions — you name it, we power it. Our mission? To bring the world together through live experiences.
      </Header>
    </Segment>

  <Grid divided='vertically'>
   <Grid.Row columns={3}>
     <Grid.Column>
       <Card>
        <Icon fitted color='orange' name='unhide' size='massive'/>
         <Card.Content textAlign="center">
           <Card.Header>
             BROWSE
           </Card.Header>
           <Card.Meta>
             <span className='date'>
              Look for events in your area
             </span>
           </Card.Meta>
           <Card.Description>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
           </Card.Description>
         </Card.Content>
       </Card>
     </Grid.Column>

     <Grid.Column>
       <Card>
        <Icon fitted color='orange' name='edit' size='massive'/>
         <Card.Content textAlign="center">
           <Card.Header>
             ORGANIZE
           </Card.Header>
           <Card.Meta>
             <span className='date'>
              Look for events in your area
             </span>
           </Card.Meta>
           <Card.Description>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
           </Card.Description>
         </Card.Content>
       </Card>
     </Grid.Column>

     <Grid.Column>
       <Card>
        <Icon fitted color='orange' name='send outline' size='massive'/>
         <Card.Content textAlign="center">
           <Card.Header>
             INVITE
           </Card.Header>
           <Card.Meta>
             <span className='date'>
              Look for events in your area
             </span>
           </Card.Meta>
           <Card.Description>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
           </Card.Description>
         </Card.Content>
       </Card>
     </Grid.Column>
   </Grid.Row>

 </Grid>

 <Segment raised>
   <Header as='h1' textAlign="center" color="blue">How did we get started?</Header>
   <Header as='h3' textAlign="center">The chief metaphor used to describe building a company is designing an organism. This has defined their approach to growing and nurturing meeting organizer startup EventTech. If you look at it this way, they say, you’re much more likely to create something that can adapt to shifting environments and survive without micromanagement. Like any organism, a startup will die if it can’t properly identify and leverage nutrients.</Header>
 </Segment>

 <Grid divided='vertically'>
  <Grid.Row columns={3}>
    <Grid.Column>
      <Card>
       <Icon fitted color='orange' name='code' size='massive'/>
        <Card.Content textAlign="center">
          <Card.Header>
            CODE
          </Card.Header>
          <Card.Meta>
            <span className='date'>
             We learned how to code
            </span>
          </Card.Meta>
          <Card.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>

    <Grid.Column>
      <Card>
       <Icon fitted color='orange' name='idea' size='massive'/>
        <Card.Content textAlign="center">
          <Card.Header>
            IDEA
          </Card.Header>
          <Card.Meta>
            <span className='date'>
             We had a solid idea
            </span>
          </Card.Meta>
          <Card.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>

    <Grid.Column>
      <Card>
       <Icon fitted color='orange' name='like outline' size='massive'/>
        <Card.Content textAlign="center">
          <Card.Header>
            CREATE
          </Card.Header>
          <Card.Meta>
            <span className='date'>
             We made it
            </span>
          </Card.Meta>
          <Card.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Card.Description>
        </Card.Content>
      </Card>
    </Grid.Column>
  </Grid.Row>
</Grid>
 </Container>
)

export default About;
