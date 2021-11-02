import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Container, Form, FloatingLabel, Col, Row, Alert, Button, Card } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
const Signin = ({ location }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  // Handle Signin submission using Meteor's account mechanism.
  const submit = () => {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToReferer(true);
      }
    });
  };

  const { from } = location.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to page instead of login screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
  // Otherwise return the Login form.
  return (
    <Container className="d-flex" fluid id={PAGE_IDS.SIGN_IN}>
      <Container>
        <Row md className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="mb-3">Sign In</Card.Title>
                <Form onSubmit={submit}>
                  <FloatingLabel
                    controlId={COMPONENT_IDS.SIGN_IN_FORM_EMAIL}
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD}
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                  </FloatingLabel>
                  <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" fluid>
                      Sign In
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <Alert variant="success" className="mt-3">
              <Link to="/signup">Click here to Register</Link>
            </Alert>
            {error === '' ? (
              ''
            ) : (
              <Alert variant="danger" className="">
                Login failed - incorrect user or password
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

// Ensure that the React Router location object is available in case we need to redirect.
Signin.propTypes = {
  location: PropTypes.object,
};

export default Signin;
