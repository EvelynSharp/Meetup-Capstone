import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Image } from 'semantic-ui-react';
import { logout } from '../actions/user';
import HomeHeader from '../images/Homeheader.jpg';

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
                 history.push('/login')
               }}
               className='rightMenu'
             >
               {nav.name}
             </a>
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
        <Image src={HomeHeader} />
      }
    </div>
  )
 }
}

const mapStateToProps = (state) => {
  return { id: state.user._id }
}

export default withRouter(connect(mapStateToProps)(NavBar));
