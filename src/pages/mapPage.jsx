import React, { useState } from 'react';
import { Grid, View, useTheme, SelectField , TextField} from '@aws-amplify/ui-react';
import MapChart from "../components/map";
import '@aws-amplify/ui-react/styles.css';

function MapPage() {
    const { tokens } = useTheme();

    const [electionCycle, setElectionCycle] = useState("2024");
    const [office, setOffice] = useState("S");
    const [searchTerm, setSearchTerm] = useState("");

    const officeNames = {
        S: "Senate",
        H: "House of Representatives",
        P: "Presidential" // Assuming 'P' is used for Presidential elections
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
                            borderRadius="8px"
                            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                        >
                            <h4>Select Filters</h4>
                            <SelectField
                                label="Select Election Cycle"
                                placeholder="Election Cycle"
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
                            {/* Pass electionCycle and office as props */}
                            <MapChart electionCycle={electionCycle} office={office} terms={searchTerm} />
                        </View>
                        
                        {/* Right Column for additional information */}
                        <View
                            padding={tokens.space.medium}
                            borderRadius="8px"
                            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                            marginRight={20}
                        >
                            <h4>Search Candidate by Name</h4>
                            <TextField
                                label=""
                                placeholder="Type name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                marginBottom={tokens.space.small}
                            />
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
