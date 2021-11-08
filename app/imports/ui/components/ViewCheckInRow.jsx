import React from "react";
import PropTypes from "prop-types";
import { Button, Row, Col, Dropdown } from "react-bootstrap";
import { COMPONENT_IDS } from "../utilities/ComponentIDs";

/** Renders a single row in the ViewCheckIns table. */
const ViewCheckInRow = ({ ownerInfo }) => {
	return (
		<tr className={COMPONENT_IDS.VIEW_CHECK_IN_ROW}>
			<td className="h5">
				<div className="td-padding">
					{`${ownerInfo.firstName}-${ownerInfo._id.substring(0, 4)}`}
				</div>
			</td>

			{ownerInfo.email ? (
				// Append admin options if email field is included.
				// This field is only passed when the logged-in user is an admin
				<>
			    <td className="h5">
						<div className="td-padding">
              {ownerInfo.email}
            </div>
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
								<Dropdown.Item href="#/action-1">
									Send notification email
								</Dropdown.Item>
								<Dropdown.Item href="#/action-2">
									Clear
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
