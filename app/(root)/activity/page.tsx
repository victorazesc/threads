import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { fetchUser, getActivity } from "@/actions/user.actions";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

async function Page() {
  const session: Session | null = await getServerSession(authOptions);

  const user = session?.user

  if (!user) {
    return null; // to avoid typescript warnings
  }

  const userInfo = await fetchUser(user.email);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  return (
    <section className='mt-10 flex flex-col gap-5 flex-grow h-full'>
      {activity.length > 0 ? (
        <>
          {activity.map((activity) => (
            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
              <article className='activity-card'>
                <Image
                  src={activity.author.image}
                  alt='user_logo'
                  width={20}
                  height={20}
                  className='rounded-full object-cover'
                />
                <p className='!text-small-regular text-light-1'>
                  <span className='mr-1 text-primary-500'>
                    {activity.author.name}
                  </span>{" "}
                  replied to your thread
                </p>
              </article>
            </Link>
          ))}
        </>
      ) : (
        <div className="flex flex-col flex-grow items-center justify-center">
          <span className='text-secondary'>Nenhuma atividade.</span>
        </div>
      )}
    </section>
  );
}

export default Page;