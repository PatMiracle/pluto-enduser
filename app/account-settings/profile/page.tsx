"use client";

import useAuthStore from "@/store/AuthStore";
import PersonalProfile from "./personal";
import GovernmentProfile from "./government";

const Profile = () => {
  const { user } = useAuthStore();

  if (user?.accountType == "personal") {
    return <PersonalProfile />;
  } else if (user?.accountType == "government") {
    return <GovernmentProfile />;
  }

  return <div className="max-w-4xl px-5"></div>;
};

export default Profile;
