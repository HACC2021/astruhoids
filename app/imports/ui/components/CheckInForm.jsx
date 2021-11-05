import React, { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';

const CheckInFrom = () => {
  const [number, setNumber] = useState('');
  const phoneNumberHandler = (num) => {
    console.log(num.length);
    // If what is typed is not a number or hyphen, replace with empty string
    let formatted = num.replace(/[^0-9]/g, '');
    if (formatted.length === 3) {
      formatted += '-';
    }
    console.log(formatted);
    setNumber(formatted);
  };

  const submitHandler = (data) => {
    const form = data.currentTarget;
    console.log(form);
  };

  return (
    <Card>
      <Card.Header><h2>Check-In</h2></Card.Header>
      <Card.Body>
        <Form onSubmit={submitHandler}>
          <Row>
            <Form.Group className='mb-3' as={Col} md={4} >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='FirstName'
              />
            </Form.Group>
            <Form.Group className='mb-3' as={Col} md={4} >
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='example@foo.com' />
            </Form.Group>
            <Form.Group className='mb-3' as={Col} md={4} >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type='tel'
                name='phone'
                pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                placeholder='XXX-XXX-XXXX'
                value={number}
                onChange={e => phoneNumberHandler(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>

          </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};
export default CheckInFrom;
