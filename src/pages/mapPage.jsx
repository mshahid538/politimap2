import React, { useState } from 'react';
import { Grid, View, useTheme, SelectField , TextField, Text, Image} from '@aws-amplify/ui-react';
import MapChart from "../components/map";
import '@aws-amplify/ui-react/styles.css';

import democraticLogo from "../assets/logo/democraticLogo.png";
import republicanLogo from "../assets/logo/republicanLogo.png";

function MapPage() {
    const { tokens } = useTheme();

    const [electionCycle, setElectionCycle] = useState("2024");
    const [office, setOffice] = useState("S");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("name");
    const [state, setState] = useState("");
    const [party, setParty] = useState("");

    const officeNames = {
        S: "Senate",
        H: "House of Representatives",
        P: "Presidential" // Assuming 'P' is used for Presidential elections
    };

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


    const generateElectionCycles = () => {
        const cycles = [];
        for (let year = 2024; year >= 1980; year -= 2) {
            cycles.push(year);  // Add only the even year
        }
        return cycles;
    };

    return (
        <React.Fragment>
            <div className="large">
                <div className="text-center">
                    <h1>INTERACTIVE ELECTION MAP – {electionCycle - 1 }-{electionCycle}</h1>
                    <h5>
                        <span style={{ textTransform: 'uppercase' }}>{officeNames[office]}</span> ELECTIONS MAP
                    </h5>
                    
                </div>
                <div className="map-container" style={{ padding: '0 20px' }}>
                    <Grid
                        templateColumns={{ base: "1fr", large: "18% 62% 18%" }}
                        gap={tokens.space.small}
                    >
                        {/* Left Column for Dropdowns */}
                        <View
                            padding={tokens.space.medium}
                            marginLeft={20}
                            height="40%"
                            borderRadius="8px"
                            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                        >
                            <h4>Select Filters</h4>
                            <SelectField
                                label="Select Election Cycle"
                                marginBottom={tokens.space.small}
                                onChange={(e) => setElectionCycle(e.target.value)}
                                value={electionCycle}
                            >
                                {generateElectionCycles().map((cycle) => (
                                    <option key={cycle} value={cycle}>
                                        {cycle - 1}-{cycle}
                                    </option>
                                ))}
                            </SelectField>
                            
                            <SelectField
                                label="Select Office"
                                onChange={(e) => setOffice(e.target.value)}
                                value={office}
                            >
                                <option value="S">Senate</option>
                                <option value="H">House of Representatives</option>
                            </SelectField>
                        </View>
                        
                        {/* Center Column for the Map Chart */}
                        <View 
                            display="flex" 
                            justifyContent="center" 
                            alignItems="center"
                            height="100%"
                        >
                            <MapChart electionCycle={electionCycle} office={office} terms={searchTerm} state={state} party={party} />
                            
                        </View>
                        
                        {/* Right Column for additional information */}
                        <View
                            padding={tokens.space.medium}
                            borderRadius="8px"
                            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                            marginRight={20}
                            height="40%"
                        >
                            <h4>Search Candidate</h4>
                            
                            {/* Radio buttons to select search type */}
                            <div onChange={(e) => setSearchType(e.target.value)} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.5rem', margin: '0.25rem' }}>
                                    <label>
                                        <input type="radio" value="name" name="searchType" defaultChecked onChange={ (e) => { setSearchTerm(""); setState(""); setParty(""); }} /> Name
                                    </label>
                                </div>
                                <div style={{ padding: '0.5rem', margin: '0.25rem' }}>
                                    <label>
                                        <input type="radio" value="state" name="searchType" onChange={ (e) => { setSearchTerm(""); setState(""); setParty(""); }} /> State
                                    </label>
                                </div>
                                <div style={{ padding: '0.5rem', margin: '0.25rem' }}>
                                    <label>
                                        <input type="radio" value="party" name="searchType" onChange={ (e) => { setSearchTerm(""); setState(""); setParty(""); }} /> Party
                                    </label>
                                </div>
                            </div>


                            {/* Conditional rendering based on selected search type */}
                            {searchType === "name" && (
                                <TextField
                                    label=""
                                    placeholder="Type name"
                                    value={searchTerm}
                                    onChange={(e) => {setSearchTerm(e.target.value);}}
                                    marginBottom={tokens.space.small}
                                />
                            )}
                            {searchType === "state" && (
                                <SelectField
                                    label=""
                                    placeholder="Select state"
                                    options={Object.keys(stateAbbreviations)} // Pass state names as strings
                                    onChange={(e) => setState(stateAbbreviations[e.target.value])} // Map to abbreviation on selection
                                    marginBottom={tokens.space.small}
                                />
                            )}
                            {searchType === "party" && (
                                <SelectField
                                    label=""
                                    placeholder="Select party"
                                    onChange={(e) => setParty(e.target.value)}
                                    marginBottom={tokens.space.small}
                                >
                                    <option value="DEM">Democratic</option>
                                    <option value="REP">Republican</option>
                                </SelectField>
                            )}
                        </View>
                    </Grid>
                    {/* Party Legend Section */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: '#0000FF', marginRight: '5px' }}></div>
                            <span>Democratic (DEM)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '15px' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: '#FF0000', marginRight: '5px' }}></div>
                            <span>Republican (REP)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: '#778899', marginRight: '5px' }}></div>
                            <span>Independent/Other</span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MapPage;
