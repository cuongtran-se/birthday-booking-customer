"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
  HomeModernIcon,
  HomeIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Button, Typography } from "antd";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getUserInfo,
  loadAuthState,
  logout,
} from "@/lib/features/slice/auth.slice";
import { APP_CONSTANTS } from "@/enums/app";
import UserDropdown from "./UserDropdown";

const NAV_MENU = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Booking",
    icon: BookOpenIcon,
    href: "/booking-history",
  },
  {
    name: "Account",
    icon: UserCircleIcon,
    href: "/account",
  },
];

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
  className?: string | undefined;
}

function NavItem({ children, href, className }: NavItemProps) {
  return (
    <li>
      <Link href={href || "#"} className={className}>
        {children}
      </Link>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [whichItem, setWhichItem] = useState<string>("/");

  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    setWhichItem(pathName);
  }, [pathName]);
  function handleOpen() {
    setOpen((cur) => !cur);
  }
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false),
    );
  }, []);
  // Dispatch
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    await dispatch(logout());
    router.refresh();
  };
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const userInfo = useAppSelector((state) => state.auth.userInfo?.data);
  useEffect(() => {
    const fetchLoadAuthState = async () => {
      await dispatch(loadAuthState());
    };
    fetchLoadAuthState();
  }, [isAuthenticated]);
  useEffect(() => {
    const fetchUserInfo = async () => {
      await dispatch(getUserInfo()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="sticky top-4 z-10 px-10">
      <div className="container mx-auto">
        <MTNavbar
          placeholder=""
          blurred
          color="white"
          className="relative z-50 mt-6 border-0 py-3 pl-0 pr-0"
        >
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <div className="ml-5 flex items-center space-x-2">
                <Image
                  width={35}
                  height={35}
                  style={{ width: 35, height: 35, borderRadius: 10 }}
                  src="/image/icon.png"
                  alt="logo"
                />
                <h3 className="font-bold text-blue-900">LOVEKIDS</h3>
              </div>
            </Link>
            <ul className="hidden items-center gap-8 lg:flex">
              {NAV_MENU.map(({ name, icon: Icon, href }) => {
                const isActive = pathName === href; // check active nav bar
                return (
                  <NavItem
                    className={`flex items-center gap-2 text-base font-medium ${isActive ? "text-blue-900" : "text-gray-800"}`}
                    key={name}
                    href={href}
                  >
                    <Icon
                      className="h-6 w-6"
                      color={isActive ? "blue" : "grey"}
                    />

                    {name}
                  </NavItem>
                );
              })}
            </ul>
            <div className="mr-5 hidden items-center gap-4 lg:flex">
              {pathName !== "/authen" &&
                (!isAuthenticated ? (
                  <Button
                    onClick={() => router.push("/authen")}
                    type="primary"
                    size="large"
                  >
                    Log In
                  </Button>
                ) : (
                  <div className="flex items-center gap-6">
                    <UserDropdown
                      handleLogout={handleLogout}
                      userInfo={userInfo}
                    />
                  </div>
                ))}

              {/* <a
                href="https://www.material-tailwind.com/blocks"
                target="_blank"
              >
                <Button type="primary" size="large">
                  Sign Up
                </Button>
              </a> */}
            </div>
            <IconButton
              placeholder=""
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>
          <Collapse open={open}>
            <div className="container mx-auto mt-3 border-t border-gray-200 px-2 pt-4">
              <ul className="flex flex-col gap-4">
                {NAV_MENU.map(({ name, icon: Icon, href }) => (
                  <NavItem key={name} href={href}>
                    <Icon className="h-5 w-5 " />
                    {name}
                  </NavItem>
                ))}
              </ul>
              <div className="mb-4 mt-6 flex items-center gap-4">
                <Button>Log in</Button>
                <a
                  href="https://www.material-tailwind.com/blocks"
                  target="_blank"
                >
                  <Button color="gray">blocks</Button>
                </a>
              </div>
            </div>
          </Collapse>
        </MTNavbar>
      </div>
    </div>
  );
}

export default Navbar;
