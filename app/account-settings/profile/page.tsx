"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserQuery } from "@/services/user-api";
import { useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { useTrackedStates } from "@/services/enum-api";

const Profile = () => {
  const { data: user } = useUserQuery();
  const { data: rawStates } = useTrackedStates();
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
        <div className="grid gap-1.5">
          <div>
            <p className="text-white-darker text-sm">Account Access Type</p>
            <p className="bg-green-light mt-1 rounded-sm p-1.5 text-sm capitalize">
              {user?.accountType} Account
            </p>
          </div>
          <div>
            <p className="text-white-darker text-sm">Waste Management Board</p>
            <p className="bg-green-light mt-1 rounded-sm p-1.5 text-sm capitalize">
              {rawStates &&
                rawStates.data.find(
                  (v) => v.stateId == user?.stateWasteManagementBoardId,
                )?.stateName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
