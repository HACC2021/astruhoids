import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col, Dropdown } from "react-bootstrap";
import { COMPONENT_IDS } from "../utilities/ComponentIDs";
import { updateMethod, removeItMethod } from '../../api/base/BaseCollection.methods';
import { CheckIn } from "../../api/checkin/CheckinCollection";
import swal from "sweetalert";
import BSIcon from "./BSIcon";

/** Renders a single row in the ViewCheckIns table. */
const ViewCheckInRow = ({ ownerInfo }) => {
  // Owner ID as seen on the /view table
  const ownerID = `${ownerInfo.firstName}-${ownerInfo._id.substring(0, 4)}`;

  // If the owner's pet has been cleared for pickup
  const canPickup = ownerInfo.status === 'Ready for pickup';

  const sendReadyEmail = () => {
    const collectionName = CheckIn.getCollectionName();
    const updateData = { id: ownerInfo._id, status: 'Ready for pickup'};
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Owner will be notified', `Notification will be sent to "${ownerID}"`, 'success'));
    // TODO: Send email
  };

  const deleteEntry = () => {
    const collectionName = CheckIn.getCollectionName();
    removeItMethod.callPromise({ collectionName, instance: ownerInfo._id })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Deletion Success', `Deleted Check-in ID "${ownerID}"`, 'success'));
  };

	return (
		<tr className={COMPONENT_IDS.VIEW_CHECK_IN_ROW}>
			<td className="h5">
        <Row sm>
          <Col sm>
            <div className={`td-padding ${canPickup ? 'fw-bold' : ''}`}>
              {ownerID}
            </div>
          </Col>
          {(canPickup) ? (
            // Show button to signify that owner can pickup their pet
            <Col sm>
              <div className="float-end">
                <Button variant="success" className="no-click">
                  Ready for pickup&nbsp;
                  <BSIcon icon={{ name: 'check-lg', width: 20, height: 20 }}/>
                </Button>
              </div>
            </Col>
          ) : (
            // If not ready for pickup, show nothing
            <></>
          )}

        </Row>
        <div>
        </div>
			</td>

			{ownerInfo.email ? (
				// Append admin options if email field is included.
				// This field is only passed when the logged-in user is an admin
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
		email: PropTypes.string,
		phoneNumber: PropTypes.string,
	}).isRequired,
};

export default ViewCheckInRow;
