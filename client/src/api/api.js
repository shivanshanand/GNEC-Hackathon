import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API;

export const submitReport = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/report/submit`, data);
    return response.data;
  } catch (error) {
    console.error("Error submitting report:", error);
    throw error;
  }
};

export const getReports = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/report/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};
