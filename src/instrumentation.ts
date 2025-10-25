import * as Sentry from '@sentry/nextjs';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    console.log ("Estoy en el edge maje")
  }
}

export const onRequestError = Sentry.captureRequestError;
