import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

function Popular() {
    return (
        <>
            <section className="popular max-sm:p-10 max-sm:pt-0 max-sm:pb-0 sm:p-10 sm:pt-0 sm:pb-0 xl:p-50 xl:pt-5 xl:pb-5">
                <h1 className="POP max-sm:text-3xl sm:text-3xl lg:text-5xl font-[600]">Popular Services</h1>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full mt-3"
                >
                    <CarouselContent>
                        {[
                            "/1.png",
                            "/2.png",
                            "/3.png",
                            "/4.png",
                            "/5.png",
                        ].map((src, index) => (
                            <CarouselItem
                                key={index}
                                className="max-sm:basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 hover:cursor-pointer"
                            >
                                <Card className="p-0">
                                    <CardContent className="p-0 bg-[#ff4500] rounded-lg max-sm:h-[250px] sm:h-[250px] md:h-[280px] xl:h-[20vw] overflow-hidden">
                                        <img
                                            src={src}
                                            alt={`Popular service ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>
        </>
    )
}

export default Popular