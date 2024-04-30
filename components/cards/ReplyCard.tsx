import Image from "next/image";
import Link from "next/link";

import { formatDateString } from "@/libs/utils";
import DeleteThread from "../forms/DeleteThread";
import { Avatar } from "../ui/avatar";

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
    text: string
    author: {
      image: string;
      name: string;
    };
  }[];
  isComment?: boolean;
}

function ReplyCard({
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
      <div className='flex items-start justify-between mb-2'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Avatar
                name={author.name?.length > 0 ? author.name : "Threads"}
                src={author.image}
                size={44}
                showTooltip={true}
                shape="circle"
                fallbackBackgroundColor="bg-custom-backgrounds-secondary"
                className="capitalize"
              />
            </Link>

            <div className='thread-reply_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {author.username}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className={`${isComment && "mb-10"} mt-3 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
                <Image
                  src='/assets/heart-gray.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src='/assets/reply.svg'
                    alt='heart'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/assets/repost.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/assets/share.svg'
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
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

      {!isComment && comments.length > 0 && (
        <div>
          {comments.slice(0, 2).map((comment, index) => (

            <div className='flex items-start justify-between' key={index}>
              <div className='flex w-full flex-1 flex-row gap-4 mt-6'>
                <div className='flex flex-col items-center'>
                  <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                    <Avatar
                      name={comment?.author?.name?.length > 0 ? comment?.author?.name : "Threads"}
                      src={comment?.author?.image}
                      size={44}
                      showTooltip={true}
                      shape="circle"
                      fallbackBackgroundColor="bg-custom-backgrounds-secondary"
                      className="capitalize"
                    />
                  </Link>

                  {index !== comments.length - 1 && <div className='thread-reply_bar' />}

                </div>

                <div className='flex w-full flex-col'>
                  <Link href={`/profile/${author.id}`} className='w-fit'>
                    <h4 className='cursor-pointer text-base-semibold text-light-1'>
                      {author.username}
                    </h4>
                  </Link>

                  <p className='mt-2 text-small-regular text-light-2'>{comment.text}</p>

                  <div className={`${isComment && "mb-10"} mt-3 flex flex-col gap-3`}>
                    <div className='flex gap-3.5'>
                      <Image
                        src='/assets/heart-gray.svg'
                        alt='heart'
                        width={24}
                        height={24}
                        className='cursor-pointer object-contain'
                      />
                      <Link href={`/thread/${id}`}>
                        <Image
                          src='/assets/reply.svg'
                          alt='heart'
                          width={24}
                          height={24}
                          className='cursor-pointer object-contain'
                        />
                      </Link>
                      <Image
                        src='/assets/repost.svg'
                        alt='heart'
                        width={24}
                        height={24}
                        className='cursor-pointer object-contain'
                      />
                      <Image
                        src='/assets/share.svg'
                        alt='heart'
                        width={24}
                        height={24}
                        className='cursor-pointer object-contain'
                      />
                    </div>

                    {isComment && comments.length > 0 && (
                      <Link href={`/thread/${id}`}>
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
                currentUserId={author.id}
                authorId={author.id}
                parentId={parentId}
                isComment={isComment}
              />

            </div>
          ))}
        </div>
      )}

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

export default ReplyCard;