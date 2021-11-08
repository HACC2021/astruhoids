import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the ViewCheckIns table. */
const ViewCheckInRow = ({ ownerInfo }) => { 
  return (
    <tr className={COMPONENT_IDS.VIEW_CHECK_IN_ROW}>
      <td className="h5">
        <Row md className="justify-content-md-between">
          <Col md>
            <div className="id-padding">
              {`${ownerInfo.firstName}-${ownerInfo._id.substring(0, 4)}`}
            </div>
          </Col>
          {(ownerInfo.email) ? (
            // Append admin options if email field is included.
            // This field is only passed when the logged-in user is an admin
            <Col md>
              <div className="float-end">
                <Button variant='primary'>Send Email Notification</Button>
                <Button variant='secondary' className="ms-2">See Contact Info</Button>
              </div>
            </Col>
          ) : (
            // Append nothing if not admin
            <></>
          )}
        </Row>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
ViewCheckInRow.propTypes = {
  ownerInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
};

export default ViewCheckInRow;