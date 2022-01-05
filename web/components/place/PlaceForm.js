import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { Form, FormikProvider } from "formik";
import { PlaceFormMap, PlaceFormAddress } from ".";

const PlaceForm = ({ formik }) => {
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={6} xs={12}>
            <Card sx={{ padding: 2 }} elevation={3}>
              <CardHeader subheader="Create" title="Place" sx={{ py: 2 }} />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      variant="outlined"
                      {...getFieldProps("name")}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      type="text"
                      {...getFieldProps("phone")}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Website"
                      name="website"
                      {...getFieldProps("website")}
                      error={Boolean(touched.website && errors.website)}
                      helperText={touched.website && errors.website}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Amount of Covid Tests"
                      name="amount_tests"
                      {...getFieldProps("amount_tests")}
                      error={Boolean(
                        touched.amount_tests && errors.amount_tests
                      )}
                      helperText={touched.amount_tests && errors.amount_tests}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <PlaceFormAddress />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <LoadingButton
                  type="submit"
                  color="primary"
                  loading={isSubmitting}
                  loadingIndicator="Saving..."
                  variant="contained"
                >
                  Save
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
          <Grid item lg={4} md={6} xs={12}>
            <Card elevation={1} sx={{ height: "70%" }}>
              <PlaceFormMap />
            </Card>
          </Grid>
        </Grid>
      </form>
    </FormikProvider>
  );
};

export default PlaceForm;
