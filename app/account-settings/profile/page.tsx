"use client";

import { MdEdit } from "react-icons/md";

const Profile = () => {
  return (
    <div className="max-w-4xl px-5">
      <div className="flex justify-between">
        <p className="text-lg">Profile</p>
        <button className="text-green-normal text-2xl">
          <MdEdit />
        </button>
      </div>
    </div>
  );
};

export default Profile;
