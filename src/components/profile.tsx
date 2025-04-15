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




const Profile = ({ session }) => {

    const [data, setData] = useState();
    const [joinedDate, setJoinedDate] = useState<string>("");

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
    getProfile();



    return (
        <section className="pt-25 p-5 xl:pl-50 xl:pr-50">
            <h1 className="max-sm:text-3xl sm:text-3xl lg:text-5xl font-[800] text-gray-500 leading-none text-center">sWerve Consumer Profile</h1>
            <div className="md:flex w-full md:gap-5">
                <div className="max-sm:w-[100%] md:w-[40%] shadow-lg p-5 rounded-xl mt-5">
                    <Avatar className="avatar w-[8vw] h-[8vw] m-auto mb-3 mt-3">
                        <AvatarImage src={session?.user.user_metadata.avatar_url} alt="@shadcn" />
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
                    <Button className="w-[100%] mt-3 bg-yellow-500 hover:bg-gray-400 text-black">Edit Profile</Button>
                </div>
                <div className="max-sm:w-[100%] md:w-[60%] shadow-xl rounded-xl p-8 pt-12">
                    <h1 className="text-gray-600"><b>sWervers' review on {data?.full_name}</b></h1>
                    <div className="mt-3">
                        <h1 className="text-gray-400">No Reviews Yet</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
