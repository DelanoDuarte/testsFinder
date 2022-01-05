import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Page } from "../../../../components/shared";
import PlaceAPI from "../../../../lib/api/PlaceAPI";

const NearbyPlacesMap = dynamic(
  () => import("../../../../components/map/NearbyPlacesMap"),
  {
    ssr: false,
  }
);

const PlacesMap = () => {
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
        <NearbyPlacesMap places={places} />
      </Container>
    </Page>
  );
};

export default PlacesMap;
