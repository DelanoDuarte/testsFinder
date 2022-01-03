import L from "leaflet";
import PlaceMarker from "../../public/images/hospital.png";
import LocationMarker from "../../public/images/location.png";

const placeMarker = new L.Icon({
  iconUrl: PlaceMarker.src,
  iconRetinaUrl: PlaceMarker.src,
  iconAnchor: new L.Point(0, 0),
  popupAnchor: new L.Point(0, 0),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [32, 32],
});

const positionMarker = new L.Icon({
  iconUrl: LocationMarker.src,
  iconRetinaUrl: LocationMarker.src,
  iconAnchor: new L.Point(0, 0),
  popupAnchor: new L.Point(0, 0),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [32, 32],
});

export { placeMarker, positionMarker };
