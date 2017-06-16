import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Modal, Button } from 'semantic-ui-react';
import { logout } from '../actions/user';
import Login from './Login';


const links = [
  { name: 'Eventech', path: '/'},
  { name: 'ABOUT', path: '/about'},
]

const authenticatedLinks = [
  { name: 'ACCOUNT', path: '/dashboard' },
  { name: 'CREATE EVENT', path: '/newevent' },
  { name: 'LOGOUT'},

]

const unAuthenticatedLinks = [
  { name: 'LOGIN', path: '/login' },
  { name: 'REGISTER', path: '/register' },
]

class NavBar extends React.Component {
//#0e2049
  buildNavs = (navs) => {
    let { location, history, dispatch } = this.props;
    return navs.map( (nav) => {
      return (
        <Menu.Item
          key={nav.name}
          active={ nav.name !== 'LOGOUT' && nav.path === location.pathname}
          name={nav.name}
        >
          { nav.name === 'LOGOUT' ?
             <a
               style={{ cursor: 'pointer' }}
               onClick={ () => {
                 dispatch(logout())
                 history.push('/')
               }}
               className='rightMenu'
             >
               {nav.name}
             </a>
             : nav.name === 'LOGIN' ?
              <div className="signInModalCon">
               <Modal className="signInPop" size="small" trigger={ <div className="loginBtn" >{nav.name} </div> }>
                 <Modal.Content>
                  <Login {...this.props} title="Login"/>
                 </Modal.Content>
               </Modal>
               </div>
                :
                 <NavLink to={nav.path} className='rightMenu'>
                   {nav.name}
                 </NavLink>
           }
         </Menu.Item>
       )
     });
  }

  render() {
    let { id, location } = this.props;
    let navs;

    if (id) {
      navs = [ links[1], ...authenticatedLinks];
    } else {
      navs = [ links[1], ...unAuthenticatedLinks];
    }

  return (
    <div>
      <Menu className='mainNav'>
        <Menu.Item
          key='Eventech'
          name='Eventech'
        >
          <NavLink to='/' className='logo' >
            Eventech
          </NavLink>
        </Menu.Item>
        <Menu.Menu  position='right'>
          { this.buildNavs(navs) }
        </Menu.Menu>
      </Menu>
      { location.pathname === '/' &&
        <div className='homebanner'>
          <h2 className='moduleHeader'>Start Your Next Adventure</h2>
        </div>
      }
      { location.pathname === '/about' &&
        <div className='aboutbanner'>
          <h2 className='moduleHeader'>Create The Best Experience</h2>
        </div>
      }
    </div>
  )
 }
}


// <div className='modalText'>Sign Up for Eventech to view the event you are interested in. </div>
// <Link to={'/register'}>
//   <Button primary className="primBtn">SIGN UP</Button>
// </Link>
// <div className='modalTextFooter'>
//   Already have an account?
//  <Link to={'/login'}> Log in</Link>
// </div>

const mapStateToProps = (state) => {
  return { id: state.user._id }
}

export default withRouter(connect(mapStateToProps)(NavBar));
