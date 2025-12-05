import React from "react";
import {
  MdAppSettingsAlt,
  MdInfo,
  MdKeyboardArrowRight,
  MdLocalShipping,
  MdTakeoutDining,
} from "react-icons/md";
import { GiBiohazard } from "react-icons/gi";
import AppProblemForm from "./app-problem-form";
import { Modal } from "@/components/modal";
import { useModal } from "@/context/ModalProvider";
import ReportMissedPickup from "./report-missed-pickup";
import ReportStolen from "./report-stolen";
import ReportHazard from "./report-hazard";
import OtherProblems from "./other-problems";

export default function QueryTickets() {
  return (
    <div className="grid gap-4">
      <QueryButton
        icon={<MdAppSettingsAlt />}
        title="Having a problem with the app"
      >
        <AppProblemForm />
      </QueryButton>
      <QueryButton icon={<MdLocalShipping />} title="Report a missed Pickup">
        <ReportMissedPickup />
      </QueryButton>
      <QueryButton
        icon={<MdTakeoutDining />}
        title="Report a Stolen/Broken Container"
      >
        <ReportStolen />
      </QueryButton>
      <QueryButton
        icon={<GiBiohazard />}
        title="Report an Environmental Health Hazard"
      >
        <ReportHazard />
      </QueryButton>
      <QueryButton icon={<MdInfo />} title="Other Problems">
        <OtherProblems />
      </QueryButton>
    </div>
  );
}

type QueryButtonProps = {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
};

const QueryButton = ({ icon, title, children }: QueryButtonProps) => {
  const { getModalProps, openModal } = useModal();
  const modalId = title.toLocaleLowerCase().split(" ").join("-");

  return (
    <>
      <div
        onClick={() => openModal(modalId)}
        className="border-white-dark flex h-12 max-w-xl cursor-pointer flex-row items-center gap-3 rounded-xl border px-3"
      >
        <span className="text-primary text-xl">{icon}</span>
        <p className="max-w-[70%] text-sm">{title}</p>
        <div className="text-green-normal border-green-light-active ml-auto grid h-7 w-7 place-content-center rounded-full border">
          <MdKeyboardArrowRight size={18} />
        </div>
      </div>
      <Modal
        title={title}
        description={
          "Kindly complete this form with the required information describing your problem. We will look into it an assist you immediately"
        }
        {...getModalProps(modalId)}
      >
        <>{children}</>
      </Modal>
    </>
  );
};
