"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useSession } from "next-auth/react"
import { Avatar } from "../ui/avatar"
import { AlignLeft, HashIcon, Images, X } from "lucide-react"
import React, { useState } from "react"
import { cn } from "@/libs/utils"
import { addCommentToThread, createThread } from "@/actions/thread.actions"
import { usePathname, useRouter } from "next/navigation"
import { json } from "stream/consumers"


const CreateThreadInput = ({ user, onChange, placeholder, value }: any) => {
    return (
        <div style={{ gridTemplateColumns: "48px minmax(0,1fr)", gridTemplateRows: "21px 19px max-content max-content" }} className="box-border grid">
            <div style={{ gridRowEnd: "span 2", gridColumnStart: 1, gridRowStart: 1 }} className="relative grid">
                <Avatar
                    name={user.name ?? "Threads"}
                    src={user.image}
                    size={36}
                    showTooltip={true}
                    shape="circle"
                    fallbackBackgroundColor="bg-custom-backgrounds-secondary"
                    className="capitalize"
                />

            </div>
            <div style={{ gridColumnStart: 2, gridRowStart: 1 }} className="self-end flex items-center">
                <div className="flex-grow">
                    <span className="font-medium">{user.username}</span>
                </div>
            </div>
            <div style={{ gridRowEnd: "span 2", gridColumnStart: 2, gridRowStart: 2 }} >
                <div className="relative">
                    <div className="select-text whitespace-pre-wrap break-words text-15 relative focus-visible:outline-none text-primary" contentEditable="true" role="textbox" spellCheck="true" tabIndex={0} data-lexical-editor="true" onInput={(e: any) => onChange(e.target.innerText)}>
                        <p style={{ pointerEvents: "all" }}>
                            <br />
                        </p>
                    </div>
                    {
                        !value && <div className="absolute top-0" style={{ pointerEvents: "none" }}>
                            <span className="text-secondary" dir="auto">{placeholder}</span>
                        </div>
                    }

                </div>
                <div className='flex gap-3.5 text-secondary mt-3'>
                    <Images className='cursor-pointer' size={20} />
                    <HashIcon className='cursor-pointer' size={20} />
                    <AlignLeft className='cursor-pointer' size={20} />
                </div>
            </div>
            <div style={{ gridRowStart: 3, gridColumnStart: 1 }} className="relative h-full">
                <div className='thread-card_bar absolute left-[17px] h-full' />
            </div>
        </div>
    )
}


interface IProps {
    className?: string
    hiddenTrigger: boolean
    children?: React.ReactElement
}

export function CreateThread({ className, hiddenTrigger = false, children }: IProps) {
    const { data: session, status } = useSession()
    const [PrincipalThreadValue, setPrincipalThreadValue] = useState("")
    const [comments, setComments] = useState<{ value: string }[]>([])
    if (status === 'loading') {
        <>carregando</>
    }

    if (!session?.user) {
        return null
    }

    const router = useRouter();
    const pathname = usePathname();

    const handleCommentChange = (index: number, newValue: string) => {
        // Cria uma cópia do array de comentários
        const updatedComments = [...comments];
        // Atualiza o valor do comentário no índice especificado
        updatedComments[index] = { ...updatedComments[index], value: newValue };
        // Atualiza o estado com a nova cópia do array
        setComments(updatedComments);
    };

    const handleDelete = (index: number) => {
        // Cria uma cópia do array de comentários excluindo o item no índice especificado
        const updatedComments = comments.filter((_, i) => i !== index);
        // Atualiza o estado com a nova cópia do array
        console.log(updatedComments)
        setComments(updatedComments);
    };

    const addComment = () => {
        // Adiciona um novo comentário com um valor inicial vazio
        setComments([...comments, { value: '' }]);
    };


    const onSubmit = async (values: any) => {

        createThread({
            text: PrincipalThreadValue,
            author: session.user._id,
            communityId: null,
            path: pathname,
        }).then((response) => {
            if (comments.length > 0) {
                comments.forEach(async comment => {
                    await addCommentToThread(response._id, comment.value, response.author, pathname)
                });
            }
            setComments([])

        });

        router.push("/");
    };


    return (
        <Dialog>
            {children}
            <DialogTrigger asChild className={`${cn(className)} ${hiddenTrigger && 'hidden'}`}>
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

            </DialogTrigger>

            <DialogContent className="md:max-w-2x w-full h-full md:h-auto py-0 md:py-6 flex flex-col">
                <DialogHeader className="!text-center w-full font-medium">
                    <div className="grid items-center h-11" style={{ gridTemplateColumns: "minmax(64px, 100px) 1fr minmax(64px, 100px)" }}>
                        <DialogClose className="flex text-15 font-normal justify-items-start">Cancelar</DialogClose>
                        <span>Nova Thread</span>
                    </div>
                </DialogHeader>
                <div className="h-full w-full overflow-auto break-words">
                    <CreateThreadInput user={session?.user} onChange={setPrincipalThreadValue} value={PrincipalThreadValue} placeholder={"Inicia uma thread"} />
                    {comments.map((comment, index) => {
                        return (
                            <div className="mt-4 relative">
                                <CreateThreadInput value={comment.value} user={session?.user} onChange={(value: string) => handleCommentChange(index, value)} placeholder={"Conta-nos mais"} />
                                <Button variant={"ghost"} className="absolute top-0 right-0" onClick={() => handleDelete(index)}><X size={20} /></Button>
                            </div>
                        )
                    })}
                    <div className="flex flex-row gap-2 items-center pt-3">
                        <div className="flex flex-col items-center pl-[10px]">
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
                            <Button variant={"ghost"} onClick={addComment} disabled={(!PrincipalThreadValue && comments.length === 0) || (comments.length > 0 && comments.some((comment) => { return comment.value === "" }))} className="bg-transparent text-15 font-normal text-secondary outline-none dark:hover:bg-transparent dark:hover:text-secondary">Adicionar à thread</Button>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex items-center h-16 w-full justify-between py-6">
                        <span className="bg-transparent text-15 font-normal text-secondary outline-none mt-1">Qualquer pessoa pode responder</span>
                        <DialogClose><Button onClick={onSubmit} disabled={(!PrincipalThreadValue && comments.length === 0) || (comments.length > 0 && comments.some((comment) => { return comment.value === "" }))} className="rounded-full">Publicar</Button></DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
