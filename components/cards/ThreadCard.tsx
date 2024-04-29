import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/libs/utils";
import DeleteThread from "../forms/DeleteThread";
import { Avatar } from "../ui/avatar";
import { Heart, LucideMessageCircle, RefreshCw, Reply, Send } from "lucide-react";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    username: string;
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
      name: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col border-t-[0.5px] border-primary-outline ${isComment ? "xs:px-7" : "py-3"
        }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-1'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Avatar
                name={author.name?.length > 0 ? author.name : "Threads"}
                src={author.image}
                size={36}
                showTooltip={true}
                shape="circle"
                fallbackBackgroundColor="bg-custom-backgrounds-secondary"
                className="capitalize"
              />
            </Link>
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-15 text-light-1'>
                {author.username}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3 h-9`}>
              <div className='flex gap-3.5 text-13 text-charcoal-icon'>
                <Link href={`/thread/${id}`} className="flex cursor-pointer items-center w-9 gap-1">
                  <Heart size={20} />
                </Link>
                <Link href={`/thread/${id}`} className="flex cursor-pointer items-center w-9 gap-1">
                  <LucideMessageCircle size={20} />
                  {comments.length > 0 && (
                    <span>
                      {comments.length}
                    </span>
                  )}
                </Link>
                <Link href={`/thread/${id}`} className="flex cursor-pointer items-center w-9 gap-1">
                  <RefreshCw size={20} />
                </Link>
                <Link href={`/thread/${id}`} className="flex cursor-pointer items-center w-9 gap-1">
                  <Send size={20} />
                </Link>
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`} className="flex cursor-pointer items-center">
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>
          <Avatar
            name={community.name.length > 0 ? community.name : "Threads"}
            src={community.image}
            size={14}
            showTooltip={false}
            shape="circle"
            fallbackBackgroundColor="bg-custom-backgrounds-secondary"
            className={`capitalize`}
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;