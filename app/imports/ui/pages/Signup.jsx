import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, FloatingLabel, Col, Row, Alert, Button, Card } from 'react-bootstrap';
import { Accounts } from 'meteor/accounts-base';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
const Signup = ({ location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToReferer] = useState(false);

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = () => {
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToReferer(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Redirect to={from} />;
  }
  return (
    <Container className="d-flex" fluid id={PAGE_IDS.SIGN_IN}>
      <Container>
        <Row md className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="mb-3">Sign Up</Card.Title>
                {error === '' ? (
                  ''
                ) : (
                  <Alert variant="danger" className="">
                      ERROR - {error}
                  </Alert>
                )}
                <Form onSubmit={submit}>
                  <FloatingLabel
                    controlId={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)}/>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}
                    label="Password"
                    className="mb-3"
                  >
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                  </FloatingLabel>
                  <div className="d-grid gap-2">
                    <Button variant="success" type="submit" fluid>
                      Sign Up
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer>
                Have an account?<Link to="/signin">&nbsp;Sign in</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
