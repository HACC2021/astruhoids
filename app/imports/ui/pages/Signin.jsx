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
  const submit = (e) => {
    e.preventDefault();
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        setError('Incorrect login');
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
                <img
                  src="/images/holoholona-logo.png"
                  width="200"
                  height="200"
                  className="d-inline-block align-top"
                  alt=""
                />
                <br /><br />
                <Card.Title className="mb-3">Admin Sign In</Card.Title>
                {error === '' ? (
                  ''
                ) : (
                  <Alert variant="danger" className="">
                      ERROR - {error}
                  </Alert>
                )}
                <Form onSubmit={e => submit(e)}>
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
                    <Button variant="primary" type="submit">
                      Sign In
                    </Button>
                  </div>
                </Form>
                <hr />
                <Card.Text>
                  <Link to="/checkin">Customer Checking In?</Link>
                </Card.Text>
              </Card.Body>
            </Card>
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
