import axios from "axios";
import { API_URL } from "../api";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getNiveles = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/nivel/`);
        return response.data;
      } catch (error: unknown) {
        console.error("Error al obtener niveles:", error);
        throw error;
      }
}