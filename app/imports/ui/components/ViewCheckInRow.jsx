import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Dropdown } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { updateMethod, removeItMethod } from '../../api/base/BaseCollection.methods';
import { CheckIn } from '../../api/checkin/CheckinCollection';
import BSIcon from './BSIcon';
import { animalReadyEmail } from '../utilities/EmailTemplates';

/** Renders a single row in the ViewCheckIns table. */
const ViewCheckInRow = ({ ownerInfo }) => {
  // Owner ID as seen on the /view table
  const ownerID = `${ownerInfo.firstName}${ownerInfo.lastName.charAt(0)}-${ownerInfo._id.substring(0, 4)}`;

  // If the owner's pet has been cleared for pickup
  const canPickup = ownerInfo.status === 'Ready for pickup';

  // If logged in user is admin. Email field is only passed when user viewing page is admin
  const isAdmin = ownerInfo.email ? true : false;

  const sendReadyEmail = () => {
    const collectionName = CheckIn.getCollectionName();
    const updateData = { id: ownerInfo._id, status: 'Ready for pickup' };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Owner will be notified', `Notification will be sent to "${ownerInfo.email}"`, 'success'));
    Meteor.call('sendEmail', {
      to: ownerInfo.email,
      from: 'astruhoids@gmail.com',
      subject: 'Department of Agriculture',
      html: animalReadyEmail(ownerInfo.firstName),
    });
  };

  const deleteEntry = () => {
    const collectionName = CheckIn.getCollectionName();
    removeItMethod.callPromise({ collectionName, instance: ownerInfo._id })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Deletion Success',
        `Deleted Owner-entry "${ownerInfo.firstName} ${ownerInfo.lastName}"`,
        'success'));
  };

  return (
    <tr className={COMPONENT_IDS.VIEW_CHECK_IN_ROW}>
      <td className="h5">
        <Row sm className="justify-content-between">
          <Col sm="auto">
            <div className={`td-padding ${canPickup ? 'fw-bold' : ''}`}>
              {(isAdmin) ? (
                `${ownerInfo.firstName} ${ownerInfo.lastName}`
              ) : (
                ownerID
              )}
            </div>
          </Col>
          {(canPickup) ? (
            // Show button to signify that owner can pickup their pet
            <Col sm="auto">
              <div className="">
                <Button variant="success" className="no-click">
                  {(isAdmin) ? (
                    // Change button text depending if user is admin or normal user
                    <>Notified</>
                  ) : (
                    <>Ready for pickup</>
                  )}&nbsp;
                  <BSIcon icon={{ name: 'check-lg', width: 20, height: 20 }}/>
                </Button>
              </div>
            </Col>
          ) : (
            // Not ready for pickup
            <>
              {(!isAdmin) ? (
                // If not ready for pickup, and non-admin, show checked-in status
                <Col sm="auto">
                  <div className="">
                    <Button variant="outline-secondary" className="no-click">
                      Checked-in
                    </Button>
                  </div>
                </Col>
              ) : (
                <></>
              )}
            </>
          )}
        </Row>
        <div>
        </div>
      </td>

      {isAdmin ? (
      // Append admin options if user is admin
        <>
          <td className="h5">
            <div className="td-padding">{ownerInfo.email}</div>
          </td>
          <td className="h5">
            <div className="td-padding">
              {ownerInfo.phoneNumber}
            </div>
          </td>
          <td className="h5">
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary">
                Options
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {(canPickup) ? (
                  // Do not give the option if notification was already sent
                  <></>
                ) : (
                  // If pet is not ready for pickup, allow admins to notify owner that pickup is ready
                  <>
                    <Dropdown.Item
                      onClick={() => sendReadyEmail()}
                    >
                      Send ready email
                    </Dropdown.Item>
                  </>
                )}
                <Dropdown.Item
                  onClick={() => deleteEntry()}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </>
      ) : (
      // Append nothing if not admin
        <></>
      )}
    </tr>
  );
};

// Require a document to be passed to this component.
ViewCheckInRow.propTypes = {
  ownerInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default ViewCheckInRow;
