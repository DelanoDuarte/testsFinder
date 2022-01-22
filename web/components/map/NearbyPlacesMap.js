import { LatLng } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { useDispatch } from "react-redux";
import { setCurrentLocation } from "../../reducers/locationSlicer";
import { placeMarker, positionMarker } from "./AppIconMarker";

const position = [51.505, -0.09];

const MyLocationMarker = ({ onLocationFound }) => {
  const [position, setPosition] = useState(null);
  const dispatch = useDispatch();

  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      dispatch(setCurrentLocation(e.latlng));
      onLocationFound(e.latlng);
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
          <b> {place.name} </b>
        </div>
      </Popup>

      <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
        <>
          <b> {place.amount_tests} </b> Covid Tests Available
        </>
      </Tooltip>
    </Marker>
  );
};

const NearbyPlacesMap = ({ places, onLocationFound }) => {
  return (
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

      <MyLocationMarker onLocationFound={onLocationFound} />
    </MapContainer>
  );
};

export default NearbyPlacesMap;
