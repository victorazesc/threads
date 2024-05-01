import Image from "next/image";
import { redirect } from "next/navigation";

import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUser, fetchUserById } from "@/actions/user.actions";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { profileTabs } from "@/constants/tabs";

async function Page({ params }: { params: { id: string } }) {
    const session: Session | null = await getServerSession(authOptions);

    const user = session?.user

    if (!user) {
        return null; // to avoid typescript warnings
    }

    const userInfo = await fetchUserById(params.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    return (
        <section className="flex flex-col flex-grow">

            <ProfileHeader
                accountId={userInfo.id}
                authUserId={user._id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div className='mt-9 flex flex-col flex-grow'>
                <Tabs defaultValue='threads' className='w-full flex flex-col flex-grow'>
                    <TabsList className='tab'>
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} id={tab.value} value={tab.value} className='tab'>
                                <p>{tab.label}</p>
                            </TabsTrigger>
                        ))}
                        <span className="glider"></span>
                    </TabsList>
                    {profileTabs.map((tab) => (
                        <TabsContent
                            key={`content-${tab.label}`}
                            value={tab.value}
                            className='w-full text-light-1 h-full'
                        >
                            {tab.content &&
                                <tab.content
                                    currentUserId={params.id}
                                    accountId={userInfo._id}
                                    accountType='User'
                                />
                            }

                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}
export default Page;