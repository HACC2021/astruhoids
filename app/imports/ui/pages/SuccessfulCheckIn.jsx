import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import BSIcon from '../components/BSIcon';

/** Render a successful check in page if the user correctly fills out check in form */
const SuccessfulCheckIn = () => (
  <Container className="d-flex" fluid>
    <Container>
      <Row md className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="text-center">
            <Card.Body>
              <BSIcon icon={{ name: 'check2-circle', width: 100, height: 100 }}/>
              <Card.Title className="my-3" style={{ fontSize: '30px' }}>Thank you for checking in</Card.Title>
              <hr />
              <Card.Subtitle className="mb-3">
                You will receive an email or be called when your pet is ready
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Container>
);

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default SuccessfulCheckIn;
