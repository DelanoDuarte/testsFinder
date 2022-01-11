import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Page } from "../../../../components/shared";
import PlaceAPI from "../../../../lib/api/PlaceAPI";

import { useSnackbar } from "notistack";

const NearbyPlacesMap = dynamic(
  () => import("../../../../components/map/NearbyPlacesMap"),
  {
    ssr: false,
  }
);

const PlacesMap = () => {
  const [places, setPlaces] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const latLng = useSelector((state) => state.location.current);

  const checkNavigationPermission = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Position: ", position);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            enqueueSnackbar("You must activate the Geolocation.", {
              variant: "warning",
            });
            break;
          case error.POSITION_UNAVAILABLE:
            enqueueSnackbar("Location information is unavailable.", {
              variant: "warning",
            });
            break;
        }
      }
    );
  };

  useEffect(() => {
    checkNavigationPermission();

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
        <NearbyPlacesMap places={places} />
      </Container>
    </Page>
  );
};

export default PlacesMap;
