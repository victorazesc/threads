import Link from "next/link";
import Image from "next/image";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Instagram } from "lucide-react";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className='flex w-full flex-col justify-start py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='flex-1'>
              <h2 className='text-left text-heading3-bold text-light-1'>
                {name}
              </h2>
              <p className='text-15'>{username}</p>
            </div>
          </div>
          <div className='relative h-20 w-20 object-cover'>
            <Avatar
              name={name.length > 0 ? name : "Threads"}
              src={imgUrl}
              size={80}
              showTooltip={true}
              shape="circle"
              fallbackBackgroundColor="bg-custom-backgrounds-secondary"
              className="capitalize"
            />
          </div>
        </div>
        <div style={{ whiteSpace: 'pre-wrap' }} className="mt-4">
          {bio}
        </div>

        <div className="flex justify-between mt-3">
          <div className="text-15 text-secondary">51 Seguidores</div>
          <div><Instagram /></div>
        </div>
      </div>
      {accountId === authUserId && type !== "Community" && (
        // <Button className="h-9" variant={"outline"}>Editar Perfil</Button>
        <Link className="border-primary-outline border h-9 flex items-center w-full justify-center rounded-xl" href='/profile/edit'>
          Editar Perfil
        </Link>
      )}
      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>

  );
}

export default ProfileHeader;