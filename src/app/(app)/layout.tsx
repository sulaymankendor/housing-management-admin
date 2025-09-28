import Link from "next/link";
import React from "react";

function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-gray-100">
      <div className="grid grid-cols-[12rem_1fr]">
        <div>
          <nav className="border-r bg-white border-r-gray-200 fixed top-0 bottom-0 w-[12rem] pt-14">
            <ul>
              {[
                { name: "Dashboard", href: "/" },
                { name: "Landlords", href: "/landlords" },
                { name: "Staffs", href: "/staffs" },
              ].map((nav, index) => {
                return (
                  <Link key={index} href={nav.href}>
                    <li className="hover:bg-gray-200 text-gray-800 font-medium py-3 pl-7 text-sm">
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
