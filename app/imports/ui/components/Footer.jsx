import React from 'react';
import { Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  const linkStyle = { textDecoration: 'none' };
  return (
    <footer>
      <Container fluid style={divStyle} className="text-center">
        <hr />
        <a href="https://devpost.com/software/astruhoids" target="_blank" rel=" noopener noreferrer" style={linkStyle}>
          AstrUHoids<br />
        </a>
        University of Hawaii<br />
        Honolulu, HI 96822 <br />
      </Container>
    </footer>
  );
};

export default Footer;
