import React from 'react';
import { Navbar, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, NavbarBrand, NavbarText, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/user';
import { Button } from 'bootstrap';

class MyNavbar extends React.Component {
  state = {
    isLoggedIn: false,
    isLoggedOut: false,
  };
  componentDidMount() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setState({ isLoggedIn: true });
    }
  }

  handleLogoutClick = () => {
    localStorage.removeItem('user');
    this.props.logoutUser();
    this.setState({ isLoggedIn: false, isLoggedOut: true });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = (
        <button onClick={this.handleLogoutClick} className="fs-4">
          {' '}
          Logout
        </button>
      );
    } else {
      button = (
        <div>
          <Link to="/login" className="fs-4">
            Login |
          </Link>
          <Link to="/register" className="fs-4">
            {' '}
            Register
          </Link>
        </div>
      );
    }

    return (
      <div>
        <Navbar color="info" light>
          <NavbarBrand className="fs-1 fw-bold text-decoration-underline px-5 ">Window</NavbarBrand>
          <Nav>
            {this.props.userGlobal.username ? (
              <>
                <NavItem className="fs-4">
                  <NavbarText>Hello, {this.props.userGlobal.username}</NavbarText>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="fs-6 text-secondary fw-bold">
                    Pages
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem>
                      <Link to="/Profile">Profile</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/History">Post</Link>
                    </DropdownItem>

                    <DropdownItem>
                      <Link to="/HomePage">Home</Link>
                    </DropdownItem>

                    <DropdownItem divider />
                    <DropdownItem onClick={this.handleLogoutClick}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <NavItem>
                <NavbarText>{button}</NavbarText>
              </NavItem>
            )}
          </Nav>
        </Navbar>
        {this.state.isLoggedOut && <Navigate to="/Login" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  logoutUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
