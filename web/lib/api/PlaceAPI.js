import { SERVER_BASE_URL } from "../constants";
import axios from "axios";

const PlaceAPI = {
  create: async (place) =>
    axios.post(`${SERVER_BASE_URL}/place/`, { ...place }),
  all: () => axios.get(`${SERVER_BASE_URL}/place/`),
  page: (limit, offset) =>
    axios.get(`${SERVER_BASE_URL}/place/page?limit=${limit}&offset=${offset}`),
  nearby: (latitude, longitude) =>
    axios.post(`${SERVER_BASE_URL}/place/nearby`, { latitude, longitude }),
};

export default PlaceAPI;
