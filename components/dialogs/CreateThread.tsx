"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useSession } from "next-auth/react"
import { Avatar } from "../ui/avatar"
import { AlignLeft, HashIcon, Images } from "lucide-react"
import { useState } from "react"
import { cn } from "@/libs/utils"

interface IProps {
    className?: string
}

export function CreateThread({ className }: IProps) {
    const { data: session, status } = useSession()
    const [PrincipalThreadValue, setPrincipalThreadValue] = useState("")
    if (status === 'loading') {
        <>carregando</>
    }
    return (
        <Dialog>
            <DialogTrigger asChild className={cn(className)}>
                <div className="flex flex-row gap-2 items-center pt-3 w-full">
                    <div className="flex flex-col items-center">
                        <Avatar
                            name={session?.user.name ?? "Threads"}
                            src={session?.user.image}
                            size={36}
                            showTooltip={true}
                            shape="circle"
                            fallbackBackgroundColor="bg-custom-backgrounds-secondary"
                            className={`capitalize`}
                        />
                    </div>
                    <div className="w-full">
                        <span className="bg-transparent text-15 font-normal text-secondary outline-none mt-1">Inicia uma thread...</span>
                    </div>
                    <div>
                        <Button className="rounded-full">Publicar</Button>
                    </div>
                </div>
                {/* <Button variant="outline">Edit Profile</Button> */}
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader className="!text-center w-full font-medium">
                    Nova Thread
                </DialogHeader>
                <div className="flex flex-col">

                    <div className="flex flex-row gap-3">
                        <div className="flex flex-col items-center">
                            <Avatar
                                name={session?.user.name ?? "Threads"}
                                src={session?.user.image}
                                size={44}
                                showTooltip={true}
                                shape="circle"
                                fallbackBackgroundColor="bg-custom-backgrounds-secondary"
                                className="capitalize"
                            />

                            <div className='thread-card_bar' />
                        </div>
                        <div>
                            <div>{session?.user.username}</div>
                            <input className="bg-transparent text-15 placeholder:text-secondary outline-none" onChange={(e) => { setPrincipalThreadValue(e.target.value) }} type="text" placeholder="Inicia uma thread" />
                            <div className='flex gap-3.5 text-secondary mt-3'>
                                <Images className='cursor-pointer' size={20} />
                                <HashIcon className='cursor-pointer' size={20} />
                                <AlignLeft className='cursor-pointer' size={20} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center pt-3">
                        <div className="flex flex-col items-center pl-4">
                            <Avatar
                                name={session?.user.name ?? "Threads"}
                                src={session?.user.image}
                                size={16}
                                showTooltip={true}
                                shape="circle"
                                fallbackBackgroundColor="bg-custom-backgrounds-secondary"
                                className={`capitalize ${!PrincipalThreadValue ? 'opacity-50' : ''}`}
                            />
                        </div>
                        <div>
                            <Button variant={"ghost"} disabled={!PrincipalThreadValue} className="bg-transparent text-15 font-normal text-secondary outline-none mt-1">Adicionar à thread</Button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <div>
                        <Button className="rounded-full">Publicar</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
