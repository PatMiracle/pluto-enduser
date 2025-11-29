"use client";
import { Button } from "@/components/ui/button";
import consultingImg from "@/public/images/consulting.svg";
import wasteEducationImg from "@/public/images/waste-education.svg";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  return (
    <div className="px-5">
      <p className="text-lg">Services</p>
      <div className="grid w-full max-w-2xl gap-4 py-5 md:grid-cols-2">
        <div className="border-white-dark grid gap-2 rounded-2xl border p-5">
          <Image src={consultingImg} alt="" className="w-full" />
          <div>
            <p>Consulting</p>
            <p className="text-white-darker text-sm">
              Need expert advice? Submit a consultation request by filling in
              your details, and our team will get back to you with personalized
              waste management solutions
            </p>
          </div>
          <Button asChild>
            <Link href="/services/consult">Consult With Us</Link>
          </Button>
        </div>
        <div className="border-white-dark grid gap-2 rounded-2xl border p-4">
          <Image src={wasteEducationImg} alt="" className="w-full" />
          <div>
            <p className="">Waste Education</p>
            <p className="text-white-darker text-sm">
              Learn how to manage waste effectively with our educational
              resources. Empower yourself to make eco-friendly choices and
              contribute to a sustainable future
            </p>
          </div>
          <Button>Learn More</Button>
        </div>
      </div>
    </div>
  );
}
