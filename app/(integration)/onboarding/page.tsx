import { redirect } from "next/navigation";
import { fetchUser } from "@/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { ChevronLeft, ChevronRight } from "lucide-react";

async function Page() {

  const session: Session | null = await getServerSession(authOptions);

  const user = session?.user

  if (!user) {
    return null; // to avoid typescript warnings
  }




  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?.id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : userInfo?.name.split(' ')[0] ?? "",
    bio: userInfo ? userInfo?.bio : "",
    email: user.email,
    image: userInfo ? userInfo?.image : user.image,
  };

  return (
    <>
      <nav className="w-full flex justify-between text-primary px-8 py-6 sticky top-0 h-14 bg-custom-backgrounds-secondary">
        <div className="flex gap-2"><ChevronLeft />Voltar</div>
        <div className="flex gap-2">Ignorar<ChevronRight /></div>

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