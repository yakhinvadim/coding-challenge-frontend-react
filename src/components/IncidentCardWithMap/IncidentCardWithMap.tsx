import React from "react";
import Paper from "@material-ui/core/Paper";
import ReactMapGL, { Marker } from "react-map-gl";

import IncidentCardContent from "../IncidentCardContent/IncidentCardContent";
import { mapBoxToken } from "../../constants/constants";
import useIncidentAndMap from "../../hooks/useIncidentAndMap";

import "mapbox-gl/dist/mapbox-gl.css";

const IncidentCardWithMap = ({ incidentId }: { incidentId: string }) => {
  const { incident, viewport, setViewport, pinCoordinates } = useIncidentAndMap(
    incidentId
  );
  const mapHeight = 400;

  return (
    <Paper>
      <IncidentCardContent incident={incident} />
      {viewport.latitude &&
      viewport.longitude &&
      pinCoordinates.latitude &&
      pinCoordinates.longitude ? (
        <ReactMapGL
          mapStyle="mapbox://styles/mapbox/streets-v11"
          width="100%"
          height={mapHeight}
          mapboxApiAccessToken={mapBoxToken}
          onViewportChange={viewport => setViewport(viewport)}
          {...viewport}
        >
          <Marker
            latitude={pinCoordinates.latitude}
            longitude={pinCoordinates.longitude}
            offsetLeft={-6}
            offsetTop={-11}
          >
            <div>📍</div>
          </Marker>
        </ReactMapGL>
      ) : (
        <div style={{ height: mapHeight, backgroundColor: "#EFE9E1" }} />
      )}
    </Paper>
  );
};

export default IncidentCardWithMap;
