import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import BSIcon from '../components/BSIcon';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
const NavBar = ({ currentUser }) => (
  <Navbar bg="dark" variant='dark'>
    <Container fluid>
      <Navbar.Brand id={COMPONENT_IDS.NAVBAR_LANDING_PAGE} as={NavLink} activeClassName="" exact to="/" expand="lg">
        Pet Pickup
        <BSIcon icon={{ name: "cart3", width: 16, height: 16 }}></BSIcon>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          {currentUser ? (
            [<Nav.Link id={COMPONENT_IDS.NAVBAR_ADD_STUFF} as={NavLink} activeClassName="active" exact to="/add" key='add'>PAGE</Nav.Link>,
              <Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF} as={NavLink} activeClassName="active" exact to="/list" key='list'>PAGE</Nav.Link>]
          ) : ''}
          {Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]) ? (
            [<Nav.Link id={COMPONENT_IDS.NAVBAR_LIST_STUFF_ADMIN} as={NavLink} activeClassName="active" exact to="/admin" key='admin'>PAGE</Nav.Link>,
              <NavDropdown title='dropdown' id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN} item text="Manage" key="manage-dropdown">
                <NavDropdown.Item id={COMPONENT_IDS.NAVBAR_MANAGE_DROPDOWN_DATABASE} key="manage-database" as={NavLink} exact to="/manage-database" content="Database">PAGE</NavDropdown.Item>
              </NavDropdown>]
          ) : ''}
        </Nav>
        {currentUser === '' ? (
          <Nav className="float-right">
            <NavDropdown title={(<span>Login&nbsp;</span>)} align='end'>
              <NavDropdown.Item as={NavLink} exact to="/signin">
                &nbsp;Sign In
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} exact to="/signup">
                Sign Up
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className="float-right">
            <NavDropdown title={(<span>{this.props.currentUser}&nbsp;</span>)} align='end'>
              <NavDropdown.Item as={NavLink} exact to="/signout">
                  Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

// Declare the types of all properties.
NavBar.propTypes =
{
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => {
  const currentUser = Meteor.user() ? Meteor.user().username : '';
  return {
    currentUser,
  };
})(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
