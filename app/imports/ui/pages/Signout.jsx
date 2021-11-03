import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import BSIcon from '../components/BSIcon';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
const Signout = () => {
  Meteor.logout();
  return (
    <Container className="d-flex" fluid id={PAGE_IDS.SIGN_OUT}>
      <Container>
        <Row md className="mt-4">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="text-center">
              <Card.Body>
                <BSIcon icon={{ name: 'box-arrow-right', width: 100, height: 100 }} />
                <Card.Title className="my-3" style={{ fontSize: '30px' }}>Signed out</Card.Title>
                <hr />
                <Card.Subtitle className="mb-3">
                  You have been signed out of your account.
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
    // <h2 id={PAGE_IDS.SIGN_OUT}>
    //   <p>You are signed out.</p>
    // </h2>
  );
};

export default Signout;
