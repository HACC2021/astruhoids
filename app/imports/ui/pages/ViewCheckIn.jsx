import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Card, Col, Row, Table, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { CheckIn } from '../../api/checkin/CheckinCollection';
import ViewCheckInRow from '../components/ViewCheckInRow';
import { PAGE_IDS } from '../utilities/PageIDs';

/** Page for users to view who is checked in and verify that they are checked in  */
const ViewCheckIn = ({ ready, checkIns }) => {
  return (ready) ? (
    <Container id={PAGE_IDS.VIEW_CHECK_INS}>
      <Row md className="mt-4">
        <Col md>
          <Card>
            <Card.Header className="h2">
              Current Check-Ins
            </Card.Header>
            <Card.Body>
              <p>
                Currently checked-in users are displayed below. If you are checked-in, you will
                be contacted when your pet has been cleared for release. If you have any questions
                please check out our helpful chat-bot at the bottom-right of this page.
              </p>
              <p><strong>
                Note: Check-in order does not correspond to a queue order. The Department of
                Agriculture processes pets in the order they are delivered to our office.
              </strong></p>
            </Card.Body>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="h4">Check-in ID</th>
                  </tr>
                </thead>
                <tbody>
                  {(checkIns.length > 0) ? (
                    checkIns.map((entry) => <ViewCheckInRow key={entry._id} ownerInfo={entry} />)
                  ) : (
                    <tr>
                      <td className="h5">
                        There is no one currently checked-in
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <></>
  );
};

ViewCheckIn.propTypes = {
  ready: PropTypes.bool.isRequired,
  checkIns: PropTypes.array.isRequired,
};

export default withTracker(() => {
  const subscription = CheckIn.subscribeCheckIn();
  const ready = subscription.ready();
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'ADMIN');

  // If user is admin, get all fields from Mongo
  // If no user is logged in or user is not admin, only fetch fields '_id' and 'firstName'
  const selectFields = (isAdmin) ? {} : { '_id': 1, 'firstName': 1 };

  const checkIns = CheckIn.find({}, {
    // Sort by firstName
    sort: { firstName: 1 },
    // Only include _id and firstName (excludes email and phoneNumber)
    fields: selectFields
  }).fetch();

  return {
    ready,
    checkIns,
    isAdmin,
  };
})(ViewCheckIn);
