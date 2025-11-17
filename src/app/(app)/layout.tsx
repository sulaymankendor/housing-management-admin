"use client";
import { LayoutDashboard, SquareCheckBig, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return (
    <section>
      <div className="grid grid-cols-[12rem_1fr]">
        <div className="relative">
          <div className="fixed top-3 pl-7 z-[2000000] w-[12rem] pb-4 flex items-center gap-2 border-b">
            <Image
              width={2000}
              height={2000}
              className="size-10 rounded-full"
              src={"/trust-agency-logo.png"}
              alt="trust-agency-logo"
            />
          </div>
          <nav className="border-r bg-white border-r-gray-200 fixed top-0 bottom-0 w-[12rem] pt-21">
            <ul>
              {[
                {
                  name: "Dashboard",
                  href: "/",
                  icon: <LayoutDashboard size={15} />,
                },
                {
                  name: "Landlords",
                  href: "/landlords",
                  icon: <Users size={15} />,
                },
                {
                  name: "Expenditures",
                  href: "/expenditures",
                  icon: <Users size={15} />,
                },
                {
                  name: "Tasks",
                  href: "/tasks",
                  icon: <SquareCheckBig size={15} />,
                },
              ].map((nav, index) => {
                return (
                  <Link key={index} href={nav.href} className="">
                    <li
                      className={`${
                        pathName.includes(nav.name.toLowerCase())
                          ? "bg-cyan-600/90 text-white shadow-sm inset-shadow-2xs"
                          : pathName === nav.href
                          ? "bg-cyan-600/90 text-white shadow-sm inset-shadow-2xs"
                          : "bg-transparent"
                      } flex items-center gap-2 transition-all mt-2 hover:shadow-sm hover:inset-shadow-2xs hover:bg-cyan-600/90 w- hover:text-white text-black font-medium px-3 py-2 mx-1 rounded-sm text-[13px]`}
                    >
                      {nav.icon}
                      {nav.name}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="p-10">{children}</div>
      </div>
    </section>
  );
}

export default AppLayout;
