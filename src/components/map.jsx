import React, { memo, useState } from "react";

import { ListGroup, OverlayTrigger, Popover, Image } from 'react-bootstrap';
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import {Link} from 'react-router-dom';
import poliData from "../data/polidata.json";
import stateDataSet from "../data/statedata.json";
import democraticLogo from "../assets/logo/democraticLogo.png";
import republicanLogo from "../assets/logo/republicanLogo.png";
import independentLogo from "../assets/logo/independentLogo.jpg";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const MapChart = () => {
    const popover = (geo) => {
        const candidates = poliData.filter(item => item.State === geo.properties.name )
        // console.log(candidates);
        return (
        <Popover id="popover-basic">
          <Popover.Header as="h3">
            {candidates.length === 0 ? "No Candidates in " : "Candidates in "}
            {geo.properties.name}
          </Popover.Header>
         
                            <ListGroup variant="flush" >
                                {candidates.map((item, index) => {
                                 let url = item.FEC_Data.split("/"); 
                                  let CandidateId = url[url.length-2]
                                        return (
                                            <ListGroup.Item 
                                                key={index} 
                                                to={`/candidates/${CandidateId}`}
                                                as={Link}
                                                className="d-flex justify-content-between align-items-start"
                                            >
                                                {item.Candidate}
                                                <Image 
                                                className="party-logo" 
                                                src={item.Party === "Democrat" ? democraticLogo : item.Party === "Republican" ? republicanLogo : independentLogo} 
                                                alt="logo" />
                                            </ListGroup.Item>
                                        );
                                })}
                            </ListGroup>
         
        </Popover>
      );
    }

    const [clickedCity, setClickedCity] = useState("");
    const handleClick = (geo) => {
        setClickedCity(geo.properties.name);
      };
    
  return (
    <div data-tip="" id="keepinside">
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
      {({ geographies }) =>
          geographies.map((geo, index) => {
            const isClicked = clickedCity === geo.properties.name;
            const party = stateDataSet.filter(item => item.State === geo.properties.name).map(item => item.Party);
            const partycolor = party[0] === "Democrat" ? "#0000FF" : party[0] === "Republican" ? "#FF0000" : "#DCDCDC";
            return (
                <OverlayTrigger key={index} trigger="click" rootClose placement="right" overlay={popover(geo)}>
                        <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isClicked ? partycolor : "#C0C0C0"}
                        onClick={() => handleClick(geo)}
                        style={{
                            default: {
                            fill: partycolor,
                            outline: "#101010",
                            stroke: "#607D8B",
                            strokeWidth: 1,
                            },
                            hover: {
                            fill: partycolor,
                            outline: "#101010",
                            stroke: "#607D8B",
                            strokeWidth: 1,
                            },
                            pressed: {
                            outline: "#101010",
                            stroke: "#607D8B",
                            strokeWidth: 1,
                            }
                        }}
                    />
                    </OverlayTrigger>
            );
          })
        }
      </Geographies>
    </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
