"use client";

import useAuthStore from "@/store/AuthStore";
import PersonalProfile from "./personal";
import GovernmentProfile from "./government";
import BusinessProfile from "./business";

const Profile = () => {
  const { user } = useAuthStore();

  if (user?.accountType == "personal") {
    return <PersonalProfile />;
  } else if (user?.accountType == "government") {
    return <GovernmentProfile />;
  } else return <BusinessProfile />;
};

export default Profile;
