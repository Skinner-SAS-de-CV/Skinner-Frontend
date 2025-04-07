"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addContact } from "@/lib/api"; 
import { toast } from "react-hot-toast";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addContact({
        name,
        name_company: companyName,
        email,
        message,
      });

      toast.success("Mensaje enviado exitosamente.");
      setName("");
      setCompanyName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      toast.error("Hubo un problema. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-6 max-w-[9/10] mx-auto m-0">
      <Card className="w-full bg-gray-900 text-white p-8 rounded-2xl shadow-lg border border-gray-800 max-w-[1000px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
            Contáctanos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label className="text-gray-300 font-medium">Nombre:</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-300 font-medium">Empresa:</label>
              <Input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-300 font-medium">Email:</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-300 font-medium">¿Cómo le podemos ayudar hoy?</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 shadow-lg"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar Mensaje"}
            </Button>
          </form>
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
