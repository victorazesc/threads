import Link from "next/link";
import Image from "next/image";
import TopbarMenu from "./TopBarMenu";
import { UserMenu } from "./UserMenu";

export default function Topbar() {
    const isUserLoggedIn = true
    return (
        <header className="topbar h-[60px] md:h-[74px] max-w-[1230px] bg-glassmorphism backdrop-blur-3xl z-10">
            <div className="hidden max-md:flex"></div>

            <Link href="/" className="items-center gap-4 ml-5 flex max-md:hidden">
                <Image src="/assets/logo.svg" alt="logo" width={32} height={32} />
            </Link>
            <div className="flex items-center gap-1 justify-center">
                <Link href="/" className="items-center gap-4 hidden max-md:flex">
                    <Image src="/assets/logo.svg" alt="logo" width={32} height={32} />
                </Link>
                <TopbarMenu />
            </div>
            <div className="items-center justify-end gap-4 flex" >
                <UserMenu />
            </div>
        </header>
    )
}