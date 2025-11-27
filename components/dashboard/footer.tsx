import promotion1 from "@/public/images/promotion1.jpg";
import promotion2 from "@/public/images/promotion2.jpg";
import promotion3 from "@/public/images/promotion3.jpeg";
import promotion4 from "@/public/images/promotion4.jpeg";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const promoImages = [promotion1, promotion2, promotion3, promotion4];

export default function Footer() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  // --- Handle current index tracking ---
  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // --- Autoplay every 3 seconds ---
  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  // --- Handle clicking dots to scroll ---
  const goToSlide = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  return (
    <footer className="bg-green-normal text-white-normal w-full rounded-t-3xl py-10 xl:w-[400px] xl:rounded-b-3xl xl:pt-6">
      <div className="mx-auto flex w-11/12 flex-col gap-6 text-center sm:flex-row sm:text-left lg:gap-24 xl:flex-col xl:gap-4 xl:text-center">
        <div>
          <p className="mb-6 text-2xl font-bold xl:mb-4">Promotions</p>

          <div className="mx-auto w-xs xl:w-full">
            <Carousel
              setApi={setApi}
              className="h-full w-full"
              opts={{ loop: true }}
            >
              <CarouselContent>
                {promoImages.map((image, idx) => (
                  <CarouselItem key={idx}>
                    <Image
                      src={image}
                      alt={`Promotion ${idx + 1}`}
                      className="h-44 w-full rounded-lg object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-2 flex w-full justify-center gap-1">
              {promoImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={cn(
                    "h-2 w-2 rounded-full bg-black/50",
                    current == i + 1 && "bg-black",
                  )}
                ></button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-1 xl:gap-7">
          <div className="flex flex-col gap-6 xl:gap-3">
            <p className="text-2xl font-bold">Education</p>
            <div className="flex flex-col gap-3">
              <Link href="#" className="text-lg underline">
                Bill & Rates
              </Link>
              <Link href="#" className="text-lg underline">
                Waste Education
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6 xl:gap-3">
            <p className="text-2xl font-bold">Policies</p>
            <div className="flex flex-col gap-3">
              <Link href="#" className="text-lg underline">
                Pluto’s Terms
              </Link>
              <Link href="#" className="text-lg underline">
                Federal Waste Mgt. Laws
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
