import { API_URL } from "../api";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addProfile = async (formData: FormData, token: string | null) =>  {
    const response = await fetch(`${BACKEND_URL || API_URL}/perfiles/`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          "Error en la API. Verifica que el backend esté en línea."
        );
      }
}