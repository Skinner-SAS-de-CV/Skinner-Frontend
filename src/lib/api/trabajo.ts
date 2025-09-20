import axios from "axios";
import z from "zod/v4";

// Por ahora, mover para schema o type archivo
// Backend no manda client_id, por ahora
const jobSchema = z.object({
  id: z.number(),
  title: z.string(),
  // nombre_del_cliente: z.string(),
  // titulo_de_trabajo: z.string(),
  // perfil_del_trabajador: z.string(),
  // funciones_del_trabajo: z.string(),
  // habilidades: z.string(),
  // created_at: z.string().optional(),
  // update_at: z.string().optional(),
});

const jobsSchema = z.array(jobSchema);

export const addJobParamsSchema = z.object({
    nombre_del_cliente: z.string().optional(),
    titulo_de_trabajo: z.string(),
    perfil_del_trabajador: z.string(),
    funciones_del_trabajo: z.string(),
    habilidades: z.string(),
    token: z.string().nullable(),
})

type AddJobParams = z.infer<typeof addJobParamsSchema>;

export type Job = z.infer<typeof jobSchema>;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Esta función utiliza el endpoint para obtener trabajos por cliente,
// el endpoint /obtener_trabajos_por_cliente/{id}
// devuelve los trabajos asociados a ese cliente.
export const getJobsByClient = async (id: string, token: string | null): Promise<Job[]> => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/trabajos`,
      { headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return jobsSchema.parse(response.data);
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


export const addJob = async ({
  nombre_del_cliente,
  titulo_de_trabajo,
  perfil_del_trabajador,
  funciones_del_trabajo,
  habilidades,
  token,
}: AddJobParams): Promise<void> => {
  const formData = new FormData();
  if(nombre_del_cliente ){
    formData.append("nombre_del_cliente", nombre_del_cliente);
  }
  formData.append("titulo_de_trabajo", titulo_de_trabajo);
  formData.append("perfil_del_trabajador", perfil_del_trabajador);
  formData.append("funciones_del_trabajo", funciones_del_trabajo);
  formData.append("habilidades", habilidades);

  try {
    const response = await axios.post(`${BACKEND_URL}/agregar_trabajo/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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