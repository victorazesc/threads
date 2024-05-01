import { redirect } from "next/navigation";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/SearchBar";
import Pagination from "@/components/shared/Pagination";

import { fetchUser, fetchUsers } from "@/actions/user.actions";
import { authOptions } from "@/libs/auth";
import { Session, getServerSession } from "next-auth";

async function Page({
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

  const result = await fetchUsers({
    userId: user._id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section>

      <Searchbar routeType='search' />

      <div className='mt-9 flex flex-col gap-9'>
        {result.users.length === 0 ? (
          <p className='no-result'>Sem resultados.</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>

      <Pagination
        path='search'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
}

export default Page;