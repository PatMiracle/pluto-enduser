"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalProvider";
import { useProduct } from "@/services/products";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoAdd } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";

const Checkout = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product } = useProduct(id);
  const { getModalProps, openModal } = useModal();

  return (
    <>
      <Link href="/rewards" className="mt-5 flex items-center gap-1">
        <MdKeyboardArrowLeft className="text-primary" size={24} /> Back
      </Link>

      <div className="grid gap-5 py-5">
        {/* delivery details */}
        <div className="border-white-dark max-w-2xl rounded-xl border p-5 lg:max-w-3xl">
          <h2 className="mb-2 text-[#1F2937]">Delivery Details</h2>
          <p className="mb-2 text-sm text-[#1F2937]">
            Find the closest Pickup Station
          </p>
          <div className="mb-2 rounded-lg border border-[#D1D5DB] px-3 py-2">
            <p className="text-sm text-[#9CA3AF] italic">
              LGA Office Complex in charge of the location selected will be
              displayed here
            </p>
          </div>
          <Button onClick={() => openModal(id)} className="font-normal">
            <IoAdd size={20} />
            Pickup Location
          </Button>
          <div className="mt-4">
            <p className="mb-2 text-sm text-[#1F2937]">Delivery Date</p>
            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-100 px-3 py-2">
              <p className="text-sm text-amber-900">
                NOTICE: Delivered between Tuesday 10-10-2024 and Thursday
                10-10-2024.
              </p>
            </div>
          </div>
        </div>

        {/* payment methods */}
        <div className="border-white-dark max-w-2xl rounded-xl border p-5 lg:max-w-3xl">
          <h2 className="mb-2 text-[#1F2937]">Payment Method</h2>
          <p className="mb-3 text-sm text-[#6B7280]">Select Payment Method</p>
          <button className="bg-green-light border-primary flex w-full items-start rounded-lg border-2 p-4">
            <div className="border-primary mt-0.5 mr-3 w-max rounded-full border-2 p-0.5">
              <div className="bg-primary size-2.5 rounded-full"></div>
            </div>
            <div className="flex-1 text-left">
              <p className="mb-1 text-sm text-[#1F2937]">Customer Rewards</p>
              <p className="text-sm leading-5 text-[#6B7280]">
                You will be charged from your existing Reward points connected
                to this account
              </p>
            </div>
          </button>
        </div>

        {/* order summary */}
        <div className="border-white-dark max-w-2xl rounded-xl border p-5 lg:max-w-3xl">
          <h2 className="mb-2 text-[#1F2937]">Order Summary</h2>
          <div className="flex items-center gap-4 p-4">
            <img
              src={product?.productImageURL}
              alt={product?.productName}
              width={500}
              height={500}
              className="h-20 w-20 object-cover"
            />
            <div className="flex-1">
              <p className="mb-1 text-[#1F2937]">{product?.productName}</p>
              <p className="text-sm text-[#6B7280]">QTY: 2 Dozen</p>
            </div>
            <div className="text-right">
              <p className="mb-0.5 text-xs text-[#6B7280]">Total Cost</p>
              <p className="text-primary text-lg font-bold">
                {product?.perUnitDiscountedPoints || product?.perUnitPoints} pts
              </p>
            </div>
          </div>
          <Button className="w-full">Place Order Now</Button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
