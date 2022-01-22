import { useRef, useState } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
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
  const markerRef = useRef(null);

  const latLng = useSelector((state) => state.location.current);
  const draggable = useSelector((state) => state.location.draggable);

  const dispatch = useDispatch();

  const map = useMapEvents({
    load() {
      if (latLng && latLng.lat && latLng.lng) {
        setPosition(latLng);
        map.flyTo(latLng, 15);
      }
    },
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      dispatch(setCurrentLocation(e.latlng));
      map.flyTo(e.latlng, 16);
    },
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        if (marker.getLatLng() != latLng) {
          setPosition(marker.getLatLng());
          dispatch(setCurrentLocation(marker.getLatLng()));
        }
      }
    },
  });

  return position === null ? null : (
    <Marker
      draggable={draggable}
      position={position}
      icon={positionMarker}
      ref={markerRef}
    >
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
        maxZoom={20}
      />

      <CurrentLocationMarker />
    </MapContainer>
  );
};

export default PlaceFormMap;
