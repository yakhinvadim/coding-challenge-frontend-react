import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import ReactMapGL, { Marker } from "react-map-gl";
import queryString from "query-string";

import IncidentCardContent from "../IncidentCardContent/IncidentCardContent";
import { bikeWiseApi, mapBoxToken } from "../../constants/constants";
import {
  Incident,
  IncidentContent,
  MapViewport,
  Coordinates
} from "../../types";

import "mapbox-gl/dist/mapbox-gl.css";

const IncidentCardWithMap = ({ incidentId }: { incidentId: string }) => {
  const [incident, setIncident] = useState({
    title: "Loading..."
  } as IncidentContent);
  const [viewport, setViewport] = useState({} as MapViewport);
  const [pinCoordinates, setPinCoordinates] = useState({} as Coordinates);
  const mapHeight = 400;

  useEffect(() => {
    fetch(`${bikeWiseApi}/incidents/${incidentId}`)
      .then(response => response.json())
      .then(({ incident }: { incident: Incident }) => {
        setIncident(incident);

        return fetch(
          `${bikeWiseApi}/locations?${queryString.stringify({
            occurred_before: incident.occurred_at,
            occurred_after: incident.occurred_at,
            incident_type: "theft",
            query: incident.title
          })}`
        );
      })
      .then(response => response.json())
      .then(json => json.features[0].geometry.coordinates)
      .then(coordinates => {
        setViewport({
          zoom: 10,
          longitude: coordinates[0],
          latitude: coordinates[1]
        });
        setPinCoordinates({
          longitude: coordinates[0],
          latitude: coordinates[1]
        });
      });
  }, []);

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
