import React, { useEffect, useState } from 'react';
import {Container, Badge, Row, Col, Card, ListGroup, Alert } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import democraticLogo from "../assets/logo/democraticLogo.png";
import republicanLogo from "../assets/logo/republicanLogo.png";
import independentLogo from "../assets/logo/independentLogo.jpg";
import Tramp from "../assets/trump.png";

import { Facebook, Instagram, Twitter, Globe, Calendar3 } from 'react-bootstrap-icons';
import {Route, Link, Routes, useParams, json} from 'react-router-dom';
import NumberConverter from '../functions/NumberConverter';
import dayjs from "dayjs";

import poliData from "../data/polidata.json";

import stateDataSet from "../data/statedata.json";

function Candidates() {
    const loading = <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
    
    let DEMO_KEY = "M3yT28EhnDUZkvhvSxMlKyYZCPX8mezTzrxU80QT"; //abhishekpaul0055@gmail.com
    // let DEMO_KEY = "Dg8InCSmPPuEjN2CCS4S5yHJfYdrAlMvLMSW4uWS"
    
    const {id} = useParams();
        
    const candidate = (poliData.filter(item => item.FEC_Data.split("/")[item.FEC_Data.split("/").length-2] === id))[0];
    const profileImage = "https://politimap-storage-5e73cf8662941-staging.s3.ap-northeast-1.amazonaws.com/public/profile_image/" + candidate.Candidate.replace(/ /g, '') + ".jpeg";
    console.log(candidate);

    const statedara = stateDataSet.filter(item => item.State === candidate.State)[0];

    const [apiData, setapiData] = useState(null);
    const [apiData2, setapiData2] = useState([]);
    const [apiData3, setapiData3] = useState([]);

     const getCandidateAPI = async () => {
        if(candidate.Principal_Campaign_Committee_ID !== null){
            const response = await fetch(`https://api.open.fec.gov/v1/committee/${candidate.Principal_Campaign_Committee_ID}/reports/?api_key=${DEMO_KEY}`);
            const data = await response.json();
            console.log(response.status);
            setapiData(data.results[0]);  
        }
        if (candidate.Sponsored_Leadership_PAC_ID !== null){
            if(candidate.Sponsored_Leadership_PAC_ID.includes(",")){
                const CIDs = candidate.Sponsored_Leadership_PAC_ID.split(",");
                for (let i = 0; i < CIDs.length; i++) {
                    const response2 = await fetch(`https://api.open.fec.gov/v1/committee/${CIDs[i]}/reports/?api_key=${DEMO_KEY}`);
                    const data2 = await response2.json();
                    console.log(response2.status);
                    setapiData2(apiData2 => [...apiData2, data2.results]);
                } 
            }
            else{
                const response3 = await fetch(`https://api.open.fec.gov/v1/committee/${candidate.Sponsored_Leadership_PAC_ID}/reports/?api_key=${DEMO_KEY}`);
                const data3 = await response3.json();
                console.log(response3.status);
                setapiData3(data3.results);
            }
        }};
    
      
    useEffect(() => {
        getCandidateAPI();
    }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} md={3} lg={3}>
                <Card >
                    <div className='image-container'>
                        <Card.Img className='profile-image' variant="top" src={profileImage} />
                    </div>
                    <Card.Body className='pt-0'>
                        <Card.Title className='profile-card-title'> 
                            {candidate.Candidate}
                        </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                    {/* Facebook */}
                    <ListGroup.Item variant="light" className="d-flex justify-content-between align-items-start">
                        Facebook
                        <Facebook size={20} className="me-2" color='#3b5998' />
                    </ListGroup.Item>
                    {candidate.Facebook_Campaign ?
                        <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <React.Fragment>
                                    <a href={candidate.Facebook_Campaign} target="_blank" rel="noreferrer">
                                    { "@" + candidate.Facebook_Campaign.split("/")[candidate.Facebook_Campaign.split("/").length-1]}
                                    </a>
                                    {candidate.Facebook_Campaign_followers ? 
                                        <React.Fragment>
                                            <br />
                                            {"Followers: " + NumberConverter(candidate.Facebook_Campaign_followers)}
                                        </React.Fragment>
                                    : null} 
                                    <br />
                                </React.Fragment>
                                </div>
                            </div>
                        </ListGroup.Item>
                    : null}
                    { candidate.Facebook_Official ? 
                        <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <a href={candidate.Facebook_Official} target="_blank" rel="noreferrer">
                                {"@" + candidate.Facebook_Official.split("/")[candidate.Facebook_Official.split("/").length-1]}
                                </a>
                                {candidate.Facebook_Official_followers ?
                                    <React.Fragment>
                                        <br />
                                        {"Followers: " + NumberConverter(candidate.Facebook_Official_followers)}
                                    </React.Fragment>
                                : null}
                            </div>
                        </div>
                    </ListGroup.Item>
                : null}
                </ListGroup>
                {/* Instagram */}
                <ListGroup as="ol" className='trump-group' >
                    <ListGroup.Item variant="light" className="d-flex justify-content-between align-items-start">
                        Instagram
                        <Instagram size={20} className="me-2" color='#8a3ab9' />
                    </ListGroup.Item>
                    
                {candidate.Instagram_Campaign ?
                    <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <a href={candidate.Instagram_Campaign} target="_blank" rel="noreferrer">
                                {candidate.Instagram_Campaign && "@" + candidate.Instagram_Campaign.split("/")[candidate.Instagram_Campaign.split("/").length-1]}
                                </a>
                                {candidate.Instagram_Campaign_followers ?
                                    <React.Fragment>
                                        <br />
                                        {"Followers: " + NumberConverter(candidate.Instagram_Campaign_followers)}
                                        <br />
                                    </React.Fragment>
                                : null}
                            </div>
                        </div>
                    </ListGroup.Item>
                : null}
                {candidate.Instagram_Official ?
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <a href={candidate.Instagram_Official} target="_blank" rel="noreferrer">
                                {"@" + candidate.Instagram_Official.split("/")[candidate.Instagram_Official.split("/").length-1]}
                                </a>
                                {candidate.Instagram_Official_followers ?
                                <React.Fragment>
                                    <br />
                                    {"Followers: " + NumberConverter(candidate.Instagram_Official_followers)}
                                </React.Fragment>
                                : null}
                            </div>
                        </div>
                    </ListGroup.Item>
                : null}
                </ListGroup>
                {/* Twitter */}
                <ListGroup as="ol" className='trump-group' >
                    <ListGroup.Item variant="light" className="d-flex justify-content-between align-items-start">
                        Twitter
                        <Twitter size={20} className="me-2 float-left" color='#00acee' />
                    </ListGroup.Item>
                    {candidate.Twitter_Campaign ?
                    <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <React.Fragment>
                                    <a href={candidate.Twitter_Campaign} target="_blank" rel="noreferrer">
                                    {candidate.Twitter_Campaign && "@" + candidate.Twitter_Campaign.split("/")[candidate.Twitter_Campaign.split("/").length-1]}
                                    </a>
                                    <br />
                                    {candidate.Twitter_Campaign_followers && "Followers: " + NumberConverter(candidate.Twitter_Campaign_followers)}
                                    <br />
                                </React.Fragment>
                                </div>
                        </div>
                    </ListGroup.Item>
                    : null}
                    {candidate.Twitter_Official ?
                    <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <a href={candidate.Twitter_Official} target="_blank" rel="noreferrer">
                                {"@" + candidate.Twitter_Official.split("/")[candidate.Twitter_Official.split("/").length-1]}
                                </a>
                                {candidate.Twitter_Official_followers ?
                                    <React.Fragment>
                                    <br />
                                    {"Followers: " + NumberConverter(candidate.Twitter_Official_followers)}
                                </React.Fragment>       
                                : null}
                            </div>
                        </div>
                    </ListGroup.Item>
                    : null}
                    </ListGroup>
                </Card>
        </Col>
        <Col xs={12} md={6} lg={6}>
        <Alert variant={candidate.Party === "Democrat" ? "primary" : candidate.Party === "Republican" ? "danger" : "success"}>
          {"Politimap " + candidate.State + ", " + candidate.Party}
          <span style={{ float: "right" }}>
          {candidate.Party === "Democrat" ? <img className="party-logo" src={democraticLogo} alt="logo" /> : candidate.Party === "Republican" ? <img className="party-logo" src={republicanLogo} alt="logo" /> : <img className="party-logo" src={independentLogo} alt="logo" />}
          </span>
        </Alert>
        {/* Financial Summary */}
        <Card>
            <Card.Body>
                <Card.Title>Principal Campaign Committee | {apiData ? <a href={apiData.html_url} target="_blank" rel="noreferrer">GOVsite</a> : null} </Card.Title>
                Coverage Dates: {apiData ? dayjs(apiData.coverage_start_date).format('MM/DD/YYYY') + " to " + dayjs(apiData.coverage_end_date).format('MM/DD/YYYY')  
                : 
                loading
                    }
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Total Receipts
                    </div>
                    <span>{apiData ? NumberConverter(apiData.total_receipts_ytd) 
                    : 
                    loading
                    }</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Total Disbursements
                    </div>
                    <span>{apiData ? NumberConverter(apiData.total_disbursements_ytd) 
                        : 
                    loading
                    }
                    </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Ending Cash On Hand ( {apiData ? dayjs(apiData.coverage_end_date).format('MM/DD/YYYY') : "not found"} )
                    </div>
                    <span><b>{apiData ? NumberConverter(apiData.cash_on_hand_end_period) 
                        : 
                    loading
                    }
                    </b></span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        {/* Sponsored Leadership PACs */}
        {apiData3.length !== 0 ? <h5 className='committee-name'>Committee Name: {apiData3[0].committee_name}</h5> : null}
        {apiData3.length !== 0 ? 
        <Card className='mt-3'>
            <Card.Body>
                <Card.Title> Sponsored Leadership PACs | Cycle: {apiData3[0].cycle} | <a href={apiData3[0].html_url} target="_blank" rel="noreferrer">GOVsite</a></Card.Title>
                <b>Reclaim America PAC </b>
                Coverage Dates: {apiData3[0] ? dayjs(apiData3[0].coverage_start_date).format('MM/DD/YYYY') + " to " + dayjs(apiData3[0].coverage_end_date).format('MM/DD/YYYY') + " (" + apiData3[0].report_type_full + ")"
                : 
                loading
                }
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Total Receipts
                    </div>
                    <span>{apiData3[0] ? NumberConverter(apiData3[0].total_receipts_ytd) 
                    : 
                    loading
                    }</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Total Disbursements
                    </div>
                    <span>{apiData3[0] ? NumberConverter(apiData3[0].total_disbursements_ytd) 
                        : 
                    loading
                    }
                    </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Ending Cash On Hand ( {apiData3[0] ? dayjs(apiData3[0].coverage_end_date).format('MM/DD/YYYY') : "not found"} )
                    </div>
                    <span><b>{apiData3[0] ? NumberConverter(apiData3[0].cash_on_hand_end_period) 
                        : 
                    loading
                    }
                    </b></span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        : null}
        {apiData2[0] ? <h5 className='committee-name'>Committee Name: {apiData2[0][0].committee_name}</h5> : null}
        {apiData2[0] ? 
        <Card className='mt-3'>
            <Card.Body>
                <Card.Title> Sponsored Leadership PACs | Cycle: {apiData2[0][0].cycle} | <a href={apiData2[0][0].html_url} target="_blank" rel="noreferrer">GOVsite</a></Card.Title>
                <b>Reclaim America PAC </b>
                Coverage Dates: {apiData2[0][0] ? dayjs(apiData2[0][0].coverage_start_date).format('MM/DD/YYYY') + " to " + dayjs(apiData2[0][0].coverage_end_date).format('MM/DD/YYYY') + " (" + apiData2[0][0].report_type_full + ")"
                : 
                loading
                }
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Total Receipts
                    </div>
                    <span>{apiData2[0][0] ? NumberConverter(apiData2[0][0].total_receipts_ytd) 
                    : 
                    loading
                    }</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Total Disbursements
                    </div>
                    <span>{apiData2[0][0] ? NumberConverter(apiData2[0][0].total_disbursements_ytd) 
                        : 
                    loading
                    }
                    </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Ending Cash On Hand ( {apiData2[0][0] ? dayjs(apiData2[0][0].coverage_end_date).format('MM/DD/YYYY') : "not found"} )
                    </div>
                    <span><b>{apiData2[0][0] ? NumberConverter(apiData2[0][0].cash_on_hand_end_period) 
                        : 
                    loading
                    }
                    </b></span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
        : null }
        {apiData2[1] ? <h5 className='committee-name'> Committee Name: {apiData2[1][0].committee_name}</h5> : null}
        {apiData2[1] ? 
        <Card className='mt-3' >
            <Card.Body>
                <Card.Title> Sponsored Leadership PACs | Cycle: {apiData2[1][0].cycle} | <a href={apiData2[1][0].html_url} target="_blank" rel="noreferrer">GOVsite</a></Card.Title>
                <b>Reclaim America PAC </b>
                Coverage Dates: {apiData2[1][0] ? dayjs(apiData2[1][0].coverage_start_date).format('MM/DD/YYYY') + " to " + dayjs(apiData2[1][0].coverage_end_date).format('MM/DD/YYYY') + " (" + apiData2[1][0].report_type_full + ")"
                : 
                loading
                }
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Total Receipts
                    </div>
                    <span>{apiData2[1][0] ? NumberConverter(apiData2[1][0].total_receipts_ytd) 
                    : 
                    loading
                    }</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Total Disbursements
                    </div>
                    <span>{apiData2[1][0] ? NumberConverter(apiData2[1][0].total_disbursements_ytd) 
                        : 
                    loading
                    }
                    </span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Ending Cash On Hand ( {apiData2[1][0] ? dayjs(apiData2[1][0].coverage_end_date).format('MM/DD/YYYY') : "not found"} )
                    </div>
                    <span><b>{apiData2[1][0] ? NumberConverter(apiData2[1][0].cash_on_hand_end_period) 
                        : 
                    loading
                    }
                    </b></span>
                </ListGroup.Item>
            </ListGroup>
        </Card>
         : null}
        {/* Spending By Others */}
        <Alert variant="warning" className='mt-3'>
        Spending By Others <a href={candidate.Spending_by_Others_to_Support_or_Oppose} rel="noreferrer" target="_blank"> to Support and Oppose </a>
        </Alert>
        <Alert variant="warning" className='mt-3'>
          Polling, RCP Average <a href={candidate.RCP_Poll_Average} rel="noreferrer" target="_blank"> realclearpolitics </a>
        </Alert>
        {/* <Card className='mt-3'>
            <Card.Body>
                <Card.Title>Spending By Others</Card.Title>
                <Card.Text>
                Coverage Dates: 01/01/2020 to 12/31/2022
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        National Victory Action Fund
                    </div>
                    <span>1232</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Elect Republicans
                    </div>
                    <span>1232</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Women Speak Out PAC
                    </div>
                    <span>1432</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        TOTAL
                    </div>
                    <span><b>3432</b></span>
                </ListGroup.Item>
            </ListGroup>
        </Card> */}
        {/* In Opposition */}
        {/* <Card className='mt-3'>
            <Card.Body>
                <Card.Title>In Opposition</Card.Title>
                <Card.Text>
                Coverage Dates: coming soon...
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Unidosus Action PAC
                    </div>
                    <span>coming soon...</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Retire Him
                    </div>
                    <span>coming soon...</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Moveon.org Political Action
                    </div>
                    <span>coming soon...</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Really American PAC
                    </div>
                    <span>coming soon...</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        Vote Local Vote Blue
                    </div>
                    <span>coming soon...</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        For Our Future
                    </div>
                    <span>coming soon...</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        End Citizens United
                    </div>
                    <span>coming soon...</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-start">
                    <div className="fw-bold">
                        TOTAL
                    </div>
                    <span><b>coming soon...</b></span>
                </ListGroup.Item>
            </ListGroup>
        </Card> */}
        </Col>
        <Col xs={12} md={3} lg={3}>
        {/* Endorsements */}
        { candidate.TrumpEndorsed === 'Yes' || candidate.Endorsements.length ? (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>Endorsements</Card.Title>
            </Card.Body>
            <ListGroup as="ol" className='trump-group' >
            {candidate.TrumpEndorsed ?
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
                {candidate.Endorsements ? 
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <a href={candidate.Endorsements} target="_blank" rel="noreferrer" >
                            <h5><Badge bg="success">Other Endorsements</Badge></h5>
                        </a>
                    </ListGroup.Item>
                : null}
            </ListGroup>
        </Card>
        ) : null}
        {/* Social */}
        <Card>
            {/* Facebook */}
            <ListGroup as="ol" className='trump-group' >
                <ListGroup.Item>
                        <Globe size={20} className="me-2" />
                            <a href={candidate.Campaign_Website} target="_blank" rel="noreferrer" >Link to Campaign Website</a>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Globe size={20} className="me-2" />
                            <a href={statedara.Agency_Website} target="_blank" rel="noreferrer" >Link to Agency Website</a>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.General_Election_Date}
                            </div>
                            General Election Date
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">{statedara.Deadline_Voter_Registration_InPerson}</div>
                            Deadline for Voter Registration InPerson
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.Deadline_Voter_Registration_Online}
                            </div>
                            Deadline for Voter Registration Online
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.Deadline_Voter_Registration_By_Mail}
                            </div>
                            Deadline for Voter Registration By Mail
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.Deadline_to_Request_Absentee_Ballot_In_Person}
                            </div>
                            Deadline to Request Absentee Ballot In Person
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.Deadline_to_Request_Absentee_Ballot_Online}
                            </div>
                            Deadline to Request Absentee Ballot Online
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.Deadline_to_Request_Absentee_Ballot_By_Mail}
                            </div>
                            Deadline to Request Absentee Ballot By Mail
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.Deadline_to_Return_Ballot_In_Person}
                            </div>
                            Deadline to Return Ballot In Person
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.Deadline_to_Return_Ballot_By_Mail}
                            </div>
                            Deadline to Return Ballot By Mail
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-start">
                            <Calendar3 size={20} className="me-2" />
                            <div className="ms-2 me-auto">
                            <div className="fw-bold">
                            {statedara.Early_Voting_Dates}
                            </div>
                            Early Voting Dates
                            </div>
                        </ListGroup.Item>
            </ListGroup>
        </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Candidates;