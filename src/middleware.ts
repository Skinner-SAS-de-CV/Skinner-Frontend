import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Proteger todas las rutas excepto las que definamos acá
const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/candidate/signup(.*)",
  "/",
  "/candidate/home",
  "/terms(.*)",
  "/privacy(.*)",
  "/about(.*)",
  "/contact",
]);
// Ruta para onboarding de candidatos
const isOnboardingRoute = createRouteMatcher(["/candidate/onboard"]);
const isCandidateRoute = createRouteMatcher(["/candidate(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    if (!isPublicRoute(req)) {
      await auth.protect();
      // No dejar usuarios entrar en rutas fuera de rutas publicas y /candidate
      if (
        userId &&
        !isCandidateRoute(req) &&
        sessionClaims?.metadata?.role !== "admin" &&
        !isOnboardingRoute(req)
      ) {
        // Enviar usar a analizar cv por ahora, eventualmente irá a home
        const analyzeUrl = new URL("/candidate/analyze", req.url);
        return NextResponse.redirect(analyzeUrl);
      }

      return;
    }

    // For users visiting /candidate/onboard, don't try to redirect
    if (userId && isOnboardingRoute(req)) {
      return NextResponse.next();
    }
    // Catch users who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboarding route to complete onboarding
    if (
      userId &&
      !sessionClaims?.metadata?.onboardingComplete &&
      sessionClaims?.metadata?.role !== "admin" &&
      !isPublicRoute(req)
    ) {
      const onboardingUrl = new URL("/candidate/onboard", req.url);
      return NextResponse.redirect(onboardingUrl);
    }
  },
  { debug: process.env.NODE_ENV === "production" ? false : false }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
