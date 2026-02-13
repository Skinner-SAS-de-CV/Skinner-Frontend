"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addContact } from "@/lib/api";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

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

  const formFields = [
    {
      label: "Nombre:",
      type: "text",
      value: name,
      onChange: setName,
      required: true,
      component: Input,
    },
    {
      label: "Empresa:",
      type: "text",
      value: companyName,
      onChange: setCompanyName,
      required: true,
      component: Input,
    },
    {
      label: "Email:",
      type: "email",
      value: email,
      onChange: setEmail,
      required: true,
      component: Input,
    },
    {
      label: "¿Cómo le podemos ayudar hoy?",
      value: message,
      onChange: setMessage,
      required: true,
      component: Textarea,
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-surface-950 p-6 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-indigo/8 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-violet/5 rounded-full filter blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-2xl"
      >
        <Card className="relative w-full bg-surface-800/90 backdrop-blur-sm text-white p-8 rounded-2xl shadow-2xl border border-surface-700/50 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-brand-indigo/5 via-transparent to-brand-violet/5 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-brand-indigo via-brand-sky to-brand-violet" />
          <CardHeader className="relative">
            <CardTitle className="text-3xl font-bold text-center gradient-brand-text font-display">
              Contáctanos
            </CardTitle>
            <p className="text-gray-400 text-center text-sm mt-2">
              Cuéntanos sobre tu proyecto y te responderemos a la brevedad
            </p>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {formFields.map((field, i) => (
                <motion.div
                  key={field.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <label className="text-gray-300 font-medium text-sm">{field.label}</label>
                  <field.component
                    type={field.type}
                    value={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => field.onChange(e.target.value)}
                    required={field.required}
                    className="bg-surface-900/80 text-white border border-surface-700 rounded-lg focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo/50 transition-colors"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  type="submit"
                  className="w-full gradient-cta text-surface-950 font-semibold transition-transform duration-300 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </motion.div>
            </form>
            {error && <p className="text-red-400 text-center mt-2">{error}</p>}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactForm;