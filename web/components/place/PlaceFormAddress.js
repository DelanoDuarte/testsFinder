import { Edit } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Skeleton,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationAPI from "../../lib/api/LocationAPI";
import { setCurrentAddress } from "../../reducers/locationSlicer";

const PlaceFormAddress = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const latLng = useSelector((state) => state.location.current);
  const address = useSelector((state) => state.location.address);

  const dispatch = useDispatch();

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

          <IconButton
            color="primary"
            aria-label="Edit"
            onClick={() => setDisabled(false)}
          >
            <Edit />
          </IconButton>
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
