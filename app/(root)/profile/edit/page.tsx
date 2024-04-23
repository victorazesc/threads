import { redirect } from "next/navigation";

import { fetchUser } from "@/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import { authOptions } from "@/libs/auth";
import { Session, getServerSession } from "next-auth";
import Email from "next-auth/providers/email";

// Copy paste most of the code as it is from the /onboarding

async function Page() {
  const session: Session | null = await getServerSession(authOptions);

  const user = session?.user

  if (!user) {
    return null; // to avoid typescript warnings
  }

  const userInfo = await fetchUser(user.email);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const userData = {
    id: user.id,
    email: user.email,
    objectId: userInfo?.id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.name.split('')[0] ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.image,
  };

  return (
    <>
      <h1 className='head-text'>Edit Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>Make any changes</p>

      <section className='mt-12'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </>
  );
}

export default Page;