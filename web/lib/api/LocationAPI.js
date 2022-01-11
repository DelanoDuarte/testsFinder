import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

const LocationAPI = {
  findByLatLng: async (latitude, longitude) =>
    axios.post(`${SERVER_BASE_URL}/location/find`, { latitude, longitude }),
};

export default LocationAPI;
