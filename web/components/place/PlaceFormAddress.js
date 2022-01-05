import { Close, Edit, Map } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationAPI from "../../lib/api/LocationAPI";
import {
  setCurrentAddress,
  setMarkerAsDraggable,
  setMarkerAsFixed,
} from "../../reducers/locationSlicer";
import { useSnackbar } from "notistack";

const PlaceFormAddress = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const latLng = useSelector((state) => state.location.current);
  const address = useSelector((state) => state.location.address);
  const isDraggable = useSelector((state) => state.location.draggable);

  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const setMarkerFixed = () => {
    dispatch(setMarkerAsFixed());
    enqueueSnackbar("The map marker is now anchored.", {
      variant: "info",
    });
  };

  const setMarkerDraggable = () => {
    dispatch(setMarkerAsDraggable());
    enqueueSnackbar("Now you can select your location using the map.", {
      variant: "info",
    });
  };

  useEffect(() => {
    if (latLng && latLng.lat && latLng.lng) {
      setIsLoading(true);
      LocationAPI.findByLatLng(latLng.lat, latLng.lng)
        .then((res) => dispatch(setCurrentAddress(res.data)))
        .then(() => setIsLoading(false));
    }
  }, [latLng]);

  return address ? (
    isLoading ? (
      <Skeleton
        variant="rectangular"
        width={600}
        height={300}
        animation="wave"
      />
    ) : (
      <Card sx={{ padding: 2 }} elevation={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <CardHeader subheader="Location" title="Place" sx={{ py: 2 }} />

          <Box>
            <IconButton
              color="primary"
              aria-label="Edit"
              onClick={() => setDisabled(false)}
            >
              <Edit />
            </IconButton>

            {isDraggable ? (
              <Tooltip title="Make the Marker Fixed">
                <IconButton
                  color="error"
                  aria-label="Edit"
                  onClick={setMarkerFixed}
                >
                  <Close />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Select the Location on the Map">
                <IconButton
                  color="primary"
                  aria-label="Edit"
                  onClick={setMarkerDraggable}
                >
                  <Map />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Street"
                name="name"
                disabled={disabled}
                variant="outlined"
                value={address.address}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="email"
                disabled={disabled}
                value={address.city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="email"
                disabled={disabled}
                value={address.country}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  ) : (
    <></>
  );
};

export default PlaceFormAddress;
