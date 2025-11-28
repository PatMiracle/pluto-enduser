import React from "react";
import {
  MdAppSettingsAlt,
  MdInfo,
  MdKeyboardArrowRight,
  MdLocalShipping,
  MdTakeoutDining,
} from "react-icons/md";
import { GiBiohazard } from "react-icons/gi";

export default function QueryTickets() {
  return (
    <div className="grid gap-4">
      <QueryButton
        icon={<MdAppSettingsAlt />}
        title="Having a problem with the app"
      />
      <QueryButton icon={<MdLocalShipping />} title="Report a missed Pickup" />
      <QueryButton
        icon={<MdTakeoutDining />}
        title="Report a Stolen/Broken Container"
      />
      <QueryButton
        icon={<GiBiohazard />}
        title="Report an Environmental Health Hazard"
      />
      <QueryButton icon={<MdInfo />} title="Other Problems" />
    </div>
  );
}

type QueryButtonProps = {
  icon: React.ReactNode;
  title: string;
};

const QueryButton = ({ icon, title }: QueryButtonProps) => {
  return (
    <div className="border-white-dark flex h-12 max-w-xl cursor-pointer flex-row items-center gap-3 rounded-xl border px-3">
      <span className="text-primary text-xl">{icon}</span>
      <p className="max-w-[70%] text-sm">{title}</p>
      <div className="text-green-normal border-green-light-active ml-auto grid h-7 w-7 place-content-center rounded-full border">
        <MdKeyboardArrowRight size={18} />
      </div>
    </div>
  );
};
