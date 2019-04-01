import { useEffect, useState } from "react";
import queryString from "query-string";

import { bikeWiseApi } from "../constants/constants";
import { Incident, IncidentContent, MapViewport, Coordinates } from "../types";

import "mapbox-gl/dist/mapbox-gl.css";

const useIncidentAndMap = (incidentId: string) => {
  const [incident, setIncident] = useState({
    title: "Loading..."
  } as IncidentContent);
  const [viewport, setViewport] = useState({} as MapViewport);
  const [pinCoordinates, setPinCoordinates] = useState({} as Coordinates);
  const [error, setError] = useState(null as Error | null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetch(`${bikeWiseApi}/incidents/${incidentId}`, {
      signal
    })
      .then(response => response.json())
      .then(({ incident }: { incident: Incident }) => {
        setIncident(incident);

        return fetch(
          `${bikeWiseApi}/locations?${queryString.stringify({
            occurred_before: incident.occurred_at,
            occurred_after: incident.occurred_at,
            incident_type: "theft",
            query: incident.title
          })}`,
          { signal }
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
      })
      .catch(setError);

    return () => {
      controller.abort();
    };
  }, []);

  return { incident, viewport, setViewport, pinCoordinates, error };
};

export default useIncidentAndMap;
