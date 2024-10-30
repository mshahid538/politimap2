import React, { memo, useState } from "react";
import Popup from "reactjs-popup";
import { Card, ListGroup } from 'react-bootstrap';
import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import poliData from "../data/polidata1.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const MapChart = () => {

    const alertClicked = () => {
        alert('You clicked the third ListGroupItem');
      };

    const [clickedCity, setClickedCity] = useState("");
    const handleClick = (geo) => {
        setClickedCity(geo.properties.name);
        console.log(clickedCity);
      };
    
  return (
    <div data-tip="" id="keepinside">
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
      {({ geographies }) =>
          geographies.map(geo => {
            const isClicked = clickedCity === geo.properties.name;
            return (
                <Popup
                    key={geo.rsmKey}
                    trigger={
                        <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isClicked ? "#E42" : "#D6D6DA"}
                        onClick={() => handleClick(geo)}
                        style={{
                            default: {
                            // fill: "#D6D6DA",
                            outline: "#101010"
                            },
                            hover: {
                            fill: "#F53",
                            outline: "#101010"
                            },
                            pressed: {
                            fill: "#E42",
                            outline: "#101010"
                            }
                        }}
                    />
                    }
                    closeOnDocumentClick
                    position="right center"
                    on="focus"
                >
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Candidates in {geo.properties.name}</Card.Title>
                        {/* <ListGroup >
                        {poliData.map((item, index) => {
                            if (item.State === geo.properties.name) {
                                return (
                                    <ListGroup.Item key={index} active onClick={alertClicked}>
                                        {item.Candidate}
                                    </ListGroup.Item>
                                );
                            }
                        })}
                        </ListGroup> */}
                        <ListGroup as="ol">
                        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                        <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                    </Card>
                </Popup>
            );
          })
        }
      </Geographies>
    </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
