"use client";
import { useContext } from "react";
import { ProfileContext } from "../profile-provider";

const ProfileBiography = () => {
    const {tutor} = useContext(ProfileContext);
    
    return ( 
        <div className="shadow-lg rounded-md p-5 items-start mt-5 bg-[#FDFDFD]">
            <h2 className="flex flex-col text-2xl font-bold">Biography</h2>
                <h3 className="text-xs font-medium text-gray-500 mt-5">{tutor.biography}
                </h3>
        </div>
    );
}

export default ProfileBiography;