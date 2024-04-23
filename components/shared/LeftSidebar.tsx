"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from "@/constants";
import { UserMenu } from "./UserMenu";
import { useSession } from "next-auth/react";


const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, status } = useSession()

  if (status === 'loading') {
    <>carregando</>
  } else {
    return (
      <section className='custom-scrollbar leftsidebar'>
        <div className='flex w-full flex-1 flex-col gap-6 px-6'>
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            if (link.route === "/profile") link.route = `${link.route}/${session?.user._id}`;

            return (
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className='text-light-1 max-lg:hidden'>{link.label}</p>
              </Link>
            );
          })}
        </div>

        <div className='mt-10 px-6'>
          <UserMenu />
        </div>
      </section>
    );
  }
};

export default LeftSidebar;