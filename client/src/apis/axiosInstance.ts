import axios from "axios";
import { configs } from "../constants";

const axiosInstance = axios.create({
	baseURL: configs.BACKEND_BASE_URL,
});

export default axiosInstance;
