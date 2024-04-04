import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function HeroCarousel() {
  const mobileImages = ["hero-mobile1", "hero-mobile2", "hero-mobile3"];
  const desktopImages = ["hero-desktop1", "hero-desktop2", "hero-desktop3"];

  return (
    <div className="w-full px-2">
      <Carousel
        className="md:w-100"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="w-full">
          {mobileImages.map((mobileImage, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <div className="block md:hidden">
                      <img
                        id="landingImageMobile"
                        src={`${process.env.URL_SITE}/img/${mobileImage}.webp`}
                        alt="landing mobile"
                        className="w-full h-full object-cover p-0 m-0"
                      />
                    </div>
                    <div className="hidden md:block">
                      <img
                        id="landingImageDesktop"
                        src={`${process.env.URL_SITE}/img/${desktopImages[index]}.webp`}
                        alt="landing desktop"
                        className="w-full h-full object-cover p-0 m-0"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
