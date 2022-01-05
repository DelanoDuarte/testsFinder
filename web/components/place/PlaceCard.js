import { Biotech, QueryBuilder } from "@mui/icons-material";
import { Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

const PlaceCard = ({ place }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "neutral.50",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pb: 3,
          }}
        >
          {/* <Avatar alt="Product" src={product.media} variant="square" /> */}
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {place.name}
        </Typography>
        {/* <Typography align="center" color="textPrimary" variant="body1">
          {product.description}
        </Typography> */}
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <QueryBuilder color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Biotech color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {place.amount_tests}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default PlaceCard;
