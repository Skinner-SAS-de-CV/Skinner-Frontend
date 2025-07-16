"use client";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getNiveles } from "@/lib/api/nivel";
import { useAuth } from "@clerk/nextjs";
import { format, parse } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { es } from "date-fns/locale";
import { addProfile } from "@/lib/api/perfil";

const MS_IN_YEAR = 60 * 60 * 24 * 365 * 1000;
const CALENDAY_END = new Date(Date.now() - MS_IN_YEAR * 18);

export default function Onboarding() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  // TODO: Cambiar esto
  const [selectedCountry, setSelectedCountry] = useState<string>("El Salvador");
  const [birthday, setBirthday] = useState<Date>();
  const [birthdayInput, setBirthdayInput] = useState<string>();
  const [month, setMonth] = useState<Date>();
  // https://stackoverflow.com/questions/77144813/how-to-close-radix-shadcn-popover-from-inside-of-it
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedNivel, setSelectedNivel] = useState<string>("");
  const [niveles, setNiveles] = useState<{ id: string; name: string }[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchNiveles = async () => {
      try {
        const data = await getNiveles();
        setNiveles(data);
        // Selecciona el primer cliente si hay alguno
        if (data.length > 0) {
          setSelectedNivel(String(data[0].id));
        }
      } catch (err) {
        console.error("Error al obtener niveles:", err);
      }
    };
    fetchNiveles();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // solo cerrar calendario si es una fecha valida
    if (e.key === "Enter" && birthdayInput) {
      const newDate = parse(birthdayInput, "dd/MM/y", new Date());
      if (!isNaN(newDate.getTime())) {
        setCalendarOpen(false);
      }
    }
  };
  const handleInputChange = (e: React.BaseSyntheticEvent) => {
    const newDate = parse(e.currentTarget.value, "dd/MM/y", new Date());
    if (isNaN(newDate.getTime())) {
      setBirthday(undefined);
    } else {
      setMonth(newDate);
      setBirthday(newDate);
    }
    setBirthdayInput(e.currentTarget.value);
  };

  //Función para enviar la salvar el perfil
  const handleSubmit = async () => {
    if (!firstname || !lastname || !selectedCountry || !birthday) {
      setError("Por favor, llenar la información requerida");
      return;
    }
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    // Enviamos la profesión seleccionada
    formData.append("country", selectedCountry);
    formData.append("birthday", birthday.toISOString());
    formData.append("nivel_id", selectedNivel);

    try {
      const token = await getToken();
      await addProfile(formData, token);
    } catch (err) {
      setError(" Hubo un problema al salvar tu perfil. Inténtalo de nuevo.");
      console.error("Error al salvar el perfil:", err);
    } finally {
      // TODO: tendremos que modificar esto
      setLoading(false);
    }
    // redireccionar a página de analisis
    //redirect("/candidate/payment");
    redirect("/candidate/analyze");
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <main className="min-h-screen flex justify-center items-center">
        <Card className="w-full max-w-2xl bg-gray-900 text-white p-8 rounded-2xl shadow-lg border border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              Crea tu perfil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 1er Campo: Nombre */}
            <div>
              <label className="text-gray-300 font-medium">Nombre:</label>
              <Input
                type="text"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
                value={firstname}
                onChange={(e) => setFirstname(e.currentTarget.value)}
              />
            </div>
            {/* 2do Campo: Apellido */}
            <div>
              <label className="text-gray-300 font-medium">Apellido:</label>
              <Input
                type="text"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
                value={lastname}
                onChange={(e) => setLastname(e.currentTarget.value)}
              />
            </div>

            {/* 3er Dropdown: Pais */}
            <div>
              <label className="text-gray-300 font-medium">País:</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
              >
                <option value="El Salvador">El Salvador</option>
                <option value="Guatemala">Guatemala</option>
              </select>
            </div>
            {/* 4o Datepicker: Cumpleaños  */}
            <div>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <label className="text-gray-300 font-medium block">
                  Fecha de Nacimiento:
                </label>
                <PopoverTrigger
                  asChild
                  className="w-full bg-gray-800 hover:text-white text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
                >
                  <Button
                    variant={"outline"}
                    className="w-[280px] justify-start text-left font-normal text-white hover:bg-gray-800"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthday ? (
                      format(birthday, "PPP", { locale: es })
                    ) : (
                      <span>{calendarOpen ? "" : "DD/MM/AAAA"}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] p-0 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <Input
                    value={birthdayInput || ""}
                    onKeyDown={handleKeyPress}
                    onChange={handleInputChange}
                    placeholder="DD/MM/AAAA"
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
                  />
                  <Calendar
                    mode="single"
                    selected={birthday}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(newBirthday) => {
                      setBirthday(newBirthday);
                      setBirthdayInput(
                        newBirthday ? format(newBirthday, "dd/MM/R") : ""
                      );
                      setCalendarOpen(false);
                    }}
                    initialFocus
                    defaultMonth={CALENDAY_END}
                    hidden={{ after: CALENDAY_END }}
                    ISOWeek
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* 5o Dropdown: Nivel de educación */}
            <div>
              <label className="text-gray-300 font-medium">
                Nivel de educación:
              </label>
              <select
                value={selectedNivel}
                onChange={(e) => setSelectedNivel(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 p-2"
              >
                {niveles.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>
                    {nivel.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Botón para enviar */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando Perfil...
                </>
              ) : (
                "Crear Perfil"
              )}
            </Button>

            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
