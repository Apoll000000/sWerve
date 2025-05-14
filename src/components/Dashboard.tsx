import React, { useState, useEffect } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Session } from '@supabase/supabase-js'
import { supabase } from "@/lib/supabase";
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import {
    MapPinHouse,
    UserCheck,
    Languages,
    Trash2,
    Pen

} from "lucide-react"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Textarea } from "@/components/ui/textarea"

import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface ServiceData {
    service_name: string;
    service_description: string;
    rate_price: number;
    contract_price: number;
    delivered_in: string;
}

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
};

interface UserData {
    avatar_url: string;
    full_name: string;
    username: string;
    address_primary: string;
    language_primary: string;
}

interface ProfileProps {
    session: Session | null;
}



const Dashboard: React.FC<ProfileProps> = ({ session }) => {

    const [pricingType, setPricingType] = useState("contract");
    const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
    const [data, setData] = useState<UserData | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [joinedDate, setJoinedDate] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("General");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [servicedata, setserviceData] = useState<ServiceData>({
        service_name: '',
        service_description: '',
        rate_price: 0,
        contract_price: 0,
        delivered_in: '',
    });

    function generateServiceID() {
        const prefix = "SWERVE";
        const randomNumbers = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
        return `${prefix}${randomNumbers}`;
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session) {
            toast.error("User is not authenticated.");
            return;
        }

        const { service_name, service_description } = servicedata;
        const deliveredInValue = pricingType === "rate" ? 1 : servicedata.delivered_in;
        const rateValue = pricingType === "contract" ? 0 : servicedata.rate_price;
        const contractValue = pricingType === "rate" ? 0 : servicedata.contract_price;

        // Upload image if one is selected
        if (selectedFile) {
            const userId = session.user.id;
            const fileExt = selectedFile.name.split('.').pop();
            const filePath = `thumbnail/${userId}-${Date.now()}.${fileExt}`;

            // Upload file to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('services')
                .upload(filePath, selectedFile, {
                    upsert: true,
                });

            if (uploadError) {
                console.error('Error uploading file:', uploadError.message);
                toast.error("Failed to upload thumbnail. Please try again.");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                return;
            }

            // Get public URL
            const { data: urlData } = supabase
                .storage
                .from('services')
                .getPublicUrl(filePath);

            if (!urlData || !urlData.publicUrl) {
                console.error('Error getting public URL');
                toast.error("Failed to get thumbnail URL. Please try again.");
                setTimeout(() => window.location.reload(), 1500);
                return;
            }

            const thumbnail_url = urlData.publicUrl;

            if (thumbnail_url) {
                const { error } = await supabase
                    .from('services')
                    .insert([
                        {
                            creator_id: session.user.id,
                            service_id: generateServiceID(),
                            service_name,
                            service_description,
                            category: selectedCategory,
                            rate_price: rateValue,
                            contract_price: contractValue,
                            delivered_in: deliveredInValue, // ✅ set conditionally
                            thumbnail_url,
                            pricing_type: pricingType, // optional but recommended
                        }
                    ]);

                if (!error) {
                    toast.success("Service created successfully!");
                    getProfile();
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    console.error('Insert error:', error.message);
                    toast.error("Failed to create service. Please try again.");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
            } else {
                toast.error("Your service must have a thumbnail");
            }
        }
    };





    // Format date as "Month Year"
    function formatDate(timestamp: string) {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
    }


    async function getProfile() {

        if (session) {
            // Extract the user ID from the session metadata
            const userId = session.user.id;

            // Query the `profiles` table to get the profile based on the user ID
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId) // Assuming user_id is the foreign key in the `profiles` table
                .single(); // Assuming there is only one profile per user

            if (error) {
                console.error("Error fetching profile:", error);
                return;
            }

            console.log("Profile data:", data);
            setData(data); // This is the user's profile
            if (data?.created_at) {
                setJoinedDate(formatDate(data.created_at));
            }
        } else {
            console.log('User is not logged in.');
            return null;
        }
    }

    // Call the function to fetch the profile
    useEffect(() => {
        getProfile();
    }, [session]);

    async function getServices() {
        if (session) {
            const userId = session.user.id;

            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('creator_id', userId); // No .single()

            if (error) {
                console.error("Error fetching services:", error);
                return;
            }

            console.log("Active Services:", data);
            setServices(data); // Note: changed from `setService` to plural
        } else {
            console.log('User is not logged in.');
            return null;
        }
    }


    // Call the function to fetch the profile
    useEffect(() => {
        getServices();
    }, [session]);

    const handleDelete = async (serviceId: string) => {
        const { error } = await supabase
            .from("services")
            .delete()
            .eq("service_id", serviceId);

        if (error) {
            console.error("Error deleting service:", error);
        } else {
            setServices((prev) => prev.filter((s) => s.service_id !== serviceId));
            toast.success("Service deleted successfully!");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }

        setServiceToDelete(null);
    };



    return (
        <section className="pt-25 p-5 xl:pl-20 xl:pr-20">
            <h1 className="max-sm:text-3xl sm:text-3xl lg:text-5xl font-[800] text-gray-500 leading-none text-center">sWerver Dashboard</h1>
            <div className="md:flex w-full md:gap-5">
                <div className="max-sm:w-[100%] md:w-[30%] shadow-lg p-5 rounded-xl mt-5">
                    <Avatar className="avatar w-[8vw] h-[8vw] m-auto mb-3 mt-3">
                        <AvatarImage src={data?.avatar_url} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className="text-center"><b>{data?.full_name}</b></h1>
                    <h1 className="text-center text-gray-500">@{data?.username}</h1>
                    <Separator className="mt-3 mb-3" />
                    <div className="flex gap-3 items-center">
                        <MapPinHouse />
                        <h1 className="text-center text-gray-600">Located at {data?.address_primary}</h1>
                    </div>
                    <div className="flex gap-3 items-center mt-3">
                        <UserCheck />
                        <h1 className="text-center text-gray-600">Joined in {joinedDate} </h1>
                    </div>
                    <Separator className="mt-3 mb-3" />
                    <div className="flex gap-3 items-center">
                        <Languages />
                        <h1 className="text-center text-gray-600">{data?.language_primary} (Fluent)</h1>
                    </div>

                    <Button className="w-[100%] mt-5">Completed Orders</Button>
                    <Button className="w-[100%] mt-3 bg-yellow-500 hover:bg-gray-400 text-black">See Active Orders</Button>
                </div>
                <div className="max-sm:w-[100%] md:w-[70%] shadow-xl rounded-xl p-8 pt-12">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-gray-600"><b>{data?.full_name}'s Services Catalogue</b></h1>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>
                                    Create New
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Service Details</DialogTitle>
                                    <DialogDescription>
                                        Add your service details here.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSave}>
                                    <div className="grid gap-4 py-4">
                                        <Label htmlFor="thumbnail">Service Thumbnail</Label>
                                        <Input
                                            id="thumbnail"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setSelectedFile(file);
                                                    setPreviewUrl(URL.createObjectURL(file));
                                                }
                                            }}
                                        />
                                        {previewUrl && (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-50 h-35 rounded-s object-cover border"
                                            />
                                        )}

                                        {/* Full Name */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="">Service Name</Label>
                                            <Input
                                                id="service_name"
                                                value={servicedata.service_name}
                                                onChange={(e) => setserviceData({ ...servicedata, service_name: e.target.value })}
                                                className="col-span-3"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 items-start gap-4">
                                            <Label htmlFor="service_description" className="mt-2">Service Description</Label>
                                            <Textarea
                                                id="service_description"
                                                value={servicedata.service_description}
                                                onChange={(e) => setserviceData({ ...servicedata, service_description: e.target.value })}
                                                className="col-span-3"
                                                placeholder="Describe what your service includes..."
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="pricing_type">Pricing Type</Label>
                                            <Select value={pricingType} onValueChange={setPricingType} required>
                                                <SelectTrigger className="w-full col-span-3">
                                                    <SelectValue placeholder="Select pricing type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="contract">Contract</SelectItem>
                                                    <SelectItem value="rate">Rate per day</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Username */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="contract_price" className="">Contract Price</Label>
                                            <Input
                                                id="contract_price"
                                                type="number"
                                                value={pricingType === "rate" ? 0 : servicedata.contract_price}
                                                onChange={(e) => setserviceData({
                                                    ...servicedata,
                                                    contract_price: pricingType !== "contract" ? servicedata.contract_price : parseFloat(e.target.value)
                                                })}
                                                className="col-span-3"
                                                required={pricingType === "contract"}
                                                disabled={pricingType !== "contract"}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="rate_price" className="text-right">Rate per day</Label>
                                            <Input
                                                id="rate_price"
                                                type="number"
                                                value={pricingType === "contract" ? 0 : servicedata.rate_price}
                                                onChange={(e) => setserviceData({
                                                    ...servicedata,
                                                    rate_price: pricingType !== "rate" ? servicedata.rate_price : parseFloat(e.target.value)
                                                })}
                                                className="col-span-3"
                                                required={pricingType === "rate"}
                                                disabled={pricingType !== "rate"}
                                            />
                                        </div>

                                        {/* Primary Language */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="category">Category</Label>
                                            <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                                                <SelectTrigger className="w-full col-span-3">
                                                    <SelectValue placeholder="Select a language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Professional Consultation">Professional Consultation</SelectItem>
                                                    <SelectItem value="Handyworks">Handyworks</SelectItem>
                                                    <SelectItem value="Automotives & Mechanical">Automotives & Mechanical</SelectItem>
                                                    <SelectItem value="Writing & Translation">Writing & Translation</SelectItem>
                                                    <SelectItem value="Programming & Web Dev">Programming & Web Dev</SelectItem>
                                                    <SelectItem value="Computer & Tech Repair">Computer & Tech Repair</SelectItem>
                                                    <SelectItem value="Architectural & Designs">Architectural & Designs</SelectItem>
                                                    <SelectItem value="Engineering & Construction">Engineering & Construction</SelectItem>
                                                    <SelectItem value="Photography & Multimedia Services">Photography & Multimedia Services</SelectItem>
                                                    <SelectItem value="Music Production & Others">Music Production & Others</SelectItem>
                                                    <SelectItem value="Business & Marketing">Business & Marketing</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Address */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="delivered_in" className="text-right">Delivered in (no. of days)</Label>
                                            <Input
                                                id="delivered_in"
                                                type="number"
                                                value={pricingType === "rate" ? 1 : servicedata.delivered_in}
                                                onChange={(e) => setserviceData({ ...servicedata, delivered_in: e.target.value })}
                                                className="col-span-3"
                                                required
                                                disabled={pricingType === "rate"}
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="mt-3 w-full p-3">
                        <AlertDialog open={!!serviceToDelete} onOpenChange={(open) => !open && setServiceToDelete(null)}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete this service?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. It will permanently delete the service from your dashboard.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => {
                                        if (serviceToDelete !== null) {
                                            handleDelete(serviceToDelete.service_id);
                                        }
                                    }}>
                                        Yes, delete it
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <Table>
                            <TableCaption>A list of your published services.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                    <TableHead>Thumbnail Preview</TableHead>
                                    <TableHead>Service Name</TableHead>
                                    <TableHead>Service Description</TableHead>
                                    <TableHead className="w-[100px]">Service ID</TableHead>
                                    <TableHead>Service Type</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Total Price</TableHead>
                                    <TableHead>Service Completion</TableHead>
                                    <TableHead className="text-right">Revenue</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {services.map((service) => (
                                    <TableRow key={service.service_id}>
                                        <TableCell>
                                            <button
                                                onClick={() => setServiceToDelete(service)}
                                                className="hover:cursor-pointer text-red-600"
                                            >
                                                <Trash2 />
                                            </button>
                                        </TableCell>
                                        <TableCell><button className="hover:cursor-pointer"><Pen></Pen></button></TableCell>
                                        <TableCell>
                                            <img
                                                src={service.thumbnail_url}
                                                alt={service.service_name}
                                                className="w-50 h-35 object-cover rounded"
                                            />
                                        </TableCell>
                                        <TableCell>{service.service_name}</TableCell>
                                        <TableCell>{service.service_description}</TableCell>
                                        <TableCell className="font-medium">{service.service_id}</TableCell>
                                        <TableCell>{service.pricing_type}</TableCell>
                                        <TableCell>{service.category}</TableCell>
                                        <TableCell>₱ {service.rate_price + service.contract_price}</TableCell>
                                        <TableCell>{service.delivered_in} day/s</TableCell>
                                        <TableCell className="text-right">₱{service.revenue}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>Total</TableCell>
                                    <TableCell className="text-right" colSpan={6}>
                                        ₱
                                        {services
                                            .reduce((acc, cur) => acc + cur.revenue, 0)
                                            .toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
