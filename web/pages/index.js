import { Biotech, Store } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { InformationCard } from "../components/dashboard";
import { Page } from "../components/shared";

export default function Home() {
  const envs = () => {
    console.log("Env URL variable", process.env.NEXT_PUBLIC_API_URL)
  }
  return (
    <Page title="TestsFinder">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <InformationCard
                title="Registered Places"
                amount={0}
                avatarIcon={<Store />}
                avatarColor={blue[200]}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <InformationCard
                title="Total Tests"
                amount={0}
                avatarIcon={<Biotech />}
                avatarColor={green[200]}
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}></Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}></Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}
