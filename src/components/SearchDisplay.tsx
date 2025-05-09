import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"


import { Badge } from "@/components/ui/badge"


import { supabase } from "@/lib/supabase";

type Service = {
    service_id: string;
    service_name: string;
    service_description: string;
    pricing_type: string;
    thumbnail_url: string;
    rate_price: number;
    contract_price: number;
    delivered_in: number;
    category: string;
    revenue: number;
    profiles: {
        full_name: string;
    };
};

const SearchDisplay = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Customize as needed

    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get("term") || "";

    const [results, setResults] = useState<Service[]>([]);

    const paginatedServices = results.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(results.length / itemsPerPage);

    useEffect(() => {
        if (!term) return;

        const fetchServices = async () => {
            const { data, error } = await supabase
                .from("services")
                .select(`
                    *,
                    profiles (
                        full_name
                    )
                `); // This joins the profiles table on profiles_id

            if (error) {
                console.error(error);
                return;
            }

            // Filter results manually
            const filtered = data?.filter((service) => {
                const lowerTerm = term.toLowerCase();
                return (
                    service.service_name?.toLowerCase().includes(lowerTerm) ||
                    service.service_description?.toLowerCase().includes(lowerTerm) ||
                    service.category?.toLowerCase().includes(lowerTerm) ||
                    service.profiles?.full_name?.toLowerCase().includes(lowerTerm)
                );
            });

            setResults(filtered || []);
        };

        fetchServices();
    }, [term]);

    return (
        <>

            <section className="pt-20 p-5 xl:pl-50 xl:pr-50">
                <Breadcrumb className="w-full">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/home">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="">Results for "{term}"</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>

            <section className="happen p-5 xl:pl-50 xl:pr-50 pb-20 mt-10">
                <h1 className="max-sm:text-3xl sm:text-3xl lg:text-5xl font-[600] leading-none">Results for "{term}"</h1>
                <div className="p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-5">
                    {paginatedServices.map((service) => (
                        <Link to={`/services/${service.service_id}`} key={service.service_id}>
                            <Card className="@container/card hover:cursor-pointer transition-transform duration-300 hover:scale-105" key={service.service_id}>
                                <CardHeader className="relative">
                                    <CardDescription className="mt-8 line-clamp-1 w-full">
                                        By {service.profiles?.full_name || "Unknown"}
                                    </CardDescription>
                                    <div className="absolute left-4 top-0 w-[85%] overflow-hidden">
                                        <Badge variant="outline" className="flex gap-1 rounded-lg text-xs line-clamp-1">
                                            {service.category}
                                        </Badge>
                                    </div>
                                    <img
                                        src={service.thumbnail_url}
                                        alt={service.service_name}
                                        className="w-full h-[20vw] lg:h-[10vw] object-cover rounded"
                                    />
                                </CardHeader>
                                <CardFooter className="flex-col items-start gap-1 text-sm">
                                    <div className="line-clamp-1 flex gap-2 font-medium">
                                        {service.pricing_type}
                                    </div>
                                    <div className="font-[800] text-[115%] w-full line-clamp-1">
                                        {service.service_name}
                                    </div>
                                    <div className="text-muted-foreground w-full line-clamp-1">
                                        {service.service_description}
                                    </div>
                                </CardFooter>
                                <CardHeader>
                                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                        ₱{service.rate_price + service.contract_price}
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>

                    ))}
                </div>
                <Pagination className="absolute bottom-0 bg-white">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={currentPage === i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </>



    );
};

export default SearchDisplay