import React, { useState } from 'react';
import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { CheckIn } from '../../api/checkin/CheckinCollection';
import { checkedInEmail } from '../utilities/EmailTemplates';

const CheckInForm = () => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  /**
   * Takes in user input for their mobile number and formats it to be reader friendly
   * @param {*} num // Number typed by the user.
   */
  const phoneNumberHandler = (num) => {
    // If what is typed is not a number or hyphen, replace with empty string
    let formatted = num.replace(/[^0-9|-]/g, '');
    // Once the number is filled out, set the hyphens appropraitely
    formatted = formatted.replace(/(\d{3})-{0,1}(\d{3})-{0,1}(\d{4})/g, '$1-$2-$3');
    setNumber(formatted);
  };

  const submitHandler = (form) => {
    form.preventDefault();

    const definitionData = { firstName: name, email, phoneNumber: number };
    const collectionName = CheckIn.getCollectionName();

    defineMethod.callPromise({ collectionName, definitionData })
      .catch(e => swal('Error', e.message, 'error'))
      .then(() => {
        swal('Success', 'You have been checked in', 'success');
      });

    Meteor.call('sendEmail', {
      to: email,
      from: 'astruhoids@gmail.com',
      subject: 'Department of Agriculture',
      html: checkedInEmail(name, number),
    });
  };

  return (
    <Card>
      <Card.Header><h2>Check-In</h2></Card.Header>
      <Card.Body>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Row>
            <Form.Group className='mb-3' as={Col} md={4} >
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='FirstName'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' as={Col} md={4} >
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='example@foo.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' as={Col} md={4} >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                required
                type='tel'
                pattern={'[0-9]{3}-[0-9]{3}-[0-9]{4}'}
                placeholder='XXX-XXX-XXXX'
                maxLength={12}
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

export default CheckInForm;
