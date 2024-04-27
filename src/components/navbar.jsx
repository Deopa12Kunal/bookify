import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Import Link component

const Mynavbar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand> {/* Use Link for the brand */}
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link> {/* Use Link for navigation */}
          <Nav.Link as={Link} to="/book/lists">Add Listing</Nav.Link>
          <Nav.Link href="#mmmm">Pricing</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Mynavbar;
