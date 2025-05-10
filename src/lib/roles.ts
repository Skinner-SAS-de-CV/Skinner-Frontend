import { Roles } from "@/app/types/globals"
import { auth } from '@clerk/nextjs/server'

// Eventualmente podemos usar esto para retornar los roles que el usuario tiene
export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()
  return sessionClaims?.metadata.role === role
}