"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/actions/thread.actions";
import { Trash } from "lucide-react";

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <Trash size={18} className='cursor-pointer object-contain' onClick={async () => {
      await deleteThread(JSON.parse(threadId), pathname);
      if (!parentId || !isComment) {
        router.push("/");
      }
    }} />
  );
}

export default DeleteThread;