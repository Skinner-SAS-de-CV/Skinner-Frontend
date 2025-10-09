import axios from "axios";
import z from "zod/v4";

// Por ahora, mover para schema o type archivo
// Backend no manda client_id, por ahora
const jobSchema = z.object({
  id: z.number(),
  title: z.string(),
  nombre_del_cliente: z.string(),
  titulo_de_trabajo: z.string(),
  perfil_del_trabajador: z.string(),
  funciones_del_trabajo: z.string(),
  habilidades: z.string(),
  created_at: z.string().optional(),
  update_at: z.string().optional(),
});

const jobsResponseSchema = z.array(jobSchema.pick({
  id: true,
  title: true,
}));


export const addJobParamsSchema = z.object({
  nombre_del_cliente: z.string().optional(),
  titulo_de_trabajo: z.string(),
  perfil_del_trabajador: z.string(),
  funciones_del_trabajo: z.string(),
  habilidades: z.string(),
  token: z.string().nullable(),
})

export const updateJobParamsSchema = z.object({
  id: z.number(),
  nombre_del_cliente: z.string().optional(),
  titulo_de_trabajo: z.string(),
  perfil_del_trabajador: z.string(),
  funciones_del_trabajo: z.string(),
  habilidades: z.string(),
  token: z.string().nullable(),
});

export const getJobResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  clientes: z.object({
    name: z.string(),
  }),
  perfil_del_trabajador: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  funciones_del_trabajo: z.array(z.object({
    id: z.number(),
    title: z.string(),
  })),
  habilidades: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
});

type GetJobResponse = z.infer<typeof getJobResponseSchema>;


type AddJobParams = z.infer<typeof addJobParamsSchema>;
type UpdateJobParams = z.infer<typeof updateJobParamsSchema>;


export type JobResponse = z.infer<typeof jobsResponseSchema>;
export type Job = z.infer<typeof jobSchema>;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Esta función utiliza el endpoint para obtener trabajos por cliente,
// devuelve los trabajos asociados a ese cliente.
export const getJobsByClient = async (id: string, token: string | null): Promise<JobResponse> => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/trabajos`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return jobsResponseSchema.parse(response.data);
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

// Obtener un trabajo por ID
export const getJobById = async (id: number, token: string | null): Promise<GetJobResponse> => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/trabajos/${id}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return getJobResponseSchema.parse(response.data);
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
  if (nombre_del_cliente) {
    formData.append("nombre_del_cliente", nombre_del_cliente);
  }
  formData.append("titulo_de_trabajo", titulo_de_trabajo);
  formData.append("perfil_del_trabajador", perfil_del_trabajador);
  formData.append("funciones_del_trabajo", funciones_del_trabajo);
  formData.append("habilidades", habilidades);

  try {
    const response = await axios.post(`${BACKEND_URL}/trabajos/`, formData, {
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

// Actualizar trabajo existente
export const updateJob = async ({
  id,
  nombre_del_cliente,
  titulo_de_trabajo,
  perfil_del_trabajador,
  funciones_del_trabajo,
  habilidades,
  token,
}: UpdateJobParams): Promise<void> => {
  const formData = new FormData();
  if (nombre_del_cliente) {
    formData.append("nombre_del_cliente", nombre_del_cliente);
  }
  formData.append("titulo_de_trabajo", titulo_de_trabajo);
  formData.append("perfil_del_trabajador", perfil_del_trabajador);
  formData.append("funciones_del_trabajo", funciones_del_trabajo);
  formData.append("habilidades", habilidades);

  try {
    const response = await axios.put(`${BACKEND_URL}/trabajos/${id}`, formData, {
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