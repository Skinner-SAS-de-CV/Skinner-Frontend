const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de Wompi (usar variables de entorno en producción)
const WOMPI_CONFIG = {
  apiUrl: 'https://api.wompi.sv', 
  apiKey: process.env.WOMPI_API_KEY, 
  webhookSecret: process.env.WOMPI_WEBHOOK_SECRET,
  merchantId: process.env.WOMPI_MERCHANT_ID
};

// Base de datos simulada...
interface User {
  [key: string]: any;
}

interface Transaction {
  userId: string;
  userDetails: any;
  paymentDetails: any;
  wompiResponse: any;
  status: string;
  createdAt: string;
  [key: string]: any;
}

let users: { [userId: string]: User } = {};
let transactions: { [commerceId: string]: Transaction } = {};

// Endpoint para crear enlace de pago
app.post('/api/create-payment-link', async (req: { body: { 
  userId: any; userDetails: any; paymentDetails: any; }; 
  protocol: any; get: (arg0: string) => any; }, res: { json: (arg0: { success: boolean; 
  paymentLink: any; qrCode: any; transactionId: any; commerceId: string; }) => void; status: (arg0: number) => { 
    (): any; new(): any; json: { (arg0: { success: boolean; error: any; }):
     void; new(): any; }; }; }) => {
  try {
    const { userId, userDetails, paymentDetails } = req.body;
    
    // Generar ID único para el comercio
    const commerceId = `USER_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Configurar payload para Wompi
    const wompiPayload = {
      idComercio: commerceId,
      monto: paymentDetails.amount,
      nombreProducto: paymentDetails.productName,
      formaPago: {
        permitirTarjetaCreditoDebido: true,
        permitirPagoConPuntoAgricola: true,
        permitirPagoEnCuotasAgricola: false
      },
      infoProducto: {
        DescripcionProducto: paymentDetails.description,
        UrlImagenProducto: paymentDetails.imageUrl || null
      },
      configuracion: {
        urlRedirect: `${req.protocol}://${req.get('host')}/payment-return`,
        EsMontoEditable: false,
        EsCantidadEditable: false,
        CantidadPorDefecto: 1,
        duracionInterfazIntentoMinutos: 30,
        urlRetorno: `${req.protocol}://${req.get('host')}/cancel-payment`,
        emailsNotificacion: process.env.NOTIFICATION_EMAIL,
        urlWebhook: `${req.protocol}://${req.get('host')}/api/webhook/wompi`,
        notificarTransaccionCliente: true
      }
    };

    // Llamada a la API de Wompi
    const response = await fetch(`${WOMPI_CONFIG.apiUrl}/payment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WOMPI_CONFIG.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(wompiPayload)
    });

    if (!response.ok) {
      throw new Error(`Error de Wompi: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    // Guardar información de la transacción
    transactions[commerceId] = {
      userId,
      userDetails,
      paymentDetails,
      wompiResponse: result,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      paymentLink: result.urlEnlace,
      qrCode: result.urlQrCodeEnlace,
      transactionId: result.idEnlace,
      commerceId: commerceId
    });

  } catch (error) {
    console.error('Error creando enlace de pago:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

// Endpoint para manejar el retorno del pago
app.get('/payment-return', (req: { query: { idTransaccion: any; monto: any; esReal: any; formaPago: any; esAprobada: any; codigoAutorizacion: any; mensaje: any; hash: any; };
 },
  res: { status: (arg0: number) => { 
    (): any; new(): any; send: { (arg0: string): any; new(): any; }; 
  }; 
  redirect: (arg0: string) => void; }) => {
  const { 
    idTransaccion, 
    monto, 
    esReal, 
    formaPago, 
    esAprobada, 
    codigoAutorizacion, 
    mensaje,
    hash 
  } = req.query;

  // Validar hash para seguridad
  const expectedHash = generateHash(
    `${idTransaccion}${monto}${esReal}${formaPago}${esAprobada}${codigoAutorizacion}${mensaje}`
  );

  if (hash !== expectedHash) {
    return res.status(400).send('Hash inválido - posible manipulación de datos');
  }

  // Buscar la transacción
  const transaction = Object.values(transactions).find(t => 
    t.wompiResponse.idEnlace === idTransaccion
  );

  if (!transaction) {
    return res.status(404).send('Transacción no encontrada');
  }

  // Actualizar estado de la transacción
  transaction.status = esAprobada === 'true' ? 'approved' : 'rejected';
  transaction.paymentResult = {
    transactionId: idTransaccion,
    amount: monto,
    isReal: esReal === 'true',
    paymentMethod: formaPago,
    isApproved: esAprobada === 'true',
    authCode: codigoAutorizacion,
    message: mensaje,
    processedAt: new Date().toISOString()
  };

  if (transaction.status === 'approved') {
    // Activar usuario premium
    if (!users[transaction.userId]) {
      users[transaction.userId] = {};
    }
    users[transaction.userId] = {
      ...transaction.userDetails,
      isPremium: true,
      subscriptionStart: new Date().toISOString(),
      subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      transactionId: idTransaccion
    };

    // Redireccionar a la app con éxito
    res.redirect(`/app/candidate?payment=success&transactionId=${idTransaccion}`);
  } else {
    // Redireccionar con error
    res.redirect(`/payment-failed?reason=${encodeURIComponent(mensaje)}`);
  }
});

// Webhook para notificaciones de Wompi
app.post('/api/webhook/wompi', (req: { body: { idTransaccion: any; monto: any; esReal: any; formaPago: any; esAprobada: any; codigoAutorizacion: any; mensaje: any; };
 }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: 
  { success: boolean; message?: string; error?: any; }): void; new(): any; }; }; }) => {
  try {
    const { 
      idTransaccion, 
      monto, 
      esReal, 
      formaPago, 
      esAprobada, 
      codigoAutorizacion, 
      mensaje 
    } = req.body;


    console.log('Webhook recibido de Wompi:', {
      transactionId: idTransaccion,
      amount: monto,
      approved: esAprobada,
      timestamp: new Date().toISOString()
    });

    // Buscar y actualizar la transacción
    const transaction = Object.values(transactions).find(t => 
      t.wompiResponse.idEnlace === idTransaccion
    );

    if (transaction) {
      transaction.webhookReceived = true;
      transaction.webhookData = req.body;
      
      // Si el pago fue aprobado, realizar acciones adicionales
      if (esAprobada === 'true') {
        // Enviar email de confirmación, activar servicios, etc.
        console.log(`Pago aprobado para usuario ${transaction.userId}`);
      }
    }

    res.status(200).json({ success: true, message: 'Webhook procesado' });

  } catch (error) {
    console.error('Error procesando webhook:', error);
    res.status(500).json({ success: false, error: error instanceof Error ? error.message : String(error) });
  }
});

// Endpoint para verificar estado del usuario
app.get('/api/user/:userId/status', (req: { params: { userId: any; };
 }, 
 res: { status: (arg0: number) => { (): any; new(): any; json: {
   (arg0: { success: boolean; error: string; }): any; new(): any; }; }; json: 
   (arg0: { success: boolean; user: { subscriptionActive: any; }; }) => void; }) => {
  const { userId } = req.params;
  const user = users[userId];

  if (!user) {
    return res.status(404).json({ 
      success: false, 
      error: 'Usuario no encontrado' 
    });
  }

  res.json({
    success: true,
    user: {
      ...user,
      subscriptionActive: user.isPremium && new Date() < new Date(user.subscriptionEnd)
    }
  });
});

// Endpoint para consultar transacciones
app.get('/api/transactions/:commerceId', (req: { params: { commerceId: any; }; 
}, 
res: { status: (arg0: number) => { (): any; new(): any; json: { 
  (arg0: { success: boolean; error: string; }): any; new(): any; }; }; 
  json: (arg0: { success: boolean; transaction: Transaction; }) => void; }) => {
  const { commerceId } = req.params;
  const transaction = transactions[commerceId];

  if (!transaction) {
    return res.status(404).json({ 
      success: false, 
      error: 'Transacción no encontrada' 
    });
  }

  res.json({
    success: true,
    transaction
  });
});

// Páginas de error y cancelación que esto podria ser una buena idea.
app.get('/cancel-payment', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Pago Cancelado</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .container { max-width: 500px; margin: 0 auto; }
            .error { color: #e74c3c; }
            button { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="error">Pago Cancelado</h1>
            <p>Has cancelado el proceso de pago. Si fue un error, puedes intentar nuevamente.</p>
            <button onclick="window.location.href='/app/payment'">Intentar Nuevamente</button>
        </div>
    </body>
    </html>
  `);
});

app.get('/payment-failed', (req: { query: { reason: string; }; }, res: { send: (arg0: string) => void; }) => {
  const reason = req.query.reason || 'Error desconocido';
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Pago Fallido</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .container { max-width: 500px; margin: 0 auto; }
            .error { color: #e74c3c; }
            button { background: #3498db; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1 class="error">Pago No Procesado</h1>
            <p>Tu pago no pudo ser procesado: ${reason}</p>
            <button onclick="window.location.href='/app/payment'">Intentar Nuevamente</button>
            <button onclick="window.location.href='/app/support'">Contactar Soporte</button>
        </div>
    </body>
    </html>
  `);
});

// Middleware de error
app.use((error: any, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; error: string; }): void; new(): any; }; }; }, next: any) => {
  console.error('Error del servidor:', error);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log('Endpoints disponibles:');
  console.log('  POST /api/create-payment-link');
  console.log('  GET  /payment-return');
  console.log('  POST /api/webhook/wompi');
  console.log('  GET  /api/user/:userId/status');
  console.log('  GET  /api/transactions/:commerceId');
});

module.exports = app;

function generateHash(arg0: string) {
  throw new Error("Function not implemented.");
}
