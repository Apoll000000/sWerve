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
    Languages

} from "lucide-react"

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

const services = [
    {
        thumbnail: "test url",
        service_title: "Freelance Photography",
        service_id: "INV001",
        activeStatus: "Paid",
        totalSales: "200",
        revenue: "Php30,000",
    },
    {
        thumbnail: "test url",
        service_title: "Freelance Photography",
        service_id: "INV001",
        activeStatus: "Paid",
        totalSales: "200",
        revenue: "Php30,000",
    },
]

interface ProfileData {
    full_name: string;
    username: string;
    email: string;
    address_primary: string;
}

import { toast } from "sonner";





const Profile = ({ session }) => {

    const [data, setData] = useState();
    const [joinedDate, setJoinedDate] = useState<string>("");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
    const [uploading, setUploading] = useState(false);

    const [profdata, setprofData] = useState<ProfileData>({
        full_name: '',
        username: '',
        email: '',
        address_primary: ''
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        const { full_name, username, email, address_primary } = profdata;

        // Assuming "profiles" table exists with columns (full_name, username, email, address_primary, primary_language)
        const { data: updatedData, error } = await supabase
            .from('profiles')
            .upsert([
                {
                    id: session.user.id,
                    full_name,
                    username,
                    email,
                    address_primary,
                    language_primary: selectedLanguage, // save the selected language
                }
            ]);

        if (error) {
            toast.error("Failed to update profile. Please try again.");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            return;
        }

        // Optionally, you can alert the user that their profile has been updated successfully
        toast.success("Profile updated successfully!");
        getProfile();
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    };

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);

        const userId = session.user.id;
        const fileExt = file.name.split('.').pop();
        const filePath = `avatars/${userId}-${Date.now()}.${fileExt}`;


        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, {
                upsert: true,
            });

        if (uploadError) {
            console.error("Upload failed:", uploadError.message);
            toast.error("Failed to upload avatar. Please try again.");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            setUploading(false);
            return;
        }

        // Get public URL
        const { data: publicURLData } = supabase
            .storage
            .from('avatars')
            .getPublicUrl(filePath);

        const avatar_url = publicURLData.publicUrl;

        // Update profile with new avatar
        const { error: updateError } = await supabase
            .from('profiles')
            .update({ avatar_url })
            .eq('id', session.user.id);

        if (updateError) {
            console.error("Error updating profile with avatar:", updateError.message);
            toast.error("Failed to upload avatar. Please try again.");
            setTimeout(() => {
                window.location.reload();
            }, 1500);
            setUploading(false);
        } else {
            toast.success("Profile updated successfully!");
            getProfile(); // refresh data
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }

        setUploading(false);
    };


    // Format date as "Month Year"
    function formatDate(timestamp: string) {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long' };
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



    return (
        <>
            <section className="pt-25 p-5 xl:pl-50 xl:pr-50">
                <h1 className="max-sm:text-3xl sm:text-3xl lg:text-5xl font-[800] text-gray-500 leading-none text-center">sWerve Consumer Profile</h1>
                <div className="md:flex w-full md:gap-5">
                    <div className="max-sm:w-[100%] md:w-[40%] shadow-lg p-5 rounded-xl mt-5">
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

                        <Button className="w-[100%] mt-5">Preview Profile</Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    className="w-[100%] mt-3 bg-yellow-500 hover:bg-gray-400 text-black"
                                    onClick={() => {
                                        setprofData({
                                            full_name: data?.full_name || '',
                                            username: data?.username || '',
                                            email: data?.email || '',
                                            address_primary: data?.address_primary || '',
                                        });
                                        setSelectedLanguage(data?.language_primary || 'English');
                                    }}
                                >
                                    Edit Profile
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Edit profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSave}>
                                    <div className="grid gap-4 py-4">
                                        <Avatar className="avatar w-[8vw] h-[8vw] m-auto mb-3 mt-3">
                                            <AvatarImage src={data?.avatar_url || "https://github.com/shadcn.png"} alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <Input
                                            id="avatar-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleUpload}
                                            className="mt-2"
                                        />
                                        {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}

                                        {/* Full Name */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">Name</Label>
                                            <Input
                                                id="name"
                                                value={profdata.full_name}
                                                onChange={(e) => setprofData({ ...profdata, full_name: e.target.value })}
                                                className="col-span-3"
                                                required
                                            />
                                        </div>

                                        {/* Username */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">Username</Label>
                                            <Input
                                                id="username"
                                                value={profdata.username}
                                                onChange={(e) => setprofData({ ...profdata, username: e.target.value })}
                                                className="col-span-3"
                                                required
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="email" className="text-right">Email</Label>
                                            <Input
                                                id="email"
                                                value={profdata.email}
                                                onChange={(e) => setprofData({ ...profdata, email: e.target.value })}
                                                className="col-span-3"
                                                required
                                            />
                                        </div>

                                        {/* Primary Language */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="language">Primary Language</Label>
                                            <Select value={selectedLanguage} onValueChange={setSelectedLanguage} required>
                                                <SelectTrigger className="w-full col-span-3">
                                                    <SelectValue placeholder="Select a language" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="English">English</SelectItem>
                                                    <SelectItem value="Tagalog">Tagalog</SelectItem>
                                                    <SelectItem value="Japanese">Japanese</SelectItem>
                                                    <SelectItem value="Chinese">Chinese</SelectItem>
                                                    <SelectItem value="French">French</SelectItem>
                                                    <SelectItem value="Spanish">Spanish</SelectItem>
                                                    <SelectItem value="Korean">Korean</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Address */}
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="address" className="text-right">Address</Label>
                                            <Input
                                                id="address"
                                                value={profdata.address_primary}
                                                onChange={(e) => setprofData({ ...profdata, address_primary: e.target.value })}
                                                className="col-span-3"
                                                required
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
                    <div className="max-sm:w-[100%] md:w-[60%] shadow-xl rounded-xl p-8 pt-12">
                        <h1 className="text-gray-600"><b>sWervers' review on {data?.full_name}</b></h1>
                        <div className="mt-3">
                            <h1 className="text-gray-400">No Reviews Yet</h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
