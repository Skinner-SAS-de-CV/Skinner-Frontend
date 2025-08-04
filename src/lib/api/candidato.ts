import { API_URL } from "../api";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getSaldo = async (id: string, token: string | null) => {
    const response = await fetch(`${BACKEND_URL || API_URL}/candidatos/${id}/saldo`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error(
            "Error en la API. Verifica que el backend esté en línea."
        );
    }
    return response.json();
}