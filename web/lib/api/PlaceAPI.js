import axios from "axios";
import { SERVER_BASE_URL } from "../constants";

const PlaceAPI = {
  create: async (place) =>
    axios.post(`${SERVER_BASE_URL}/place/`, { ...place }),
  all: () => axios.get(`${SERVER_BASE_URL}/place/`),
  page: async (limit, offset) =>
    axios.get(`${SERVER_BASE_URL}/place/page?offset=${offset}&limit=${limit}`),
  nearby: (latitude, longitude) =>
    axios.post(`${SERVER_BASE_URL}/place/nearby`, {
      latitude,
      longitude,
    }),
};

export default PlaceAPI;
