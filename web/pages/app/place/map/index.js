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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../../../../reducers/locationSlicer";
import PlaceAPI from "../../../../lib/api/PlaceAPI";

const position = [51.505, -0.09];

const MyLocationMarker = ({}) => {
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      dispatch(setCurrentLocation(e.latlng));
      map.flyTo(e.latlng, 16);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={positionMarker}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const PlaceMarker = ({ place }) => {
  const position = new LatLng(place.address.latitude, place.address.longitude);
  return (
    <Marker position={position} icon={placeMarker}>
      <Popup permanent>
        <div>
          <b> {place.amount_tests} </b> Covid Tests Available
        </div>
      </Popup>

      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
        <div>
          <b> {place.amount_tests} </b> Covid Tests Available
        </div>
      </Tooltip>
    </Marker>
  );
};

const PharmaciesMap = () => {
  const [places, setPlaces] = useState([]);

  const latLng = useSelector((state) => state.location.current);

  useEffect(() => {
    if (latLng) {
      const { lat, lng } = { ...latLng };
      setTimeout(() => {
        PlaceAPI.nearby(lat, lng)
          .then((res) => {
            setPlaces(res.data);
          })
          .catch((error) => console.log(error));
      }, 2000);
    }
  }, [latLng]);

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
          {places.map((place) => (
            <PlaceMarker key={place.id} place={place} />
          ))}

          <MyLocationMarker />
        </MapContainer>
      </Container>
    </Page>
  );
};

export default PharmaciesMap;
