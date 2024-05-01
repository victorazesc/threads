"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router = useRouter();

  const isCommunity = personType === "Community";

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>

        <Avatar
          name={name.length > 0 ? name : "Threads"}
          src={imgUrl}
          size={36}
          showTooltip={false}
          shape="circle"
          fallbackBackgroundColor="bg-custom-backgrounds-secondary"
          className={`capitalize`}
        />


        <div className='flex-1 text-ellipsis'>
          <h4 className='text-15 font-medium text-primary'>{username}</h4>
          <p className='text-15 text-secondary'>{name}</p>
        </div>
      </div>

      <Button
        className='user-card_btn'
        onClick={() => {
          if (isCommunity) {
            router.push(`/communities/${id}`);
          } else {
            router.push(`/profile/${id}`);
          }
        }}
      >
        Visualizar
      </Button>
    </article>
  );
}

export default UserCard;