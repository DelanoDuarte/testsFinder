import { Container } from "@mui/material";
import { useFormik } from "formik";
import { Page } from "../../../components/shared";

import * as Yup from "yup";
import { useRouter } from "next/router";
import { PlaceForm } from "../../../components/place";
import { useSelector } from "react-redux";
import PlaceAPI from "../../../lib/api/PlaceAPI";

const NewPlace = (props) => {
  const navigate = useRouter();

  const locationAddress = useSelector((state) => state.location.address);
  const latLng = useSelector((state) => state.location.current);

  const PlaceSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    description: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    website: Yup.string(),
    amount_tests: Yup.number().required("Amount of tests is required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: undefined,
      phone: "",
      website: undefined,
      amount_tests: undefined,
      address: {
        mainStreet: "",
        additionalStreet: "",
        streetNumber: "",
        zip: "",
        city: "",
        country: "",
      },
    },
    validationSchema: PlaceSchema,
    onSubmit: ({ name, email, description, phone, website, amount_tests }) => {
      console.log(locationAddress);

      const { lat, lng } = { ...latLng };
      const address = { lat, lng, ...locationAddress };

      PlaceAPI.create({
        name,
        email,
        description,
        phone,
        website,
        amount_tests,
        address,
      })
        .then((res) => {
          if (res.status == 201) {
            navigate.push("/app/place");
          }
        })
        .catch((error) => console.log(error));
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
