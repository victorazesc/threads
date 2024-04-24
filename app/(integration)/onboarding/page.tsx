import { redirect } from "next/navigation";
import { fetchUser, igoreOnboard } from "@/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { signOut } from "next-auth/react";
import SignOutButton from "@/components/account/SignOutButton";
import SkipOnboarding from "@/components/account/SkipOnboarding";

async function Page() {

  const session: Session | null = await getServerSession(authOptions);

  const user = session?.user

  if (!user) {
    return null; // to avoid typescript warnings
  }

  const userInfo = await fetchUser(user.email);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user._id,
    objectId: userInfo?.id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : "",
    bio: userInfo ? userInfo?.bio : "",
    email: user.email,
    image: userInfo ? userInfo?.image : user.image,
  };

  return (
    <>
      <nav className="w-full flex justify-between text-primary px-8 py-6 sticky top-0 h-14 bg-custom-backgrounds-secondary">

        <div className="flex gap-2"><ChevronLeft /> <SignOutButton label="Voltar" /></div>
        <div className="flex gap-2"><SkipOnboarding id={user.email} /><ChevronRight /></div>

      </nav>
      <main className='mx-auto flex w-full max-w-sm flex-col justify-start py-20'>
        <div className="sticky top-14 bg-custom-backgrounds-secondary text-center pb-3">
          <h1 className='text-24 text-primary'>Perfil</h1>
          <p className='text-15 mt-3 text-base-regular text-secondary'>
            Personaliza o teu perfil do Threads.
          </p>
        </div>

        <section className='mt-9 bg-custom-backgrounds-primary border border-primary-outline p-4 rounded-xl'>
          <AccountProfile user={userData} btnTitle='Continue' />
        </section>
      </main>
    </>
  );
}

export default Page;