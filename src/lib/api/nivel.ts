import axios from "axios";
import { API_URL } from "../api";

export const getNiveles = async () => {
    try {
        const response = await axios.get(`${API_URL}/nivel/`);
        return response.data;
      } catch (error: unknown) {
        console.error("Error al obtener niveles:", error);
        throw error;
      }
}