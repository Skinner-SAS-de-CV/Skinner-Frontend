import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

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
  habilidades 
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
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("Error en la respuesta del servidor:", error.response.data);
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("No se recibió respuesta del servidor:", error.request);
    } else {
      // Ocurrió un error al configurar la solicitud
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw error;
  }
};






