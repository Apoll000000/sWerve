import {
    Blocks,
    SquareMousePointer,
    ZapIcon,
    SmilePlus

} from "lucide-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner"; // Using Sonner

function Happen() {

    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) console.error(error);
            setSession(data.session);
        };

        getSession();
    }, []);

    const handleJoinClick = () => {
        if (session) {
            toast.success("You are already a sWerver. Great choice!");
        } else {
            navigate("/Login");
        }
    };


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
                <Button
                    onClick={handleJoinClick}
                    className="font-[700] mt-5 hover:bg-[#1FCAA2] cursor-pointer"
                >
                    Join sWerve
                </Button>
            </div>
        </section>
    )
}

export default Happen