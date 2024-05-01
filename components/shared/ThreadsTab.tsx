import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/actions/community.actions";
import { fetchUserPosts } from "@/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";
import { CreateThread } from "../dialogs/CreateThread";
import { DialogTrigger } from "../ui/dialog";

interface Result {
  username: string;
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      username: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        name: string;
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className='-mt-2 flex flex-col h-full'>
      {result.threads.length <= 0 ?
        <div className="flex items-center justify-center flex-grow h-full">
          <div className="items-center h-full flex">
            <CreateThread hiddenTrigger={true}>
              <DialogTrigger asChild>
                <span className="border-primary-outline border h-9 flex items-center w-full justify-center rounded-xl px-4">
                  Criar a tua primeira Thread
                </span>
              </DialogTrigger>
            </CreateThread>
          </div>
        </div>
        :
        <div>
          {result.threads.map((thread) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUserId={currentUserId}
              parentId={thread.parentId}
              content={thread.text}
              author={
                accountType === "User"
                  ? { name: result.name, image: result.image, id: result.id, username: result.username, }
                  : {
                    username: thread.author.username,
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
              }
              community={
                accountType === "Community"
                  ? { name: result.name, id: result.id, image: result.image }
                  : thread.community
              }
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          ))}
        </div>
      }

    </section>
  );
}

export default ThreadsTab;