import axios from "axios";
import z from "zod/v4";

export const deleteAnalysisParamsSchema = z.object({
  id: z.number(),
  token: z.string().nullable(),
});

type DeleteAnalysisParams = z.infer<typeof deleteAnalysisParamsSchema>;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const deleteAnalysis = async ({
  id,
  token,
}: DeleteAnalysisParams): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${BACKEND_URL}/analisis/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Respuesta del servidor:", response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      console.error("Error en la respuesta del servidor", error.response.data);
    } else if (error.request) {
      console.error("No se recibio respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud", error.message);
    }
    throw error;
  }
};
