import axios from "axios";
import z from "zod/v4";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const clientsSchema = z.object({
  clientes: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  name: z.string(),
});


export type ClientResponse = z.infer<typeof clientsSchema>;

export const getClients = async (token: string | null): Promise<ClientResponse> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/clients/`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return clientsSchema.parse(response.data);
  } catch (error: unknown) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};
