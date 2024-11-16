import React from "react";
import { Card, ListGroup } from 'react-bootstrap';

const VotingDeadline = ({ data }) => (
  <Card>
    <Card.Body>
      {/* Title of the Card */}
      <Card.Title>
        {data.state} Election Information
      </Card.Title>
    </Card.Body>
    <div className="border-0 p-4 background-white" style={{ backgroundColor: '#fff' }}>
        <p className="text-muted mb-4">Here's everything you need to know for the election in {data.state}.</p>

        {/* General Election and Voting Dates */}
        <div className="mb-4">
          <h5 className="font-weight-bold text-dark">General Election Date</h5>
          <p className="text-muted">{data.election_date}</p>
        </div>

        <div className="mb-4">
          <h5 className="font-weight-bold text-dark">Early Voting Period</h5>
          <p className="text-muted">{data.early_voting_start_date} - {data.early_voting_end_date}</p>
        </div>

        {/* Registration Deadlines */}
        <div className="mb-4">
          <h5 className="font-weight-semibold text-dark">Registration Deadlines</h5>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0 p-0">
              <div className="d-flex justify-content-between">
                <span className="text-muted"><strong>In-Person Registration</strong></span>
                <span className="text-muted">{data["in-person_registration_deadline"] ? data["in-person_registration_deadline"] : data["in-person_deadline"]}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-0">
              <div className="d-flex justify-content-between">
                <span className="text-muted"><strong>By Mail Registration</strong></span>
                <span className="text-muted">{data.mail_registration_deadline? data.mail_registration_deadline : data.mail_deadline} ({data.mail_registration_deadline_type ? data.mail_registration_deadline_type : data.mail_deadline_type})</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-0">
              <div className="d-flex justify-content-between">
                <span className="text-muted"><strong>Online Registration</strong></span>
                <span className="text-muted">{data.online_registration_deadline}</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>

        {/* Absentee Ballot Deadlines */}
        <div>
          <h5 className="font-weight-bold text-dark">Absentee Ballot Deadlines</h5>
          <ListGroup variant="flush">
            <ListGroup.Item className="border-0 p-0">
              <div className="d-flex justify-content-between">
                <span className="text-muted"><strong>Request In-Person</strong></span>
                <span className="text-muted">{data["in-person_request_deadline"]}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-0">
              <div className="d-flex justify-content-between">
                <span className="text-muted"><strong>Request By Mail</strong></span>
                <span className="text-muted">{data.mail_request_deadline} ({data.mail_request_deadline_type})</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-0">
              <div className="d-flex justify-content-between">
                <span className="text-muted"><strong>Return In-Person</strong></span>
                <span className="text-muted">{data["in-person_return_deadline"]}</span>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 p-0">
              <div className="d-flex justify-content-between">
                <span className="text-muted"><strong>Return By Mail</strong></span>
                <span className="text-muted">{data.mail_return_deadline} ({data.mail_return_deadline_type})</span>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
    </div>
  </Card>
);

export default VotingDeadline;
