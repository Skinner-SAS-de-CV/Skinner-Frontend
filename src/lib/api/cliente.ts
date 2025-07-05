import axios from "axios";
import { API_URL } from "../api";
import z from "zod/v4";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const clientSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const clientsSchema = z.array(clientSchema);

export type Client = z.infer<typeof clientSchema>;

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/clients/`);
    return clientsSchema.parse(response.data);
  } catch (error: unknown) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};
