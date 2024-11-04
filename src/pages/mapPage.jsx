import React, { useState } from 'react';
import { Grid, View, useTheme, SelectField } from '@aws-amplify/ui-react';
import MapChart from "../components/map";
import '@aws-amplify/ui-react/styles.css';

function MapPage() {
    const { tokens } = useTheme();

    const [electionCycle, setElectionCycle] = useState("2023-2024");
    const [office, setOffice] = useState("S");

    const officeNames = {
        S: "Senate",
        H: "House of Representatives",
        P: "Presidential" // Assuming 'P' is used for Presidential elections
    };


    const generateElectionCycles = () => {
        const cycles = [];
        for (let year = 1975; year <= 2026; year += 2) {
            cycles.push(`${year}-${year + 1}`);
        }
        return cycles;
    };

    return (
        <React.Fragment>
            <div className="large">
                <div className="text-center">
                    <h1>INTERACTIVE ELECTION MAP – {electionCycle}</h1>
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
                                        {cycle}
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
                            <MapChart electionCycle={electionCycle} office={office} />
                        </View>
                        
                        {/* Right Column for additional information */}
                        <View
                            padding={tokens.space.medium}
                            borderRadius="8px"
                            boxShadow="0 2px 4px rgba(0,0,0,0.1)"
                            marginRight={20}
                        >
                            <h4>Additional Information</h4>
                            {/* You can add content here, or leave it empty */}
                        </View>
                    </Grid>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MapPage;
