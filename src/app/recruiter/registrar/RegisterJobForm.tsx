"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addJob, addJobParamsSchema } from "@/lib/api/trabajo";
import { toast } from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";

const RegisterJobForm = ({ esPremium }: { esPremium: boolean }) => {
  const { getToken } = useAuth();
  const [titulo_de_trabajo, setTituloDeTrabajo] = useState("");
  const [perfil_del_trabajador, setPerfilDelTrabajador] = useState("");
  const [funciones_del_trabajo, setFuncionesDelTrabajo] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true); // Estado para mostrar/ocultar el formulario
  const router = useRouter();
  console.log("Es premium:", esPremium); // se quejaba esLint

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const data = addJobParamsSchema.parse({
        titulo_de_trabajo,
        perfil_del_trabajador,
        funciones_del_trabajo,
        habilidades,
        token,
      });
      await addJob(data);

      toast.success("✅ Trabajo registrado exitosamente.");
      setShowForm(false); // Ocultar el formulario después de registrar
      router.push(
        `/analyze`
      );
    } catch (error) {
      console.error("Error al agregar el trabajo:", error);
      toast.error(
        "❌ Hubo un problema al registrar el trabajo. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    showForm && ( //Renderiza el formulario solo si `showForm` es `true`
      <div className="flex items-center justify-center min-h-screen bg-gray-950 p-6 max-w-[9/10] mx-auto m-0">
        <Card className="w-full bg-gray-900 text-white p-8 rounded-2xl shadow-lg border border-gray-800 max-w-[1000px]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-linear-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              📝 Registrar Nuevo Trabajo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 transition-all duration-300 shadow-lg"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </Button>
            </form>
            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default RegisterJobForm;
