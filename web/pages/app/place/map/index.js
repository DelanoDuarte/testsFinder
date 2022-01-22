import { Container } from "@mui/material";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Page } from "../../../../components/shared";
import PlaceAPI from "../../../../lib/api/PlaceAPI";
import { HOST_PORT } from "../../../../lib/constants";

const NearbyPlacesMap = dynamic(
  () => import("../../../../components/map/NearbyPlacesMap"),
  {
    ssr: false,
  }
);

const PlacesMap = () => {
  const webSocketClient = new WebSocket(
    "ws://" + HOST_PORT + "/ws/places/nearby"
  );

  const [places, setPlaces] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const latLng = useSelector((state) => state.location.current);

  const sendLocationFoundEvent = (latLng) => {
    console.log(latLng);
    if (latLng && latLng.lat && latLng.lng) {
      webSocketClient.send(
        JSON.stringify({ latitude: latLng.lat, longitude: latLng.lng })
      );
    }
  };

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
    webSocketClient.onopen = () => {
      console.log("WS Connection Open");
    };

    webSocketClient.onerror = (error) => {
      console.log("WS Error: ", error);
    };
  }, []);

  useEffect(() => {
    checkNavigationPermission();

    webSocketClient.onmessage = (e) => {
      console.log("Message Received !");
      const places = JSON.parse(e.data)
      setPlaces(places);
    };
  }, [latLng]);

  return (
    <Page title="Find">
      <Container maxWidth="lg">
        <NearbyPlacesMap
          places={places}
          onLocationFound={(latLng) => sendLocationFoundEvent(latLng)}
        />
      </Container>
    </Page>
  );
};

export default PlacesMap;
