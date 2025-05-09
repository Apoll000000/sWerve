import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Star, History } from "lucide-react";
import { Button } from "@/components/ui/button"


import { Badge } from "@/components/ui/badge"

import { Separator } from "@/components/ui/separator"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const ServicePage = () => {

    const { id } = useParams(); // this is service_id from the URL
    const [service, setService] = useState(null);

    useEffect(() => {
        async function fetchService() {
            const { data, error } = await supabase
                .from('services')
                .select(`
                *,
                profiles (
                    full_name,
                    avatar_url
                )
            `)
                .eq('service_id', id)
                .single();

            if (error) {
                console.error(error);
                return;
            }

            setService(data);
        }

        fetchService();
    }, [id]);

    if (!service) return <p>Loading...</p>;

    return (
        <>

            <section className="pt-20 p-5 xl:pl-50 xl:pr-50">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/services">Explore</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink>{service.category}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <section className="happen p-5 xl:pl-50 xl:pr-50 md:flex gap-5 items-center">
                <div className="w-full md:w-[60%]">
                    <h1 className="max-sm:text-3xl sm:text-3xl lg:text-5xl font-[600] leading-none">{service.service_name}</h1>
                    <div className="mt-5 flex gap-3 items-center">
                        <img
                            src={service.profiles?.avatar_url}
                            alt={service.profiles?.full_name}
                            className="w-10 h-10 object-cover rounded"
                        />
                        <div>
                            <p className="font-[700]">{service.profiles?.full_name}</p>
                            <div className="flex">
                                <Star></Star> 0 (0 Reviews)
                            </div>
                        </div>
                    </div>
                    <img
                        src={service.thumbnail_url}
                        alt={service.service_name}
                        className="w-full h-[60vw] md:h-[30vw] object-cover rounded mt-3"
                    />
                    <h1 className="text-gray-800 font-[700] text-[130%] mt-3">About this service</h1>
                    <p className="">
                        {service.service_description}
                    </p>

                </div>
                <div className="w-full md:w-[40%] mt-5 md:mt-0">
                    <div className="border border-gray-300">
                        <p className="uppercase p-3 text-center">THIS SERVICE IS BY <span className="font-[800]">{service.pricing_type}</span></p>
                        <Separator className="my-2" />
                        <div className="p-4 pt-2">
                            <p className="text-[180%] font-[800]">₱{service.rate_price + service.contract_price}</p>
                            <p className="">Delivered in {service.delivered_in} day/s</p>
                            <div className="flex gap-1 mt-2">
                                <History></History>
                                <p className="text-gray-600">Quality Service or Money Back Guaranteed</p>
                            </div>
                        </div>
                        <Separator className="mt-2" />
                        <Button className="w-full rounded-none py-6 hover:cursor-pointer">Avail This Service</Button>

                    </div>
                </div>

            </section>
        </>

    );
};

export default ServicePage