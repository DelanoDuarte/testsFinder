import { Container } from "@mui/material";
import { useFormik } from "formik";
import { Page } from "../../../components/shared";

import * as Yup from "yup";
import { useRouter } from "next/router";
import { PlaceForm } from "../../../components/place";

const NewPlace = (props) => {
  const navigate = useRouter();

  const PlaceSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    description: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    website: Yup.string(),
    address: Yup.object().shape({
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
      phone: "",
      website: "",
      address: {
        latitude: "",
        longitude: "",
      },
    },
    validationSchema: PlaceSchema,
    onSubmit: () => {
      navigate.push("/", {});
    },
  });

  return (
    <Page title="New Place">
      <Container maxWidth="lg">
        <PlaceForm formik={formik} />
      </Container>
    </Page>
  );
};

export default NewPlace;
