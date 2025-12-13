"use client";

import useAuthStore from "@/store/AuthStore";
import Board from "./board";
import StepProgressBar from "./step-progress";
import AuthLayer from "../(main)/AuthLayer";

export default function Onboarding() {
  const { user } = useAuthStore();

  if (user && !user.needsAccountSetup) {
    window.location.replace("/dashboard");
  }

  return (
    <AuthLayer>
      <StepProgressBar activeIndex={0} />
      <Board />
    </AuthLayer>
  );
}
