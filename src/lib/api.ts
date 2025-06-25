import axios from "axios";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fastapi-resume-analyzer-production.up.railway.app";

export interface Client {
  id: number;
  name: string;
}

export const getClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get(`${API_URL}/clients/`);
    return response.data;
  } catch (error: unknown) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};

export interface Contact {
  id: number;
  name: string;
  name_company: string;
  email: string;
  message: string;
}

export const addContact = async (contact: {
  name: string;
  name_company: string;
  email: string;
  message: string;
}): Promise<Contact> => {
  const formData = new URLSearchParams();
  formData.append("name", contact.name);
  formData.append("name_company", contact.name_company);
  formData.append("email", contact.email);
  formData.append("message", contact.message);
  try {
    const response = await axios.post(`${API_URL}/contactanos/`, formData);
    return response.data;
  } catch (error: unknown) {
    console.error("Error al enviar el contacto:", error);
    throw error;
  }
};
