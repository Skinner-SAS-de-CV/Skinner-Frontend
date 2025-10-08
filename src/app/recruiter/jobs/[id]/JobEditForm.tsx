"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getJobById, updateJob, updateJobParamsSchema } from "@/lib/api/trabajo";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const EditJobForm = () => {
  const { getToken, orgSlug } = useAuth();
  const params = useParams();
  const jobId = params.id;
  
  const [nombre_del_cliente, setNombreDelCliente] = useState("");
  const [titulo_de_trabajo, setTituloDeTrabajo] = useState("");
  const [perfil_del_trabajador, setPerfilDelTrabajador] = useState("");
  const [funciones_del_trabajo, setFuncionesDelTrabajo] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar los datos del trabajo al montar el componente
  useEffect(() => {
    const fetchJobData = async () => {
      if (!jobId) {
        toast.error("❌ ID de trabajo no proporcionado");
        router.push("/");
        return;
      }

      try {
        const token = await getToken();
        const jobData = await getJobById(Number(jobId), token);
        
        setNombreDelCliente(jobData.clientes.name);
        setTituloDeTrabajo(jobData.title);
        setPerfilDelTrabajador(jobData.perfil_del_trabajador.map((el) => el.name).join('\n'));
        setFuncionesDelTrabajo(jobData.funciones_del_trabajo.map((el) => el.title).join('\n'));
        setHabilidades(jobData.habilidades.map((el) => el.name).join('\n'));
      } catch (error) {
        console.error("Error al cargar el trabajo:", error);
        toast.error("❌ Error al cargar los datos del trabajo");
      } finally {
        setLoadingData(false);
      }
    };

    fetchJobData();
  }, [jobId, getToken, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const data = updateJobParamsSchema.parse({
        id: Number(jobId),
        nombre_del_cliente,
        titulo_de_trabajo,
        perfil_del_trabajador,
        funciones_del_trabajo,
        habilidades,
        token,
      });
      
      await updateJob(data);

      toast.success("✅ Trabajo actualizado exitosamente.");
      router.push(
        `/analyze?client=${encodeURIComponent(
          nombre_del_cliente
        )}&job=${encodeURIComponent(titulo_de_trabajo)}`
      );
    } catch (error) {
      console.error("Error al actualizar el trabajo:", error);
      toast.error(
        "❌ Hubo un problema al actualizar el trabajo. Inténtalo de nuevo."
      );
      setError("Error al actualizar el trabajo");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <Card className="w-full max-w-[1000px] bg-gray-900 text-white p-8">
          <CardContent>
            <p className="text-center text-gray-300">Cargando datos...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-6 max-w-[9/10] mx-auto m-0">
      <Card className="w-full bg-gray-900 text-white p-8 rounded-2xl shadow-lg border border-gray-800 max-w-[1000px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            ✏️ Editar Trabajo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {orgSlug && orgSlug.startsWith("skinner") && (
              <div>
                <label className="text-gray-300 font-medium">
                  Nombre del Cliente:
                </label>
                <Input
                  type="text"
                  value={nombre_del_cliente}
                  onChange={(e) => setNombreDelCliente(e.target.value)}
                  required
                  className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label className="text-gray-300 font-medium">
                Título del Trabajo:
              </label>
              <Input
                type="text"
                value={titulo_de_trabajo}
                onChange={(e) => setTituloDeTrabajo(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-300 font-medium">
                Perfil del Trabajador:
              </label>
              <Textarea
                value={perfil_del_trabajador}
                onChange={(e) => setPerfilDelTrabajador(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-300 font-medium">
                Funciones del Trabajo:
              </label>
              <Textarea
                value={funciones_del_trabajo}
                onChange={(e) => setFuncionesDelTrabajo(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-300 font-medium">
                Habilidades:
              </label>
              <Textarea
                value={habilidades}
                onChange={(e) => setHabilidades(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                onClick={() => router.back()}
                className="w-full bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 shadow-lg"
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Actualizar"}
              </Button>
            </div>
          </form>
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditJobForm;