"use client";

import * as z from "zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/libs/uploadthing";
import { isBase64Image } from "@/libs/utils";

import { UserValidation } from "@/libs/validations/user";
import { updateUser } from "@/actions/user.actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Label } from "../ui/label";
import { MAX_FILE_SIZE } from "@/constants/common";
import { UserCircle2, UserPlus2 } from "lucide-react";
import { SessionContextValue, useSession } from "next-auth/react";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    email: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
  const [image, setImage] = useState<File[] | null>(null);
  const onDrop = (acceptedFiles: File[]) => setImage(acceptedFiles);
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });
  const router = useRouter();
  const pathname = usePathname();
  const { status, data, update } = useSession() as SessionContextValue
  const { startUpload } = useUploadThing("imageUploader")

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user?.name ? user.name : "",
      username: user?.username ? user.username : "",
      bio: user?.bio ? user.bio : "",
      image: user?.image ? user.image : "",
    },
    mode: "onChange",
  });


  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    if (image) {
      const imgRes = await startUpload(image);
      if (imgRes) {
        await update({
          ...user,
          image: imgRes[0].url
        });
        await updateUser({
          name: values.name,
          path: pathname,
          email: user.email,
          username: values.username,
          bio: values.bio,
          image: imgRes[0].url
        });

        setImage(null);
      }
    } else {
      await update({
        ...user,
        user: {
          ...user,
          image: null
        },
      });


      await updateUser({
        name: values.name,
        path: pathname,
        email: user.email,
        username: values.username,
        bio: values.bio,
        image: values.image ?? ''
      });

    }

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleRemove = () => {
    setImage(null)
    setValue("image", "")
  };

  return (
    <form
      className='flex flex-col justify-start gap-10'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex text-primary gap-2 w-full">
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-15">
                Name
              </Label>

              <Input
                type='text'
                className='account-form_input no-focus '
                {...field}
              />
            </div>
          )}
        />


        <Controller
          control={control}
          name="image"
          render={({ field: { onChange, value } }) => (

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  {...getRootProps()}
                  className={`relative grid overflow-hidden account-form_image-label cursor-pointer place-items-center rounded-lg flex-none p-2 text-center focus:outline-none self-end ${(image === null && isDragActive) || !value
                    ? "hover:bg-custom-background-90"
                    : ""
                    }`}
                >
                  {image !== null || (value && value !== "") ? (
                    <>

                      <Image
                        fill
                        objectFit="cover"
                        src={image ? URL.createObjectURL(image[0]) : value ? value : ""}
                        alt="image"
                        className="absolute left-0 top-0 h-full w-full rounded-md object-cover"
                      />
                    </>
                  ) : (
                    <UserPlus2 className="mx-auto h-6 w-6 text-custom-text-200" />
                  )}
                  <input {...getInputProps()} type="text" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <div
                      {...getRootProps()}
                    >
                      Carregar foto
                      <input {...getInputProps()} type="text" />
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Importar do Instagram
                  </DropdownMenuItem>
                  {(image !== null || (value && value !== "")) &&
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleRemove} className="text-red-600">
                        Remover Imagem
                      </DropdownMenuItem>
                    </>
                  }
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        />
      </div>

      <Controller
        control={control}
        name='username'
        render={({ field }) => (
          <div className="flex flex-col gap-2 text-primary w-full">
            <Label className="text-15">
              Username
            </Label>

            <Input
              type='text'
              className='account-form_input no-focus'
              {...field}
            />
          </div>
        )}
      />

      <Controller
        control={control}
        name='bio'
        render={({ field }) => (
          <div className="flex flex-col gap-2 text-primary w-full">
            <Label className="text-15">
              Bio
            </Label>

            <Textarea
              rows={5}
              className='account-form_input no-focus'
              {...field}
            />
          </div>
        )}
      />

      <Button type="submit" className='bg-primary h-[52px] text-black'>
        {btnTitle}
      </Button>
    </form >
  );
};

export default AccountProfile;