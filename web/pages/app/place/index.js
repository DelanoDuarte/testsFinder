import { Box, Container, Grid, Pagination, Typography } from "@mui/material";
import { PlaceCard } from "../../../components/place";
import PlaceListToolbar from "../../../components/place/PlaceListToolbar";
import { Page } from "../../../components/shared";
import { PHARMACIES } from "../../../mocks/pharmacy";

import { useRouter } from "next/router";

const PlaceIndex = (props) => {
  const router = useRouter();

  return (
    <Page title="Places">
      <Container maxWidth="lg">
        <PlaceListToolbar onAddPlace={() => router.push("place/new")} />

        <Box sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            {PHARMACIES.map((pharmacy) => (
              <Grid item key={pharmacy.id} lg={4} md={6} xs={12}>
                <PlaceCard pharmacy={pharmacy} />
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
          <Pagination color="primary" count={3} size="small" />
        </Box>
      </Container>
    </Page>
  );
};

export default PlaceIndex;
