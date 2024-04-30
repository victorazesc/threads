"use client"

import { sidebarLinks } from "@/constants/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import Image from "next/image";
import { CreateThread } from "../dialogs/CreateThread"
import { DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"

export default function Bottombar() {
    const router = useRouter()
    const pathName = usePathname()
    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map((link) => {
                    const isActive = (pathName.includes(link.route) && link.route.length > 1) || pathName === link.route
                    return (
                        <div key={link.label}>
                            {link.dialog ?
                                <CreateThread hiddenTrigger={true}>
                                    <DialogTrigger asChild>
                                        <span className={`bottombar_link ${isActive ? 'text-primary' : 'text-navigation-icon'}`}>
                                            <link.imgURL />
                                            <p className="text-subtle-medium text-primary max-sm:hidden">
                                                {link.label.split(/\s+/)[0]}
                                            </p>
                                        </span>
                                    </DialogTrigger>
                                </CreateThread>
                                :
                                <Link key={link.label} href={link.route} className={`bottombar_link ${isActive ? 'text-primary' : 'text-navigation-icon'}`} >
                                    <link.imgURL />
                                    <p className="text-subtle-medium text-primary max-sm:hidden">
                                        {link.label.split(/\s+/)[0]}
                                    </p>
                                </Link>
                            }
                        </div>


                    )
                }
                )}
            </div>
        </section>
    )
}