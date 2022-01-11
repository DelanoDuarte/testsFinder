import { Box, Container, Grid, Pagination } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PlaceCard } from "../../../components/place";
import PlaceListToolbar from "../../../components/place/PlaceListToolbar";
import { Page } from "../../../components/shared";
import PlaceAPI from "../../../lib/api/PlaceAPI";

const PlaceIndex = (props) => {
  const router = useRouter();

  const [places, setPlaces] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [itemsPerPage, setTotalItemsPerPage] = useState(10);

  const onPageChange = (event, value) => {
    if (value === 1) {
      searchPlaces(itemsPerPage, 0);
      return;
    }
    searchPlaces(itemsPerPage, itemsPerPage + (value + 1));
  };

  const searchPlaces = (limit, offset) => {
    PlaceAPI.page(limit, offset).then((res) => {
      setPlaces(res.data.results);
      setTotalRecords(res.data.count);
    });
  };
  useEffect(() => {
    searchPlaces(itemsPerPage, 0);
  }, []);

  return (
    <Page title="Places">
      <Container maxWidth="lg">
        <PlaceListToolbar onAddPlace={() => router.push("place/new")} />

        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {places.map((place) => (
              <Grid item key={place.id} lg={4} md={6} xs={12}>
                <PlaceCard place={place} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 3,
          }}
        >
          <Pagination
            count={Math.ceil(totalRecords / itemsPerPage)}
            color="primary"
            size="small"
            onChange={onPageChange}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default PlaceIndex;
