import { redirect } from "next/navigation";
import { fetchCommunityPosts } from "@/actions/community.actions";
import { fetchReplies } from "@/actions/thread.actions";
import ReplyCard from "../cards/ReplyCard";

interface Result {
  _id: string;
  text: string;
  parentId: string | null;
  author: {
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
  children: {
    author: {
      image: string;
    };
  }[];
}[];


interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function RepliesTab({ currentUserId, accountId, accountType }: Props) {
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchReplies(currentUserId);
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className='-mt-2 flex flex-col h-full'>

      {
        result.posts.length === 0 ?
          <div className="flex items-center justify-center flex-grow h-full">
            <div className="items-center h-full flex">
              <span className="h-9 flex items-center w-full justify-center text-secondary">
                Ainda sem respostas.
              </span>
            </div>
          </div>
          :
          <div>
            {result.posts.map((thread: { _id: string; parentId: string | null; text: string; author: { username: any; name: any; image: any; id: any; }; community: { id: string; name: string; image: string; } | null; createdAt: string; children: { text: string, author: { image: string; name: string; }; }[]; }) => (
              <ReplyCard
                key={thread._id}
                id={thread._id}
                currentUserId={currentUserId}
                parentId={thread.parentId}
                content={thread.text}
                author={
                  {
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

export default RepliesTab;