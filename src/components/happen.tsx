import {
    Blocks,
    SquareMousePointer,
    ZapIcon,
    SmilePlus

} from "lucide-react"
import { Button } from "./ui/button"

function Happen() {
    return (
        <section className="happen p-5 xl:pl-50 xl:pr-50">
            <h1 className="max-sm:text-3xl sm:text-3xl lg:text-5xl font-[600] leading-none">Make it all happen with sWerve</h1>
            <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-5">
                <div className="con pt-2">
                    <Blocks size={40} strokeWidth={1} />
                    <p className="leading-4.5 pt-3 font-[400] text-justify">Access a pool of top talent across various categories</p>
                </div>

                <div className="con pt-2">
                    <SquareMousePointer size={40} strokeWidth={1} />
                    <p className="leading-4.5 pt-3 font-[400] text-justify">Enjoy a simple, easy-to-use hiring and freelancing app experience</p>
                </div>

                <div className="con pt-2">
                    <ZapIcon size={40} strokeWidth={1} />
                    <p className="leading-4.5 pt-3 font-[400] text-justify">Get quality work done and within your desired budget</p>
                </div>

                <div className="con pt-2">
                    <SmilePlus size={40} strokeWidth={1} />
                    <p className="leading-4.5 pt-3 font-[400] text-justify">Only pay when you’re happy with the service, scam proof!</p>
                </div>
            </div>
            <div className="flex justify-center pt-5">
                <Button className="">Join Now</Button>
            </div>
        </section>
    )
}

export default Happen