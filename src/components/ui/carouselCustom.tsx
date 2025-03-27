import * as React from "react"
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button"

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Update current index when scrolling
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  // Autoplay Effect
  React.useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => emblaApi.scrollNext(), 15000);
    return () => clearInterval(autoplay); // Cleanup on unmount
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index);

  return (
    <section className="relative sm:w-[100%] xl:w-[80%] max-sm:h-[54vw] sm:h-[40vw] xl:h-[25vw] overflow-hidden m-auto">
      {/* Embla Carousel Wrapper */}
      <div className="overflow-hidden lg:rounded-2xl hover:cursor-pointer" ref={emblaRef}>
        <div className="flex w-[100%] max-sm:h-[54vw] sm:h-[40vw] xl:h-[25vw]">
          {/* Slide 1 */}
          <div className="embla__slide slide1 min-w-full flex flex-col items-center justify-center text-white p-[3vw]">
            <h1 className="max-sm:text-2xl max-sm:leading-[1.4rem] sm:text-4xl lg:text-[4.3vw] font-bold w-[80%] sm:leading-none lg:leading-none text-center">AVAILING SERVICES HAS NEVER BEEN THIS EASY</h1>
            <p className="max-sm:text-[10px] w-[70%] lg:text-[1.3vw] leading-none pt-2 text-center">Whether you need a handyman, a plumber, a mechanic, or a professional expert, sWerve connects you with reliable service providers in just a few taps—quick, hassle-free, and right when you need them!</p>
            <Button className="car-but  ml-auto mr-auto hover:cursor-pointer max-sm:text-[70%] max-sm:mt-2 sm:mt-3 lg:mt-3 lg:text-[110%] xl:text-[120%] max-sm:z-3 max-sm:pt-[2px] max-sm:pb-[2px] lg:p-[15px] xl:p-[20px]">HIRE NOW</Button>
          </div>
          {/* Slide 2 */}
          <div className="embla__slide slide2 min-w-full flex items-center justify-center bg-green-500 text-white font-bold">
            Slide 2: Explore Our Features
          </div>
          {/* Slide 3 */}
          <div className="embla__slide slide3 min-w-full flex items-center justify-center bg-red-500 text-white font-bold">
            Slide 3: Join Us Today!
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {/* <button
        onClick={scrollPrev}
        className="w-10 h-10 flex items-center justify-center absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75"
      >
        ❮
      </button>
      <button
        onClick={scrollNext}
        className="w-10 h-10 flex items-center justify-center absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-75"
      >
        ❯
      </button> */}

      {/* Dots / Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          onClick={() => scrollTo(0)}
          className={`w-2 h-2 rounded-full ${currentIndex === 0 ? "bg-blue-100" : "bg-gray-500"}`}
        ></button>
        <button
          onClick={() => scrollTo(1)}
          className={`w-2 h-2 rounded-full ${currentIndex === 1 ? "bg-blue-100" : "bg-gray-500"}`}
        ></button>
        <button
          onClick={() => scrollTo(2)}
          className={`w-2 h-2 rounded-full ${currentIndex === 2 ? "bg-blue-100" : "bg-gray-500"}`}
        ></button>
      </div>
    </section>
  );
}

export default Carousel