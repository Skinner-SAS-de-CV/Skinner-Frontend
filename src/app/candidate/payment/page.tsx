"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Loader, CreditCard, CheckCircle, AlertCircle } from "lucide-react";

const apiUrl = process.env.NEXT_PUBLIC_CUBO_API_URL;

const PaymentPage = () => {
  const [paymentDetails] = useState({
    amount: 5.0,
    productName: "Suscripción Standard",
    description: "Acceso completo al analizador de CVs de Skinner",
  });
  const [transactionId, setTransactionId] = useState("");
  const [currentStep, setCurrentStep] = useState<
    "processing" | "redirect" | "success" | "error"
  >("processing");
  const [paymentData, setPaymentData] = useState<{
    paymentUrl: string;
  } | null>(null);

  // Función para crear el enlace de pago con CUBO
  const createCuboPaymentLink = useCallback(async () => {
    try {
      const apiKey = process.env.CUBO_API_KEY || "cuboapikey";

      const headers: HeadersInit = {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        description: "Analisis de CV, incluye no sé que...",
        amount: 500,
        redirectUri: "http://locahost:3001/candidate/home",
      });
      const response = await fetch(`${apiUrl}/api/v1/links/one-use`, {
        method: "POST",
        headers,
        body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al crear enlace de pago");
      }

      if (data.cuboRedirectUri) {
        setPaymentData({
          paymentUrl: data.cuboRedirectUri,
        });
        setTransactionId(data.paymentIntentToken);
        setCurrentStep("redirect");
      } else {
        throw new Error("No se recibió URL de pago de CUBO");
      }
    } catch (error) {
      console.error("Error:", error);
      setCurrentStep("error");
    }
  }, []);

  // Componente de redirección
  const RedirectStep = () => {
    useEffect(() => {
      // Redirige automáticamente después de 3 segundos
      const timer = setTimeout(() => {
        window.location.href = paymentData?.paymentUrl || "";
      }, 3000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <CreditCard className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Todo listo!</h2>
        <p className="text-gray-600 mb-6">
          Serás redirigido a la pasarela de pago segura de CUBO...
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Resumen:</h3>
          <p className="text-lg font-bold text-blue-600">
            ${paymentDetails.amount}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {paymentDetails.productName}
          </p>
        </div>

        <a
          href={paymentData?.paymentUrl}
          className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Ir a pagar ahora
        </a>

        <p className="text-xs text-gray-500 mt-4">
          Redireccionando automáticamente en 3 segundos...
        </p>
      </div>
    );
  };

  // Efecto para iniciar el proceso al cargar el componente
  useEffect(() => {
    if (currentStep === "processing") {
      createCuboPaymentLink();
    }
  }, [createCuboPaymentLink, currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Indicador de pasos */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {["processing", "redirect", "success"].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  ["processing", "redirect", "success"].indexOf(currentStep) >
                  index
                    ? "bg-green-500"
                    : ["processing", "redirect", "success"].indexOf(
                        currentStep
                      ) === index
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Paso{" "}
            {["processing", "redirect", "success"].indexOf(currentStep) + 1} de
            3
          </p>
        </div>

        {/* Contenido principal */}
        {currentStep === "processing" && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Preparando tu pago
            </h2>
            <p className="text-gray-600 mb-4">
              Estamos generando tu enlace de pago seguro con CUBO...
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-800">
                {paymentDetails.productName}
              </h3>
              <p className="text-sm text-gray-600">
                {paymentDetails.description}
              </p>
              <p className="text-xl font-bold text-blue-600 mt-2">
                ${paymentDetails.amount}
              </p>
            </div>
          </div>
        )}

        {currentStep === "redirect" && <RedirectStep />}

        {currentStep === "success" && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¡Pago exitoso!
            </h2>
            <p className="text-gray-600 mb-6">
              Tu pago ha sido procesado correctamente.
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                ID de transacción:{" "}
                <span className="font-mono">{transactionId}</span>
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ir a mi cuenta
            </button>
          </div>
        )}

        {currentStep === "error" && (
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Error en el pago
            </h2>
            <p className="text-gray-600 mb-6">
              Hubo un problema al generar tu enlace de pago.
            </p>
            <button
              onClick={() => {
                setCurrentStep("processing");
                createCuboPaymentLink();
              }}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors mb-4"
            >
              Reintentar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
