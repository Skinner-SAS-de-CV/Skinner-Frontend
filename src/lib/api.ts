import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fastapi-resume-analyzer-production.up.railway.app";

interface AddJobParams {
  nombre_del_cliente: string;
  titulo_de_trabajo: string;
  perfil_del_trabajador: string;
  funciones_del_trabajo: string;
  habilidades: string;
}

export const addJob = async ({
  nombre_del_cliente,
  titulo_de_trabajo,
  perfil_del_trabajador,
  funciones_del_trabajo,
  habilidades,
}: AddJobParams): Promise<void> => {
  const formData = new FormData();
  formData.append("nombre_del_cliente", nombre_del_cliente);
  formData.append("titulo_de_trabajo", titulo_de_trabajo);
  formData.append("perfil_del_trabajador", perfil_del_trabajador);
  formData.append("funciones_del_trabajo", funciones_del_trabajo);
  formData.append("habilidades", habilidades);

  try {
    const response = await axios.post(`${API_URL}/agregar_trabajo/`, formData);
    console.log("Respuesta del servidor:", response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response.data);
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error;
  }
};

export interface Job {
  id: number;
  title: string;
  client_id: number;
}

// Esta función utiliza el endpoint para obtener trabajos por cliente,
// el endpoint /obtener_trabajos_por_cliente/{id}
// devuelve los trabajos asociados a ese cliente.
export const getJobsByClient = async (id: string): Promise<Job[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/obtener_trabajos_por_cliente/${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response.data);
    } else if (error.request) {
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error;
  }
};

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
  email: string;
  message: string;
}

export const addContact = async (
  contact: { name: string; email: string; message: string; }
): Promise<Contact> => {
  try {
    const response = await axios.post(`${API_URL}/contactanos/`, contact);
    return response.data;
  } catch (error: unknown) {
    console.error("Error al enviar el contacto:", error);
    throw error;
  }
};

