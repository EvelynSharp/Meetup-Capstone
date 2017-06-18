import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'semantic-ui-react';
import Login from './Login';
import { Link } from 'react-router-dom';

//conditioner rendering based on if if header or footer, add footer later
const AbtCallAction = ({ position, history, id }) => (

    <div>
      { position=='top' ?
          <div className='aboutbanner'>
            <h2 className='moduleHeader'>Create The Best Experience</h2>
            { displayGetStart(history, id, position="top") }
          </div>
        :
          <div className='aboutBottom'>
            <h2 className='moduleBottom'>Set up your next event</h2>
            { displayGetStart(history, id, position="bottom") }
          </div>
      }
    </div>
  )




 const displayGetStart = (history, id, position) => {
  if (id) {
    return (
      <Button className={ position === 'top' ? "imageBtn" : "imageBtnBottom" }onClick={ () => history.push('/newevent')}>GET STARTED</Button>
    )
  } else {
    return (
      <div className="signInModalCon">
        <Modal
          className="signInPop"
          size="small"
          trigger={ <Button className={ position === 'top' ? "imageBtn" : "imageBtnBottom" }
        >GET STARTED</Button>}>
          <Modal.Header>Sign In</Modal.Header>
          <Modal.Content>
            <div className='modalText'>Sign In to create a new event </div>
            <Login history={history} title="Login"/>
            <div className='modalTextFooter'>
              <span className='modalTextPadding'> Do not have an account? </span>
              <Link to={'/register'}>Sign Up</Link>
            </div>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return { id: state.user._id }
}

export default connect(mapStateToProps)(AbtCallAction);
