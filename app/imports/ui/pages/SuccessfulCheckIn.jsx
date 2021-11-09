import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import BSIcon from "../components/BSIcon";
import { Link, Redirect } from "react-router-dom";

/** Render a successful check in page if the user correctly fills out check in form */
const SuccessfulCheckIn = ({ location }) => {
  return location.state ? (
    // If state was passed from CheckInForm.jsx
    <Container className="d-flex" fluid>
      <Container>
        <Row md className="mt-4">
          <Col md={{ span: 8, offset: 2 }}>
            <Card className="text-center">
              <Card.Header className="h2">Thank you for checking in</Card.Header>
              <Card.Body>
                <BSIcon
                  icon={{
                    name: "check2-circle",
                    width: 100,
                    height: 100,
                    fill: "#198754"
                  }}
                />
                <Card.Title
                  className="my-3"
                  style={{ fontSize: "30px" }}
                >
                  Your Check-In ID is &quot;<strong>{location.state.checkInID}</strong>&quot;
                </Card.Title>
                <hr />
                <Card.Text className="mb-3">
                  You will receive an email at <strong>{location.state.email}</strong> or be called
                  at <strong>{location.state.phone}</strong> when your pet is ready. You may also
                  see if your pet is ready by checking for a status next to your Check-In ID
                  on the <Link to="/view">View Check-Ins Page</Link>.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  ) : (
    // No state was passed, redirect to landing
    <Redirect
      to={{
        pathname: "/",
        from: "/successfulcheckin",
      }}
    />
  );
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default SuccessfulCheckIn;
