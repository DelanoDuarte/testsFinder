import { Container } from "@mui/material";
import { LatLng } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { Page } from "../../../../components/shared";
import { FIRST_FIVE_PHARMACIES } from "../../../../mocks/pharmacy";

import {
  placeMarker,
  positionMarker,
} from "../../../../components/map/AppIconMarker";
import { useState } from "react";

const position = [51.505, -0.09];

const MyLocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 14);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={positionMarker}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const PlaceMarker = ({ place }) => {
  const position = new LatLng(place.latitude, place.longitude);
  return (
    <Marker position={position} icon={placeMarker}>
      <Popup permanent>
        <div>
          <b> {place.amountTests} </b> Covid Tests Available
        </div>
      </Popup>

      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
        <div>
          <b> {place.amountTests} </b> Covid Tests Available
        </div>
      </Tooltip>
    </Marker>
  );
};

const PharmaciesMap = () => {
  return (
    <Page title="Find">
      <Container maxWidth="lg">
        <h6>Map View</h6>

        <MapContainer
          center={position}
          zoom={10}
          style={{ height: "100vh", width: "100wh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={20}
          />
          {FIRST_FIVE_PHARMACIES.map((p) => (
            <PlaceMarker key={p.id} place={p} />
          ))}

          <MyLocationMarker />
        </MapContainer>
      </Container>
    </Page>
  );
};

export default PharmaciesMap;
