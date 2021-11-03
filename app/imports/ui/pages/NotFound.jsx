import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';
import BSIcon from '../components/BSIcon';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const NotFound = () => (
  <Container className="d-flex" fluid id={PAGE_IDS.NOT_FOUND}>
    <Container>
      <Row md className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="text-center">
            <Card.Body>
              <BSIcon icon={{ name: 'emoji-frown', width: 100, height: 100 }} />
              <Card.Title className="my-3" style={{ fontSize: '30px' }}>Page not found</Card.Title>
              <hr />
              <Card.Subtitle className="mb-3">
                The URL you have requested does not exist.
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default NotFound;
