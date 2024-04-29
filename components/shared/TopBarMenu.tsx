"use client";

import Image from "next/image";
import { sidebarLinks } from "@/constants/tabs";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TopbarMenu() {
    const pathname = usePathname();

    const { data: session, status } = useSession()
    if (status === 'loading') {
        <>carregando</>
    }
    else {
        return (
            <div className='grid w-full max-md:hidden mt-1' style={{ gridTemplateColumns: "repeat(5, 20%)" }}>
                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) && link.route.length > 1) ||
                        pathname === link.route;

                    if (link.route === "/profile") link.route = `${link.route}/${session?.user._id}`;

                    return (

                        <Link
                            href={link.route}
                            key={link.label}

                            className={`${isActive && "bg-primary-500"} p-6 rounded-2xl`}
                        >

                            <link.imgURL />

                            <p className='text-light-1 md:hidden'>{link.label}</p>
                        </Link>
                    );
                })}
            </div>
        )
    }
}