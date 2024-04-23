import PostThread from "@/components/forms/PostThread"
import { fetchUser } from "@/actions/user.actions"
import { redirect } from "next/navigation"
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

export default async function Page() {
    const session: Session | null = await getServerSession(authOptions);

    const user = session?.user
  
    if (!user) {
      return null; // to avoid typescript warnings
    }

    const userInfo = await fetchUser(user.email)

    if (!userInfo?.onboarded) redirect('/onboarding')
    return (
        <>
            <h1 className="head-text">create thread</h1>
            <PostThread userId={userInfo._id} />
        </>
    )
}