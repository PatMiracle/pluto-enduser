import React from "react";
import logo from "@/public/images/logo.svg";
import hiGIF from "@/public/images/hi.gif";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  title: string; // e.g. "Create A New Account"
  children: React.ReactNode;
  sideTitle: string; // e.g. "I already have an Account?"
  sideSubtitle: string; // e.g. "To continue your experience, please login..."
  sideButtonLabel: string; // e.g. "Login Now"
  sideButtonHref: string; // e.g. "/login"
  reverse?: boolean; // When true, flips green panel to the left
}

const AuthLayout = ({
  title,
  children,
  sideTitle,
  sideSubtitle,
  sideButtonLabel,
  sideButtonHref,
  reverse = false,
}: Props) => {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full",
        reverse ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Green Side */}
      <div className="bg-green-normal hidden flex-1 items-center justify-center px-10 text-white lg:flex">
        <div className="flex max-w-xl flex-col items-center text-center">
          <Image src={hiGIF} alt="" width={275} height={189} />
          <h2 className="mb-4 text-4xl font-bold md:mt-2">{sideTitle}</h2>
          <p className="mb-8">{sideSubtitle}</p>
          <Button variant={"white"} asChild>
            <a href={sideButtonHref}>{sideButtonLabel}</a>
          </Button>
        </div>
      </div>

      {/* White Content Side */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center">
            <Image src={logo} alt="Pluto Logo" />
          </div>
          <h1 className="mb-6 text-center text-2xl">{title}</h1>
          {/* Form content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
