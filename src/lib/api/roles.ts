import axios from "axios";

type PremiumResponse = {
    result: boolean;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const isPremium = async (token: string | null): Promise<PremiumResponse> => {
    try {
        const response = await axios.get(`${BACKEND_URL}/roles/premium`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error: unknown) {
        console.error("Error al obtener rol:", error);
        throw error;
    }
}