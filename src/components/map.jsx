import React, { useEffect, useState, memo } from "react";
import { ListGroup, OverlayTrigger, Popover, Image } from "react-bootstrap";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Link } from "react-router-dom";
import { Grid, View, useTheme, SelectField , TextField, Text} from '@aws-amplify/ui-react';

import democraticLogo from "../assets/logo/democraticLogo.png";
import republicanLogo from "../assets/logo/republicanLogo.png";
import independentLogo from "../assets/logo/independentLogo.jpg";


const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const API_KEY = "Y26ZeFbtXnbkvefS4HtK1Fc9nCilHguGB3ajrE3L"; // Replace with your actual API key

const MapChart = ({ electionCycle, office, terms, state, party }) => {
    const { tokens } = useTheme();
    const [candidates, setCandidates] = useState([]);
    const [allCandidates, setAllCandidates] = useState([]);
    const [clickedCity, setClickedCity] = useState("");
    const [searchDelay, setSearchDelay] = useState("");

    const startYear = electionCycle.split("-")[0];

    // Debounce search input with delay
    useEffect(() => {
        const delay = setTimeout(() => {
            if (terms.length >= 3) {
                setSearchDelay(terms);
            } else {
                setSearchDelay(null);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [terms]);

    useEffect(() => {
        const fetchCandidates = async () => {
            let endpoint = `https://api.open.fec.gov/v1/candidates?per_page=100&incumbent_challenge=I&candidate_status=C&is_active_candidate=true&office=${office}&cycle=${startYear}&page=1&api_key=${API_KEY}`;
    
            if (searchDelay && searchDelay.trim()) {
                endpoint += `&q=${encodeURIComponent(searchDelay)}`;
            }

            if (state && state.trim()) {
                endpoint += `&state=${encodeURIComponent(state)}`;
            }

            if (party && party.trim()) {
                endpoint += `&party=${encodeURIComponent(party)}`;
            }
    
            try {
                const response = await fetch(endpoint);
                const data = await response.json();
                if (searchDelay) {
                    setCandidates(data.results); // Set filtered data
                } else {
                    setAllCandidates(data.results); // Set all candidates
                    setCandidates(data.results); // Set initial candidates too
                }
            } catch (error) {
                console.error("Error fetching candidate data:", error);
            }
        };
    
        fetchCandidates();
    }, [startYear, office, searchDelay, state, party]);

    // If the searchDelay is cleared, reset candidates to the full list
    useEffect(() => {
        if (!searchDelay) {
            setCandidates(allCandidates);
        }
    }, [searchDelay, allCandidates]);
    

    const stateAbbreviations = {
      "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
      "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
      "Florida": "FL", "Georgia": "GA", "Hawaii": "HI", "Idaho": "ID",
      "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
      "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
      "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
      "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
      "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
      "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
      "Oregon": "OR", "Pennsylvania": "PA", "Rhode Island": "RI", "South Carolina": "SC",
      "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX", "Utah": "UT",
      "Vermont": "VT", "Virginia": "VA", "Washington": "WA", "West Virginia": "WV",
      "Wisconsin": "WI", "Wyoming": "WY"
    };
  
  
    const popover = (geo) => {
      // Convert the full state name to an abbreviation
      const stateAbbreviation = stateAbbreviations[geo.properties.name];
      
      // Filter candidates by the state abbreviation
      const stateCandidates = candidates.filter(
          (candidate) => candidate.state === stateAbbreviation
      );
  
      return (
          <Popover id="popover-basic">
              <Popover.Header as="h3">
                  {stateCandidates.length === 0 ? "No Candidates in " : "Candidates in "}
                  {geo.properties.name}
              </Popover.Header>
              <ListGroup variant="flush">
                  {stateCandidates.map((candidate, index) => (
                      <ListGroup.Item
                          key={index}
                          to={`/candidates/${candidate.candidate_id}?year=${startYear}&state=${geo.properties.name}`}
                          as={Link}
                          className="d-flex justify-content-between align-items-start"
                      >
                          {candidate.name}
                          <Image
                              className="party-logo"
                              src={
                                  candidate.party === "DEM"
                                      ? democraticLogo
                                      : candidate.party === "REP"
                                      ? republicanLogo
                                      : independentLogo
                              }
                              alt="logo"
                          />
                      </ListGroup.Item>
                  ))}
              </ListGroup>
          </Popover>
      );
  };

    const handleClick = (geo) => {
        setClickedCity(geo.properties.name);
    };

     // Count candidates by party
     const democraticCandidatesCount = candidates.filter(candidate => candidate.party === 'DEM').length;
     const republicanCandidatesCount = candidates.filter(candidate => candidate.party === 'REP').length;
 

    return (
      <div data-tip="" id="keepinside">
            <View display="flex" justifyContent="center" alignItems="center" marginTop={tokens.space.small} padding={tokens.space.small}>

                {/* Left Candidate (Democratic) */}
                <View display="flex" flexDirection="column" alignItems="center" padding={tokens.space.large}>
                    <View 
                    style={{ width: '10px', height: '100%', backgroundColor: 'blue', marginRight: '15px' }} // Left streak line
                    />
                    <Image src={democraticLogo} alt="Democratic Candidate" width="40px" />
                    <Text fontSize="large" fontWeight="bold" color="blue.600">{democraticCandidatesCount} &nbsp;</Text>
                    <Text color="blue" fontWeight="bold"> Democratic</Text>
                </View>

                {/* Middle Section with Circle */}
                <View display="row" justifyContent="center" alignItems="center" textAlign="center" padding={tokens.space.large}>
                    <View 
                    style={{ 
                        width: '70px', 
                        height: '70px', 
                        borderRadius: '50%', 
                        backgroundColor: '#f0f0f0', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        border: '2px solid #000' 
                    }}
                    >
                    <Text fontSize="xl" fontWeight="bold">{candidates.length}</Text>
                    </View>
                    <Text fontSize="md" justifyContent="center" fontWeight="bold">Total</Text>
                    
                </View>

                {/* Right Candidate (Republican) */}
                <View display="flex" flexDirection="column" alignItems="center" padding={tokens.space.large}>
                    <View 
                    style={{ width: '10px', height: '100%', backgroundColor: 'red', marginLeft: '15px' }} // Right streak line
                    />
                    <Image src={republicanLogo} alt="Republican Candidate" width="40px" />
                    <Text fontSize="large" fontWeight="bold" color="red.600">{republicanCandidatesCount} &nbsp;</Text>
                    <Text color="red" fontWeight="bold"> Republican</Text>
                </View>
            </View>
            <ComposableMap projection="geoAlbersUsa">
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo, index) => {
                            // Convert state name to abbreviation
                            const stateAbbreviation = stateAbbreviations[geo.properties.name];
                            
                            // Find the first candidate for this state
                            const candidate = candidates.find(
                                (candidate) => candidate.state === stateAbbreviation
                            );
                            const party = candidate ? candidate.party : null;
    
                            // Set color based on party
                            let partyColor = "#DCDCDC"; // Default color if no candidates

                            if (candidate) {
                                if (party === "DEM") {
                                    partyColor = "#0000FF"; // Blue for Democratic party
                                } else if (party === "REP") {
                                    partyColor = "#FF0000"; // Red for Republican party
                                } else {
                                    partyColor = "#778899"; // Color if candidates exist but not in parties
                                }
                            } else {
                                partyColor = "#DCDCDC"; // Color if no candidates
                            }
                            
    
                            const isClicked = clickedCity === geo.properties.name;
    
                            return (
                                <OverlayTrigger
                                    key={index}
                                    trigger="click"
                                    rootClose
                                    placement="right"
                                    overlay={popover(geo)}
                                >
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={isClicked ? partyColor : "#C0C0C0"}
                                        onClick={() => handleClick(geo)}
                                        style={{
                                            default: {
                                                fill: partyColor,
                                                outline: "#101010",
                                                stroke: "#607D8B",
                                                strokeWidth: 1,
                                            },
                                            hover: {
                                                fill: partyColor,
                                                outline: "#101010",
                                                stroke: "#607D8B",
                                                strokeWidth: 1,
                                            },
                                            pressed: {
                                                outline: "#101010",
                                                stroke: "#607D8B",
                                                strokeWidth: 1,
                                            },
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
