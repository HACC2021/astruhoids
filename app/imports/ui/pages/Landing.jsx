import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import BSIcon from '../components/BSIcon';

/** A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id={PAGE_IDS.LANDING} fluid className="text-center">
    <Row md className="mt-4">
      <Col md={{ span: 6, offset: 3 }}>
        <div>
          <h1 style={{ fontWeight: 'bolder' }}>Holoholona</h1>
          <p>Let us know you are here for your pet by checking in.</p>
          <Button variant="outline-primary" as={Link} to='/checkin'>Check-In</Button>
          {' '}
          <Button variant="outline-info" as={Link} to='/view'>View Check-Ins</Button>
        </div>
        <br />
      </Col>
    </Row>
    <Row style={{ backgroundColor: '#e6f0ff' }}>
      <Col md={{ span: 4, offset: 4 }} className='pt-2'>
        <BSIcon icon={{ name: 'envelope', width: 70, height: 70, fill: '#007bff' }} />
        <p className='pt-1'>You will receive an email notification when checking in and when your pet is ready for pick up</p>
      </Col>
    </Row>
    <Row>
      <Col md={{ span: 4, offset: 4 }} className='pt-2'>

        <BSIcon icon={{ name: 'info-circle', width: 65, height: 65, fill: '#17a2b8' }}/>
        <p className='pt-2'>Please note check-in order does not correspond to a queue order. The Department of Agriculture processes pets in the order they are delivered to our office.</p>
      </Col>
    </Row>
    <Row style={{ backgroundColor: '#e6f0ff' }} className='pt-2'>
      <Col md={{ span: 4, offset: 4 }}>
        <BSIcon icon={{ name: 'person-x', width: 70, height: 70, fill: '#28a745' }} />
        <p className='pt-1'>No account is required to check in.</p>
      </Col>
    </Row>
  </Container>
);

export default Landing;
