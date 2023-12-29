"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe, Star, Users, Video } from "lucide-react";
import { useContext } from "react";
import { ProfileContext } from "../profile-provider";
import { Skeleton } from "@mui/material";

const ProfileHeader = () => {
    const {tutor} = useContext(ProfileContext);

    return ( 
        <div className="h-100 w-full flex flex-row shadow-md rounded-xl bg-[#FEFEFE] justify-between hover:shadow-gray-400">
            <div className="flex flex-row items-center justify-between">
                <Avatar className="h-20 w-20 m-5">
                    <AvatarImage src={tutor?.profile_picture} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center mt-5">
                    <div className="flex flex-row gap-x-2">
                        <h1 className="text-3xl font-bold text-primary">{tutor?.full_name}</h1>
                        {tutor?.verified && 
                        <img className="h-6 w-6 mt-2 justify-center" src="/icon/verified-icon.png" alt="Verified" />}
                    </div>
                    <h2 className="text-xl font-medium text-primary">{tutor?.username}</h2>
                    <h3 className="text-sm font-medium text-gray-500">{tutor?.area_of_study}</h3>

                    <div className="flex flex-row gap-x-2 mt-5 mb-5 items-center">
                        <Star size={15} color="#04A3FD" strokeWidth={2.25} />
                        <h3 className="text-sm font-medium text-gray-500">4.8 (134,633 reviews)</h3>

                        <Users size={15} color="#04A3FD" strokeWidth={2.25} className="ml-5"/>
                        <h3 className="text-sm font-medium text-gray-500">430,177 students</h3>

                        <Video size={15} color="#04A3FD" strokeWidth={2.25} className="ml-5"/>
                        <h3 className="text-sm font-medium text-gray-500">7 videos</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-10 mr-5">
                <div className="flex flex-row gap-x-2 items-center">
                    <Globe size={15} color="#04A3FD" strokeWidth={2.25} />
                    <h3 className="text-sm font-medium text-[#04A3FD] underline">{tutor?.email}</h3>
                </div>
                <img src="/icon/profile.svg" alt="Instagram" className="mt-5" />
            </div>
        </div>
    );
}

export default ProfileHeader;
