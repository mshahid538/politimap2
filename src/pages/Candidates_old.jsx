import { setItem } from 'localforage';
import React, { useEffect, useState } from 'react';
import {Route, Link, Routes, useParams, json} from 'react-router-dom';
import poliData from "../data/polidata1.json";

function Candidates() {
    let DEMO_KEY = "M3yT28EhnDUZkvhvSxMlKyYZCPX8mezTzrxU80QT";
    const {id} = useParams();
    const candidate = poliData.filter(item => item.FEC_Data.split("/")[item.FEC_Data.split("/").length-2] === id);

    const [apiData, setapiData] = useState(null);
    const [commityApiData, setCommityApiData] = useState(null);
    
    // const getCandidateAPI = () => {
    //     fetch(`https://api.open.fec.gov/v1/candidates/search/?candidate_id=${id}&api_key=${DEMO_KEY}`)
    //     .then(response => response.json())
    //     .then(data => setapiData(data))
    //     .catch(error => console.log(error));
    //   }
    // useEffect(() => {
    //     getCandidateAPI();
    // }, []);

    // const getCommityAPI = (committee_id) => {
    //     if (committee_id){
    //     fetch(`https://api.open.fec.gov/v1/committee/${committee_id}/reports/?api_key=${DEMO_KEY}`)
    //     .then(response => response.json())
    //     .then(data => setCommityApiData(data));
    //   }
    // }
    // useEffect(() => {
    //     getCommityAPI();
    // }, []);

  return (
    <div>
      <h1>Candidates id: {id}</h1>
      <h1>xlsx Data</h1>
      {candidate.map((item, index) => {
            return (
                <div key={index}>
                    <h2><b>Candidate Name:</b> {item.Candidate}</h2>
                    <p><b>Party:</b> {item.Party}</p>
                    <p><b>State:</b> {item.State}</p>
                    <p><b>FEC_Data:</b> {item.FEC_Data}</p>
                    <p><b>RCP_Poll_Average:</b> {item.RCP_Poll_Average}</p>
                    <p><b>Facebook_Campaign:</b> {item.Facebook_Campaign}</p>
                    <p><b>Facebook_Official:</b> {item.Facebook_Official}</p>
                    <p><b>Instagram_Campaign:</b> {item.Instagram_Campaign}</p>
                    <p><b>Instagram_Official:</b> {item.Instagram_Official}</p>
                    <p><b>Twitter_Campaign:</b> {item.Twitter_Campaign}</p>
                    <p><b>Twitter_Official:</b> {item.Twitter_Official}</p>
                    <p><b>OfficialWebsite:</b> {item.OfficialWebsite}</p>
                    <p><b>CampaignWebsite:</b> {item.CampaignWebsite}</p>
                    <p><b>Endorsements:</b> {item.Endorsements}</p>
                    <p><b>TrumpEndorsed:</b> {item.TrumpEndorsed}</p>
                </div>
            );
        })}
        <h1>API Data</h1>
        {/* {apiData && apiData.results[0].principal_committees.map((item, index) => {
            return (
                <div key={index}>
                    <p><b>committee Id:</b> {item.committee_id}</p>
                </div>
            );
        })} */}
        <h1>Facebook Data</h1>
    </div>
  );
}

export default Candidates;