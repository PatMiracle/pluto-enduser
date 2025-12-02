"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserQuery } from "@/services/user-api";
import { useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";

const Profile = () => {
  const { data: user } = useUserQuery();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl px-5">
      <div className="flex justify-between">
        <p className="text-lg">Profile</p>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-green-normal text-2xl"
        >
          {isEditing ? <MdClose className="text-red-normal" /> : <MdEdit />}
        </button>
      </div>

      <div className="flex items-center gap-3 pt-5">
        <Avatar className="relative size-32">
          {user!.photoURL && <AvatarImage src={user?.photoURL} />}
          <AvatarFallback>
            {user?.firstName.slice(0, 1)}
            {user?.lastName.slice(0, 1)}
          </AvatarFallback>
          {isEditing && (
            <button className="text-white-normal absolute flex h-full w-full items-end justify-end bg-black/30 pb-3">
              <IoCameraOutline size={24} className="mx-auto" />
            </button>
          )}
        </Avatar>
      </div>
    </div>
  );
};

export default Profile;
