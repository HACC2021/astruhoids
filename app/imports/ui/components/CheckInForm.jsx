import React, { useState } from 'react';
import { Card, Container, Col, Row, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { CheckIn } from '../../api/checkin/CheckinCollection';
import { checkedInEmail } from '../utilities/EmailTemplates';

const CheckInForm = () => {
  const [number, setNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInID, setCheckInID] = useState('');
  const [redirectTo, setRedirectTo] = useState(false);

  /**
   * Takes in user input for their mobile number and formats it to be reader friendly
   * @param {*} num // Number typed by the user.
   */
  const phoneNumberHandler = (num) => {
    // If what is typed is not a number or hyphen, replace with empty string
    let formatted = num.replace(/[^0-9|-]/g, '');
    // Once the number is filled out, set the hyphens appropriately
    formatted = formatted.replace(/(\d{3})-{0,1}(\d{3})-{0,1}(\d{4})/g, '$1-$2-$3');
    setNumber(formatted);
  };

  const submitHandler = (form) => {
    form.preventDefault();

    const definitionData = { firstName, lastName, email, phoneNumber: number };
    const collectionName = CheckIn.getCollectionName();

    defineMethod.callPromise({ collectionName, definitionData })
      .catch(e => swal('Error', e.message, 'error'))
      .then((_id) => {
        // Set checkInID to be passed when redirecting
        setCheckInID(`${firstName}${lastName.charAt(0)}-${_id.substring(0, 4)}`);
        swal('Success', 'You have been checked in', 'success');
        setRedirectTo(true);
      });

    Meteor.call('sendEmail', {
      to: email,
      from: 'astruhoids@gmail.com',
      subject: 'Department of Agriculture',
      html: checkedInEmail(firstName, number),
    });
  };

  // On success, redirect user to success page
  if (redirectTo) {
    // return <Redirect to={'/successfulcheckin'} useState/>;
    return <Redirect to={{
      pathname: '/successfulcheckin',
      state: { checkInID: checkInID, email: email, phone: number },
    }}/>;
  }

  return (
    <Container>
      <Row md className="mt-4">
        <Col md>
          <Card>
            <Card.Header className="h2">Check-In</Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => submitHandler(e)}>
                <Row>
                  <Form.Group className='mb-3' as={Col} md={6} >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      placeholder='FirstName'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' as={Col} md={6} >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      placeholder='LastName'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className='mb-3' as={Col} md={6} >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type='email'
                      placeholder='example@foo.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' as={Col} md={6} >
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckInForm;
