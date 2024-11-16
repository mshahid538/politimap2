import React, { useEffect, useState } from 'react';
import {Container, Badge, Row, Col, Card, ListGroup, Alert } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import democraticLogo from "../assets/logo/democraticLogo.png";
import republicanLogo from "../assets/logo/republicanLogo.png";
import independentLogo from "../assets/logo/independentLogo.jpg";
import Tramp from "../assets/trump.png";
import avatar from "../assets/logo/avatar.png";


import {Globe, Calendar3 } from 'react-bootstrap-icons';
import {useParams, useLocation} from 'react-router-dom';
import NumberConverter from '../functions/NumberConverter';
import dayjs from "dayjs";

import poliData from "../data/polidata.json";

import stateDataSet from "../data/statedata.json";
import Donate  from "../components/donate"
import VotingDeadline from "../components/VotingDeadline";
import deadline_data from "../data/voting_dates_all_cycles.json";

function Candidates() {

    const [candidate, setCandidate] = useState();
    const [committee, setCommittee] = useState(null);
    const [committeeReport, setCommitteeReport] = useState();


    const [deadlines, setDeadlines] = useState({});

    const loading = <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
    
    let DEMO_KEY = "M3yT28EhnDUZkvhvSxMlKyYZCPX8mezTzrxU80QT"; //abhishekpaul0055@gmail.com
    // let DEMO_KEY = "Dg8InCSmPPuEjN2CCS4S5yHJfYdrAlMvLMSW4uWS"
    
    const {id} = useParams();
    const location = useLocation();


    const filter_deadline_data = (year, state) => {
        if (!deadline_data[year]) {
            return `No data found for year ${year}`;
        }
        
        const stateData = deadline_data[year].find(
            (entry) => entry.state.toLowerCase() === state.toLowerCase()
        );
        if(stateData)
        {
            setDeadlines(stateData);
        }
    
    }

    const fecth_candidate = async () => {
        const url = `https://api.open.fec.gov/v1/candidate/${id}?api_key=${DEMO_KEY}`;
        
        try {
          // Sending GET request
          const response = await fetch(url);
      
          // Check if the response is OK (status 200-299)
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          // Parse JSON response
          const data = await response.json();
      
          // You can log the data or handle it as needed
          setCandidate(data.results[0]);
          console.log(data.results[0])
        } catch (error) {
          // Handle any errors that may occur
          console.error('There was an error fetching the candidate data:', error);
        }
      };

    const fecth_candidate_committee = async () => {
        const queryParams = new URLSearchParams(location.search);
        const year = queryParams.get("year");
        const url = `https://api.open.fec.gov/v1/candidate/${id}/committees/?api_key=${DEMO_KEY}&year=${year}&designation=P`;
    
    try {
        // Sending GET request
        const response = await fetch(url);
    
        // Check if the response is OK (status 200-299)
        if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
        }
    
        // Parse JSON response
        const data = await response.json();
    
        // You can log the data or handle it as needed
        setCommittee(data.results[0]);
        console.log(data.results[0])
    } catch (error) {
        // Handle any errors that may occur
        console.error('There was an error fetching the candidate data:', error);
    }
    };

    const fecth_candidate_committee_report = async () => {
        const queryParams = new URLSearchParams(location.search);
        const year = queryParams.get("year");
        const url = `https://api.open.fec.gov/v1/committee/${committee.committee_id}/reports/?api_key=${DEMO_KEY}&year=${year}&is_amended=false&type=S`;
    
        try {
            // Sending GET request
            const response = await fetch(url);
        
            // Check if the response is OK (status 200-299)
            if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
            }
        
            // Parse JSON response
            const data = await response.json();
        
            // You can log the data or handle it as needed
            setCommitteeReport(data.results);
            console.log(data.results[0])
        } catch (error) {
            // Handle any errors that may occur
            console.error('There was an error fetching the candidate data:', error);
        }
    };
      
      
    

    const candidate_static = (poliData.filter(item => item.FEC_Data.split("/")[item.FEC_Data.split("/").length-2] === id))[0];
    let profileImage = avatar
    if(candidate_static)
    {
         profileImage = "https://politimap-storage-5e73cf8662941-staging.s3.ap-northeast-1.amazonaws.com/public/profile_image/" + candidate_static.Candidate.replace(/ /g, '') + ".jpeg";
    }


    useEffect(() => {
        fecth_candidate().then( () => {});
        fecth_candidate_committee().then( () => {});
    }, []);

    useEffect(() => {
        if(committee){
            fecth_candidate_committee_report().then( () => {});
        }
        
    }, [committee]);

    
    
      
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const year = queryParams.get("year");
        const state = queryParams.get("state");

        if (year && state) {
            filter_deadline_data(year, state);
        }

    }, []); // Re-run when year or state changes

  return (
    <Container>
        { candidate ? (
            <Row>
                <Col xs={12} md={3} lg={3}>
                <Card >
                    <div className='image-container'>
                        <Card.Img className='profile-image' variant="top" src={profileImage} />
                    </div>
                    <Card.Body className='pt-0'>
                        <Card.Title className='profile-card-title'> 
                            {candidate.name}
                        </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        
                    <ListGroup.Item as="li" className="d-flex justify-content-between align-items-start">
                        <Donate />
                    </ListGroup.Item>
                    
                    </ListGroup>
                </Card>
                </Col>
                <Col xs={12} md={6} lg={6}>

                    <Alert variant={candidate.party === "DEM" ? "primary" : candidate.party === "REP" ? "danger" : "success"}>
                        {"Politimap " + candidate.state + ", " + candidate.party_full}
                        <span style={{ float: "right" }}>
                            {candidate.party === "DEM" ? <img className="party-logo" src={democraticLogo} alt="logo" /> : candidate.party === "REP" ? <img className="party-logo" src={republicanLogo} alt="logo" /> : <img className="party-logo" src={independentLogo} alt="logo" />}
                        </span>
                    </Alert>

                    {/* Financial Summary */}
                    {committeeReport && committeeReport.length > 0 ? (
                        committeeReport.map((report) => (
                            <Card key={report.file_number} className="mb-3">
                                <Card.Body>
                                    <Card.Title>
                                        Principal Campaign Committee |{" "}
                                        <a href={report.html_url} target="_blank" rel="noreferrer">
                                            GOVsite
                                        </a>
                                    </Card.Title>
                                    <p className='mt-2'><strong>Committee Name: </strong>{report.committee_name}</p>
                                    <p>
                                        <strong>Coverage Dates:</strong>{" "}
                                        {`${dayjs(report.coverage_start_date).format("MM/DD/YYYY")} to ${dayjs(
                                            report.coverage_end_date
                                        ).format("MM/DD/YYYY")}`}
                                    </p>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                        <div className="fw-bold">Total Receipts</div>
                                        <span className="black-span">
                                            ${NumberConverter(report.total_receipts_ytd)}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                        <div className="fw-bold">Total Disbursements</div>
                                        <span className="black-span">
                                            ${NumberConverter(report.total_disbursements_ytd)}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                        <div className="fw-bold">Ending Cash On Hand</div>
                                        <span className="black-span">
                                            ${NumberConverter(report.cash_on_hand_end_period)}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                        <div className="fw-bold">Net Contributions</div>
                                        <span className="black-span">
                                            ${NumberConverter(report.net_contributions_ytd)}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                        <div className="fw-bold">Operating Expenditures</div>
                                        <span className="black-span">
                                            ${NumberConverter(report.operating_expenditures_ytd)}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-start">
                                        <div className="fw-bold">Total Individual Contributions</div>
                                        <span className="black-span">
                                            ${NumberConverter(report.total_individual_contributions_ytd)}
                                        </span>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        ))
                    ) : (
                        loading
                    )}



                {/* Spending By Others */}
                {candidate_static && (
                    <>
                        <Alert variant="warning" className='mt-3'>
                        Spending By Others <a href={candidate_static.Spending_by_Others_to_Support_or_Oppose} rel="noreferrer" target="_blank"> to Support and Oppose </a>
                        </Alert>
                        <Alert variant="warning" className='mt-3'>
                        Polling, RCP Average <a href={candidate_static.RCP_Poll_Average} rel="noreferrer" target="_blank"> realclearpolitics </a>
                        </Alert>
                    </>
                ) }
                


                </Col>

                <Col xs={12} md={3} lg={3}>
                {/* Endorsements */}
                    {   candidate_static && (candidate_static.TrumpEndorsed === 'Yes' || candidate_static.Endorsements.length) ? 
                    (
                        <Card className='mb-3'>
                            <Card.Body>
                                <Card.Title>Endorsements</Card.Title>
                            </Card.Body>
                            <ListGroup as="ol" className='trump-group' >
                            {candidate_static.TrumpEndorsed ?
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <img className="trump" src={Tramp} alt="Tramp" />
                                    <div className="ms-2 me-auto">
                                        <h5><Badge bg="info">TrumpEndorsed</Badge></h5>
                                    </div>
                                </ListGroup.Item>
                                : null}
                                {candidate_static.Endorsements ? 
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                    >
                                        <a href={candidate_static.Endorsements} target="_blank" rel="noreferrer" >
                                            <h5><Badge bg="success">Other Endorsements</Badge></h5>
                                        </a>
                                    </ListGroup.Item>
                                : null}
                            </ListGroup>
                        </Card>
                    ) : null }


                <VotingDeadline data={deadlines} />
            
                </Col>
            </Row>
        ) : <Row>
            loading
            </Row>}
      
    </Container>
  );
}

export default Candidates;