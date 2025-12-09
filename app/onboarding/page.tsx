"use client";

import Board from "./board";
import StepProgressBar from "./step-progress";

export default function Onboarding() {
  return (
    <div>
      <StepProgressBar activeIndex={0} />
      <Board />
    </div>
  );
}
