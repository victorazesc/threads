"use client"

import { sidebarLinks } from "@/constants/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import Image from "next/image";

export default function Bottombar() {
    const router = useRouter()
    const pathName = usePathname()
    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map((link) => {
                    const isActive = (pathName.includes(link.route) && link.route.length > 1) || pathName === link.route
                    return (
                        <Link key={link.label} href={link.route} className={`bottombar_link ${isActive && 'bg-primary-500'}`} >
                            <link.imgURL />
                            <p className="text-subtle-medium text-light-1 max-sm:hidden">
                                {link.label.split(/\s+/)[0]}
                            </p>
                        </Link>)
                }
                )}
            </div>
        </section>
    )
}