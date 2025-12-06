"use client"
import {
  Menu,
  MenuContent,
  MenuItem,
} from "@/components/ui/intentui/menu"


import { ChevronDownIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  type NavbarProps,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/intentui/navbar"
import Logo from "./logo"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

const categories = [
  { id: 1, label: "Mis Puestos", url: "/recruiter/jobs" },
  { id: 2, label: "Registrar Nuevo Puesto", url: "/register" },
  { id: 3, label: "Analizar", url: "/analyze" },
  { id: 4, label: "Buscador", url: "/recruiter/search" }
]

export function AppNavbar(props: NavbarProps) {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <NavbarProvider>
      <Navbar {...props}>
        <NavbarStart>
          <Link
            className="flex items-center gap-x-2 font-medium"
            aria-label="Goto home"
            href="/"
          >
            <Logo />
          </Link>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          <NavbarItem className="md:text-md hover:bg-gray-800 hover:text-blue-500" href="/" isCurrent>
            Home
          </NavbarItem>
          <NavbarItem className="md:text-md hover:bg-gray-800 hover:text-blue-500" href="/about">Quiénes Somos</NavbarItem>
          <NavbarItem className="hover:bg-gray-800 hover:text-blue-500" href="/companies">Empresas</NavbarItem>
          <NavbarItem className="md:text-md hover:bg-gray-800 hover:text-blue-500" href="/candidate/home">Candidatos</NavbarItem>
          <SignedOut>
            {pathname.split("/").includes("candidate") && (<NavbarItem className="md:text-md hover:bg-gray-800 hover:text-blue-500 md:hidden" href="/candidate/signup">Regístrate</NavbarItem>)}
            {!pathname.split("/").includes("candidate") && (<NavbarItem className="md:text-md hover:bg-gray-800 hover:text-blue-500 md:hidden" href="/recruiter/signin?redirect_url=recruiter/jobs/">Iniciar Sesión</NavbarItem>)}
          </SignedOut>
          <SignedIn>
            {
              user?.publicMetadata.role !== "recruiter" && (
                <NavbarItem className="md:text-md hover:bg-gray-800 hover:text-blue-500" href="/candidate/analyze">Analizar CV</NavbarItem>
              )
            }
            {(user?.publicMetadata.role === "recruiter" || user?.publicMetadata.role === "admin") && (
              <Menu>
                <NavbarItem className="md:text-md hover:bg-gray-800 hover:text-blue-500">
                  Menú
                  <ChevronDownIcon className="col-start-3" />
                </NavbarItem>
                <MenuContent popover={{ className: "border-0" }} className="bg-gray-800  text-white min-w-(--trigger-width) sm:min-w-56" items={categories}>
                  {(item) => (
                    <MenuItem className="sm:text-md bg-gray-800 hover:text-blue-500" id={item.id} textValue={item.label} href={item.url}>
                      {item.label}
                    </MenuItem>
                  )}
                </MenuContent>
              </Menu>
            )}
          </SignedIn>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className="max-md:hidden">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            {pathname.split("/").includes("candidate") && (<NavbarItem className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" href="/candidate/signup">Regístrate</NavbarItem>)}
            {!pathname.split("/").includes("candidate") && (<NavbarItem className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" href="/recruiter/signin?redirect_url=recruiter/jobs/">Iniciar Sesión</NavbarItem>)}
          </SignedOut>
        </NavbarSection>
      </Navbar>
      <NavbarMobile className="bg-gray-900 text-white">
        <NavbarTrigger />
        <NavbarSpacer />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </NavbarMobile>
    </NavbarProvider>
  )
}
