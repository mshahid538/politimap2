import React from "react";

import MapChart from "../components/map";


function MapPage(){
    return(
        <React.Fragment>
            <div className="text-center">
                <h1>INTERACTIVE ELECTION MAP – 2022</h1>
                <h5>SENATE ELECTIONS MAP</h5>
            </div>
            <div className="map-container">
                <MapChart />
            </div>
        </React.Fragment>
    )
}

export default MapPage;