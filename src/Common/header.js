import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

const Header = () => (
  <header className="Header">
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">React Template</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="/about">About</NavItem>
        <NavItem eventKey={2} href="/contact">Contact</NavItem>
      </Nav>
    </Navbar>
  </header>
);

export default Header;
