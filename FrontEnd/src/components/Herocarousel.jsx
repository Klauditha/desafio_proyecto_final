import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "../ui/card"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'


const getRandomImageUrl = () => {
  const randomImageWidth = Math.floor(Math.random() * 800) + 400;
  const randomImageHeight = Math.floor(Math.random() * 800) + 400;
  return `https://source.unsplash.com/random?book&${randomImageWidth}x${randomImageHeight}`;
};

export default function Herocarousel() {
  return(
  <Carousel       plugins={[
    Autoplay({
      delay: 4000,
    }),
  ]} className="w-full">
  <CarouselContent>
    {Array.from({ length: 5 }).map((_, index) => (
      <CarouselItem key={index}>
        <div className="p-1">
          <Card>
            <CardContent className="flex aspect-video items-center justify-center p-6">
            <img
                    src={getRandomImageUrl()}
                    alt={`Random Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
  )

}