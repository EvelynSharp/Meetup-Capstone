import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react';

class ImageDropzone extends Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }

  handleImageDrop = (accepted, rejected) => {
    this.setState({ accepted, rejected });
  }

  render() {
    let dropzoneRef;
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpg, image/jpeg, image/png"
            ref={node => dropzoneRef = node }
            onDrop={this.handleImageDrop}
          >
            <p>Upload a profile picture: *.jpg, *.jpeg and *.png</p>
          </Dropzone>
          <Button type="button" onClick={() => dropzoneRef.open()}>Upload Photo</Button>
        </div>
        <aside>
          <h2>Accepted files</h2>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h2>Rejected files</h2>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default ImageDropzone;
