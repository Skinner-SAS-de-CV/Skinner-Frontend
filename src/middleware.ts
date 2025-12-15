import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Proteger todas las rutas excepto las que definamos acá
const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/candidate/signup(.*)",
  "/candidate/signin(.*)",
  "/",
  "/candidate/home",
  "/terms(.*)",
  "/privacy(.*)",
  "/about(.*)",
  "/contact",
  "/companies(.*)",
]);
// Ruta para onboarding de candidatos
const isOnboardingRoute = createRouteMatcher(["/candidate/onboard"]);
const isCandidateRoute = createRouteMatcher(["/candidate(.*)"]);
const isRecruiterRoute = createRouteMatcher(["/recruiter(.*)", "/analyze(.*)", "/register(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, sessionClaims } = await auth();
    // For users visiting /candidate/onboard, don't try to redirect
    if (userId && isOnboardingRoute(req)) {
      return NextResponse.next();
    }
    // Catch users who do not have `onboardingComplete: true` in their publicMetadata
    // Redirect them to the /onboarding route to complete onboarding
    if (
      userId &&
      !sessionClaims?.metadata?.onboardingComplete &&
      !["admin", "recruiter"].includes(sessionClaims?.metadata?.role || "") &&
      !isPublicRoute(req)
    ) {
      const onboardingUrl = new URL("/candidate/onboard", req.url);
      return NextResponse.redirect(onboardingUrl);
    }

    if (!isPublicRoute(req)) {
      await auth.protect();
      // No dejar usuarios entrar en rutas fuera de rutas publicas y /candidate
      if (
        userId &&
        !isCandidateRoute(req) &&
        !["admin", "recruiter"].includes(sessionClaims?.metadata?.role || "") &&
        !isOnboardingRoute(req)
      ) {
        // Enviar usar a analizar cv por ahora, eventualmente irá a home
        const analyzeUrl = new URL("/candidate/analyze", req.url);
        return NextResponse.redirect(analyzeUrl);
      }

      // Si es reclutador, no dejar entrar a rutas de candidato
      if (
        userId &&
        !isRecruiterRoute(req) && ["recruiter"].includes(sessionClaims?.metadata?.role || "")
      ) {
        // redireccionar a /analyze por ahora, eventualmente irá a home
        const analyzeUrl = new URL("/analyze", req.url);
        return NextResponse.redirect(analyzeUrl);
      }
    }
  },
  { debug: process.env.NODE_ENV === "production" ? false : false}
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
