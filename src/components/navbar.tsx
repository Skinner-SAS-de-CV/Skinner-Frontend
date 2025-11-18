"use client";
import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu"
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

const menuRecruiter = [
    { title: "Mis Puestos", href: "/recruiter/jobs" },
    { title: "Registrar", href: "/register" },
    { title: "Analizar", href: "/analyze" },
    { title: "Buscador", href: "/recruiter/search" },
];

export function Navbar() {
    const pathname = usePathname();
    const { user } = useUser();
    const InciarCandidatoORecruiter = pathname.split("/").includes("candidate") ? <Link
        href="/candidate/signin"
        className="block text-lg text-gray-300 hover:text-blue-500"
    >
        Iniciar Sesión
    </Link> : <Link href="/recruiter/signin?redirect_url=recruiter/jobs/"
        className="block text-lg text-gray-300 hover:text-blue-500">
        Iniciar Sesión
    </Link>;
    return (
        <NavigationMenu className="bg-gray-900 shadow-md">
            <NavigationMenuList className="flex-wrap">
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>

                        <Link href="/" className="text-lg text-gray-300 hover:text-blue-500">
                            Home
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link
                            href="/about"
                            className="text-lg text-gray-300 hover:text-blue-500"
                        >
                            ¿Quiénes Somos?
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link
                            href="/candidate/home"
                            className="text-lg text-gray-300 hover:text-blue-500"
                        >
                            Candidatos
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link
                            href="/contact"
                            className="block text-lg text-gray-300 hover:text-blue-500"
                        >
                            Contáctanos
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <SignedOut>
                    {
                        pathname.split("/").includes("candidate") &&
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <Link
                                    href="/candidate/signup"
                                    className="block text-lg text-gray-300 hover:text-blue-500"
                                >
                                    Regístrate
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    }
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            {InciarCandidatoORecruiter}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </SignedOut>
                <SignedIn>
                    {
                        user?.publicMetadata.role !== "recruiter" && (
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>

                                    <Link
                                        href="/candidate/analyze"
                                        className="block text-lg text-gray-300 hover:text-blue-500"
                                    >
                                        Analizar CV
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>)
                    }
                    {(user?.publicMetadata.role === "recruiter" || user?.publicMetadata.role === "admin") && (
                        <NavigationMenuItem className="">
                            <NavigationMenuTrigger>Páginas</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[200px] gap-4">
                                    {
                                        menuRecruiter.map((item) => <li key={item.title}>
                                            <NavigationMenuLink asChild>
                                                <Link href={item.href}>{item.title}</Link>
                                            </NavigationMenuLink>
                                        </li>)
                                    }

                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>)}
                </SignedIn>
                <NavigationMenuItem>
                    <UserButton />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}