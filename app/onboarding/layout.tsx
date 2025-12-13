import AccountSetupProvider from "@/context/AccountSetupProvider";
import React from "react";
import AuthLayer from "../(main)/AuthLayer";

type Props = {
  children: React.ReactNode;
};

export default function OnboardingLayout({ children }: Props) {
  return (
    <AccountSetupProvider>
      <AuthLayer>{children}</AuthLayer>
    </AccountSetupProvider>
  );
}
