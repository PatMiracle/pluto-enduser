import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const faqs = [
  {
    faqId: 6,
    faqTitle: "What types of notifications will I receive from the platform?",
    faqAnswer:
      "Users receive role-specific notifications. Clients get alerts for scheduled pickups, delays, or missed service. Area and Zonal Managers receive escalation alerts, service disruptions, and compliance violations. Drivers receive routing updates and task assignments. Notifications can be customized via the settings panel and are delivered via email, SMS, and in-app alerts.",
  },
  {
    faqId: 2,
    faqTitle: "How can I report missed waste pickups?",
    faqAnswer:
      "Clients can report missed pickups through the platform’s web or mobile portal by selecting the 'Report Issue' feature under their assigned property or location. The complaint is immediately routed to the appropriate zonal or area manager and triggers a service-level check on the responsible service provider. You’ll receive updates as your report is being handled.",
  },
  {
    faqId: 1,
    faqTitle: "What is the Waste Management Platform and how does it work?",
    faqAnswer:
      "Our Waste Management Platform is a centralized digital system designed to coordinate and monitor waste collection, transport, and disposal activities across multiple zones. It provides real-time tracking of vehicles, automated route assignments, service provider performance monitoring, issue reporting, and centralized data reporting. The platform helps streamline operations and ensures regulatory compliance while improving overall environmental health outcomes.",
  },
];

export default function FAQs() {
  return (
    <div className="min-h-screen space-y-6 px-5 pb-7">
      <h1 className="text-lg font-semibold">Frequently Asked Questions</h1>

      {/* FAQ CONTAINER */}
      <div className="border-white-dark max-w-2xl divide-y rounded-xl border">
        {faqs.map(({ faqId, faqTitle, faqAnswer }) => (
          <details key={faqId} className="group px-6 py-0">
            {/* SUMMARY */}
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3">
              <span className="max-w-[80%] text-sm md:text-base">
                {faqTitle}
              </span>

              <span className="border-green-light-active flex size-8 items-center justify-center rounded-full border transition">
                {/* Down */}
                <MdKeyboardArrowDown className="text-green-normal text-lg group-open:hidden" />

                {/* Up */}
                <MdKeyboardArrowUp className="text-green-normal hidden text-lg group-open:block" />
              </span>
            </summary>

            {/* CONTENT */}
            <div className="text-white-darker space-y-2 pb-5 text-sm">
              {faqAnswer.split(". ").map((text, i, arr) => (
                <div key={i} className="flex gap-2">
                  <span className="bg-white-darker mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                  <p>
                    {text}
                    {i !== arr.length - 1 ? "." : ""}
                  </p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
