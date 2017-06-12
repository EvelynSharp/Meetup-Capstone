import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react';
import request from 'superagent';
import { connect } from 'react-redux'


class EventImageDrop extends Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  eventImageDrop = (accepted, rejected) => {
    this.setState({ accepted, rejected });
    request.post(`/api/cloudinarys/events`)
           .attach('file', accepted[0])
           .set('Accept', 'application/json')
           .end( (err, response) => {
             console.log(response);
             let url = JSON.parse(response.text);
             this.props.setImageUrlState(url);
           })
  };

  render() {
    let dropzoneRef;
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpg, image/jpeg, image/png"
            ref={node => dropzoneRef = node }
            onDrop={this.eventImageDrop}
          >
            <p>Upload an event picture: *.jpg, *.jpeg and *.png</p>
          </Dropzone>
          <Button className="primBtn" primary type="button" onClick={() => dropzoneRef.open()}>Upload Image</Button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(EventImageDrop);
