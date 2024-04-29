import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from "@/components/shared/Pagination";

import { fetchPosts } from "@/actions/thread.actions";
import { fetchUser } from "@/actions/user.actions";
import { authOptions } from "@/libs/auth";
import { Session, getServerSession } from "next-auth";
import { CreateThread } from "@/components/dialogs/CreateThread";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session: Session | null = await getServerSession(authOptions);

  const user = session?.user
  if (!user) {
    return null; // to avoid typescript warnings
  }

  const userInfo = await fetchUser(user.email);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    30
  );

  return (
    <>
      <CreateThread className="hidden sm:flex" />
      <section className='mt-4 flex flex-col gap-2'>
        {result.posts.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user._id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;