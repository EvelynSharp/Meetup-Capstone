import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Modal, Button, Icon } from 'semantic-ui-react';
import { logout } from '../actions/user';
import Login from './Login';
import AbtCallAction from './AbtCallAction';


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
                 this.displayLogin(nav)
                :
                 <NavLink to={nav.path} className='rightMenu'>
                   {nav.name}
                 </NavLink>
           }
         </Menu.Item>
       )
     });
  }

  displayLogin = (nav) => {
    if (this.props.location.pathname === '/login') {
      return <div className="loginBtn" >{nav.name} </div>
    } else {
      return (
        <div className="signInModalCon">
         <Modal className="signInPop" size="small" trigger={ <div className="loginBtn" >{nav.name} </div> }>
           <Modal.Header>Sign In</Modal.Header>
           <Modal.Content>
            <Login {...this.props} title="Login"/>
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

  render() {
    let { id, location, history } = this.props;
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
          <Menu.Item key="homeIcon">
            <NavLink to={'/'} className='rightMenu'>
              <Icon name="home" size="large"/>
            </NavLink>
          </Menu.Item>
          { this.buildNavs(navs) }
        </Menu.Menu>
      </Menu>
      { location.pathname === '/' &&
        <div className='homebanner'>
          <h2 className='moduleHeader'>Start Your Next Adventure</h2>
        </div>
      }
      { location.pathname === '/about' &&
        <AbtCallAction position="top" history={history} />
      }
    </div>
  )
 }
}


const mapStateToProps = (state) => {
  return { id: state.user._id }
}

export default withRouter(connect(mapStateToProps)(NavBar));
