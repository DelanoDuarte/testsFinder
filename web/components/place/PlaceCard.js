import { QueryBuilder, Science } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const LoadingSkeletonField = ({ variant, children }) => {
  if (children) return children;
  return <Skeleton variant={variant}></Skeleton>;
};

const PlaceCard = ({ place }) => {
  return (
    <Stack spacing={1}>
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
          <LoadingSkeletonField variant="text">
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {place.name}
            </Typography>
          </LoadingSkeletonField>
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
              <LoadingSkeletonField variant="text">
                <Typography
                  color="textSecondary"
                  display="inline"
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  Updated 2hr ago
                </Typography>
              </LoadingSkeletonField>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Science color="primary" />
              <LoadingSkeletonField variant="text">
                <Typography
                  color="textSecondary"
                  display="inline"
                  gutterBottom
                  sx={{ pl: 1 }}
                  variant="body2"
                >
                  <b>{place.amount_tests}</b>
                </Typography>
              </LoadingSkeletonField>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Stack>
  );
};

export default PlaceCard;
