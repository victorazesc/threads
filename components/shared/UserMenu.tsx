import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import SignOutButton from "../account/SignOutButton";
import { AlignRight, CreditCard, User, UserCircle2 } from "lucide-react";

// const EditProfile = dynamic(() => import('./EditProfile'), {
//     ssr: false
// });

export function UserMenu() {
    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="text-sm px-4 py-2 font-medium transition-all text-[#A1A1A1] hover:text-[#EDEDED]">
                        <AlignRight size={40} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link className="flex items-center w-full h-full gap-2" href="/profile/edit" >
                                <User size={20} />
                                <span>Editar Perfil</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {/* <EditProfile /> */}
        </Dialog>
    )
}
