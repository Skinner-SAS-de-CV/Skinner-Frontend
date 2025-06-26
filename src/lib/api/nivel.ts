import axios from "axios";

// Cuando terminemos la migración a nestjs, cambiar esto por api url
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