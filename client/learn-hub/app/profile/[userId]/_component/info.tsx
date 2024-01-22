"use client";

import { useContext } from "react";
import { ProfileContext } from "../profile-provider";

const ProfileInfo = () => {
    const {tutor} = useContext(ProfileContext);

    return ( 
        <div className="shadow-lg rounded-md p-5 items-start bg-[#FDFDFD] hover:shadow-gray-400">
            <h2 className="flex flex-col text-2xl font-bold">Education</h2>
            <div className="flex flex-row justify-between mt-5 gap-x-2 items-center">
                <h3 className="text-xs font-medium">Institute:</h3>
                <h3 className="text-xs font-medium text-gray-500">{tutor?.institute}</h3>
            </div>
            <div className="flex flex-row justify-between mt-5 gap-x-2 items-center">
                <h3 className="text-xs font-medium ">Area of study:</h3>
                <h3 className="text-xs font-medium text-gray-500">{tutor?.area_of_study}</h3>
            </div>
        </div>
    );
}

export default ProfileInfo;