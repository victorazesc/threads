"use client";

import Image from "next/image";
import { sidebarLinks } from "@/constants/tabs";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CreateThread } from "../dialogs/CreateThread";
import { DialogTrigger } from "../ui/dialog";

export default function TopbarMenu() {
    const pathname = usePathname();

    const { data: session, status } = useSession()
    if (status === 'loading') {
        <>carregando</>
    }
    else {
        return (
            <div className='grid w-[620px] px-[70px] max-md:hidden mt-1' style={{ gridTemplateColumns: "repeat(5, 20%)" }}>
                {sidebarLinks.map((link) => {
                    const isActive =
                        (pathname.includes(link.route) && link.route.length > 1) ||
                        pathname === link.route;

                    if (link.route === "/profile") link.route = `${link.route}/${session?.user._id}`;

                    return (
                        <div key={link.label}>

                            {link.dialog ?
                                <CreateThread hiddenTrigger={true}>
                                    <DialogTrigger asChild>
                                        <span className={`p-6 rounded-2xl flex items-center justify-center ${isActive ? 'text-primary' : 'text-navigation-icon'}`}>
                                            <link.imgURL size={28} />
                                            <p className='text-primary md:hidden'>{link.label}</p>
                                        </span>
                                    </DialogTrigger>
                                </CreateThread>
                                :
                                <Link
                                    href={link.route}
                                    key={link.label}
                                    className={`${isActive ? 'text-primary' : 'text-navigation-icon'} p-6 rounded-2xl flex items-center justify-center`}
                                >
                                    <link.imgURL size={28} />
                                    <p className='text-primary md:hidden'>{link.label}</p>
                                </Link>
                            }
                        </div>
                    );
                })}
            </div>
        )
    }
}