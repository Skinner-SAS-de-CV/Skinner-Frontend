'use client';
import React, { useState, useEffect } from 'react';
import { Loader, CreditCard, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 5.00,
    productName: 'Suscripción Standard',
    description: 'Acceso completo al analizador de CVs de Skinner',
  });
  const [paymentLink, setPaymentLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [currentStep, setCurrentStep] = useState<'onboard' | 'processing' | 'redirect' | 'payment' | 'success' | 'error'>('processing');

  // Función para crear enlace de pago con Wompi
  const createPaymentLink = async () => {
    setLoading(true);
    
    // Configuración para la API de Wompi(pero obviamente aca lo cambiaremos por la de cubo)
    const wompiPayload = {
      idComercio: `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      monto: paymentDetails.amount,
      nombreProducto: paymentDetails.productName,
      formaPago: {
        permitirTarjetaCreditoDebido: true,
        permitirPagoConPuntoAgricola: true,
        permitirPagoEnCuotasAgricola: false
      },
      infoProducto: {
        DescripcionProducto: paymentDetails.description,
        UrlImagenProducto: "https://www.skinnersv.net/_next/image?url=%2Fskinner-logo5.png&w=640&q=75"
      },
      configuracion: {
        urlRedirect: `${window.location.origin}/payment-return`,
        EsMontoEditable: false,
        EsCantidadEditable: false,
        CantidadPorDefecto: 1,
        duracionInterfazIntentoMinutos: 30,
        urlRetorno: `${window.location.origin}/cancel-payment`,
        emailsNotificacion: "info@skinnersv.net",
        urlWebhook: `${window.location.origin}/api/payment-link`,
        notificarTransaccionCliente: true
      }
    };

    try {
      // Aquí iria  la llamada real a la API de Cubo
      // const response = await fetch('https://api.wompi.sv/EnlacePago', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': 'Bearer TU_API_KEY',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(wompiPayload)
      // });
      
      // Simulación de respuesta exitosa
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResponse = {
        idEnlace: `WMP_${Date.now()}`,
        urlEnlace: 'https://checkout.wompi.sv/pay',
        urlQrCodeEnlace: 'https://api.wompi.sv/qr',
        estaProductivo: true
      };
      
      setPaymentLink(mockResponse.urlEnlace);
      setTransactionId(mockResponse.idEnlace);
      setCurrentStep('redirect');
      
    } catch (error) {
      console.error('Error al crear el link de pago:', error);
      setCurrentStep('error');
    } finally {
      setLoading(false);
    }
  };

  // Función para redirigir a Wompi
  const redirectToPayment = () => {
    setCurrentStep('payment');
    // En producción, esto redirigiría a la URL real de Cubo
    // window.location.href = paymentLink;
    
    // Para demo, simulamos el proceso de pago segun claude.
    setTimeout(() => {
      // Simular retorno exitoso
      handlePaymentReturn({ success: true, transactionId: transactionId });
    }, 3000);
  };

  // Función para manejar el retorno del pago
  const handlePaymentReturn = (result: { success: any; transactionId?: string; }) => {
    if (result.success) {
      setCurrentStep('success');
      // Aquí podrías actualizar el estado del usuario en tu base de datos
      setTimeout(() => {
        // Redirigir a la aplicación principal
        window.location.href = '/candidate/onboard';
      }, 3000);
    } else {
      setCurrentStep('error');
    }
  };

  // Componente de procesamiento
  const ProcessingStep = () => {
    useEffect(() => {
      createPaymentLink();
    }, []);

    return (
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Preparando tu pago</h2>
        <p className="text-gray-600 mb-4">
          Estamos configurando tu enlace de pago seguro con Wompi...
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-800">{paymentDetails.productName}</h3>
          <p className="text-sm text-gray-600">{paymentDetails.description}</p>
          <p className="text-xl font-bold text-blue-600 mt-2">${paymentDetails.amount}</p>
        </div>
      </div>
    );
  };

  // Componente de redirección
  const RedirectStep = () => (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <CreditCard className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Todo listo!</h2>
      <p className="text-gray-600 mb-6">
        Te vamos a redirigir a una plataforma de pagos segura Wompi para completar tu compra.
      </p>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Resumen de tu compra:</h3>
        <div className="text-left space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Producto:</span>
            <span className="font-medium">{paymentDetails.productName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cantidad:</span>
            <span className="font-medium">1</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-blue-600">${paymentDetails.amount}</span>
          </div>
        </div>
      </div>

      <button
        onClick={redirectToPayment}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
      >
        Proceder al pago
        <ArrowRight className="w-5 h-5" />
      </button>
      
      <p className="text-xs text-gray-500 mt-4">
        Serás redirigido a wompi.sv - Plataforma de pagos segura
      </p>
    </div>
  );

  // Componente de pago en proceso
  const PaymentStep = () => (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CreditCard className="w-8 h-8 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Procesando pago...</h2>
      <p className="text-gray-600 mb-4">
        Por favor completa tu pago en la ventana de Wompi que se ha abierto.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Nota:</strong> No cierres esta ventana. Te redirigiremos automáticamente una vez que se complete el pago.
        </p>
      </div>
    </div>
  );

  // Componente de éxito
  const SuccessStep = () => (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">¡Pago exitoso!</h2>
      <p className="text-gray-600 mb-6">
        Tu pago ha sido procesado correctamente. En unos segundos te redirigiremos a tu cuenta.
      </p>
      
      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Detalles de la transacción:</h3>
        <div className="text-left space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">ID Transacción:</span>
            <span className="font-mono text-sm">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Monto:</span>
            <span className="font-bold text-green-600">${paymentDetails.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estado:</span>
            <span className="text-green-600 font-medium">Aprobado</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>¡Bienvenido a tu Analizador de CV's Skinner!</strong><br />
          Redirigiendo a tu dashboard en 3 segundos...
        </p>
      </div>
    </div>
  );

  // Componente de error
  const ErrorStep = () => (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
      <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Error en el pago</h2>
      <p className="text-gray-600 mb-6">
        Hubo un problema procesando tu pago. Por favor intenta nuevamente.
      </p>
      
      <button
        onClick={() => setCurrentStep('processing')}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors mb-4"
      >
        Intentar nuevamente
      </button>
      
      <button
        onClick={() => setCurrentStep('onboard')}
        className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
      >
        Volver al inicio
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Indicador de progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {['onboard', 'processing', 'redirect', 'payment', 'success'].map((step, index) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  ['onboard', 'processing', 'redirect', 'payment', 'success'].indexOf(currentStep) > index
                    ? 'bg-green-500'
                    : ['onboard', 'processing', 'redirect', 'payment', 'success'].indexOf(currentStep) === index
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-gray-600">
            Paso {['onboard', 'processing', 'redirect', 'payment', 'success'].indexOf(currentStep) + 1} de 5
          </p>
        </div>

        {/* Contenido principal */}
        {currentStep === 'processing' && <ProcessingStep />}
        {currentStep === 'redirect' && <RedirectStep />}
        {currentStep === 'payment' && <PaymentStep />}
        {currentStep === 'success' && <SuccessStep />}
        {currentStep === 'error' && <ErrorStep />}
      </div>
    </div>
  );
};

export default PaymentPage;