"use client"

import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline"
// import { Avatar } from "@/components/ui/avatar"
import {
  Menu,
  MenuContent,
  MenuHeader,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/intentui/menu"

function UserMenu() {
  return (
    <Menu>
      <MenuTrigger aria-label="Open Menu">
        {/* <Avatar
          alt="cobain"
          size="md"
          isSquare
          src="https://intentui.com/images/avatar/cobain.jpg"
        /> */}
      </MenuTrigger>
      <MenuContent placement="bottom right" className="min-w-60 sm:min-w-56">
        <MenuSection>
          <MenuHeader separator>
            <span className="block">Kurt Cobain</span>
            <span className="font-normal text-muted-fg">@cobain</span>
          </MenuHeader>
        </MenuSection>

        <MenuItem href="#dashboard">
          <Squares2X2Icon />
          Dashboard
        </MenuItem>
        <MenuItem href="#settings">
          <Cog6ToothIcon />
          Settings
        </MenuItem>
        <MenuItem href="#security">
          <ShieldCheckIcon />
          Security
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <CommandLineIcon />
          Command Menu
        </MenuItem>

        <MenuItem href="#contact">
          <LifebuoyIcon />
          Customer Support
        </MenuItem>
        <MenuSeparator />
        <MenuItem href="#logout">
          <ArrowRightOnRectangleIcon />
          Log out
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}

import { ChevronDownIcon, MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline"
// import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/intentui/button"
// import { Link } from "@/components/ui/link"
import Link from "next/link"
import {
  Navbar,
  NavbarGap,
  NavbarItem,
  NavbarMobile,
  type NavbarProps,
  NavbarProvider,
  NavbarSection,
  NavbarSeparator,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/intentui/navbar"
import { Separator } from "@/components/ui/separator"
import Logo from "./logo"
import { SignedIn, UserButton } from "@clerk/nextjs"

const categories = [
  { id: 1, label: "Electronics", url: "#" },
  { id: 2, label: "Fashion", url: "#" },
  { id: 3, label: "Home & Kitchen", url: "#" },
  { id: 4, label: "Sports", url: "#" },
  { id: 5, label: "Books", url: "#" },
  { id: 6, label: "Beauty & Personal Care", url: "#" },
  { id: 7, label: "Grocery", url: "#" },
  { id: 8, label: "Toys & Games", url: "#" },
  { id: 9, label: "Automotive", url: "#" },
  { id: 10, label: "Health & Wellness", url: "#" },
]

export function AppNavbar(props: NavbarProps) {
  return (
    <NavbarProvider>
      <Navbar intent="inset" {...props}>
        <NavbarStart>
          <Link
            className="flex items-center gap-x-2 font-medium"
            aria-label="Goto documentation of Navbar"
            href="/docs/components/layouts/navbar"
          >
            <Logo />
          </Link>
        </NavbarStart>
        <NavbarGap />
        <NavbarSection>
          <NavbarItem className="hover:bg-gray-800 hover:text-blue-500" href="/" isCurrent>
            Home
          </NavbarItem>
          <NavbarItem className="hover:bg-gray-800 hover:text-blue-500" href="#">Shop</NavbarItem>
          <NavbarItem className="hover:bg-gray-800 hover:text-blue-500" href="#">Offers</NavbarItem>
          <NavbarItem className="hover:bg-gray-800 hover:text-blue-500" href="#">Orders</NavbarItem>
          <Menu>
            <NavbarItem className="hover:bg-gray-800 hover:text-blue-500">
              Categories
              <ChevronDownIcon className="col-start-3" />
            </NavbarItem>
            <MenuContent popover={ {className: "border-0"}} className="bg-gray-800  text-white min-w-(--trigger-width) sm:min-w-56" items={categories}>
              {(item) => (
                <MenuItem className="bg-gray-800 hover:text-blue-500" id={item.id} textValue={item.label} href={item.url}>
                  {item.label}
                </MenuItem>
              )}
            </MenuContent>
          </Menu>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className="max-md:hidden">
          <Button intent="plain" size="sq-sm" aria-label="Search for products">
            <MagnifyingGlassIcon />
          </Button>

          <Separator orientation="vertical" className="mr-3 ml-1 h-5" />
          <SignedIn>

          <UserButton />
          </SignedIn>
        </NavbarSection>
      </Navbar>
      <NavbarMobile className="bg-gray-800 text-white">
        <NavbarTrigger />
        <NavbarSpacer />
          <Button intent="plain" size="sq-sm" aria-label="Search for products">
            <MagnifyingGlassIcon />
          </Button>
        <NavbarSeparator className="mr-2.5" />
        <UserButton />
      </NavbarMobile>
    </NavbarProvider>
  )
}
