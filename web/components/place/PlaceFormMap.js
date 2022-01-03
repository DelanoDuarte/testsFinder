import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../../reducers/locationSlicer";
import { positionMarker } from "../map/AppIconMarker";

const position = [51.505, -0.09];

const CurrentLocationMarker = ({}) => {
  const [position, setPosition] = useState(null);
  const [draggable, setDraggable] = useState(false);

  const latLng = useSelector((state) => state.location.current);

  const dispatch = useDispatch();

  const map = useMapEvents({
    load() {
      if (latLng && latLng.lat && latLng.lng) {
        setPosition(latLng);
        map.flyTo(latLng, 12);
      }
    },
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      dispatch(setCurrentLocation(e.latlng));
      map.flyTo(e.latlng, 12);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={positionMarker}>
      <Popup>Your Position</Popup>
    </Marker>
  );
};

const PlaceFormMap = ({}) => {
  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: "100vh", width: "100wh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={16}
      />

      <CurrentLocationMarker />
    </MapContainer>
  );
};

export default PlaceFormMap;
