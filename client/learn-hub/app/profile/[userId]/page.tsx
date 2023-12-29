"use client";

import { useContext } from "react";
import ProfileBiography from "./_component/biography";
import ProfileHeader from "./_component/header";
import ProfileInfo from "./_component/info";
import CourseReviewSection from "./_component/course-review";
import { ProfileContext } from "./profile-provider";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = () => {
    const {tutor} = useContext(ProfileContext);
    if (tutor === undefined) {
        return (
            <Skeleton/>
        )
    }
    return ( 
        <div className="flex flex-col items-start justify-between gap-5 mt-20 ml-20 mr-20 mb-40">
            <ProfileHeader />
            <div className="flex flex-row w-full gap-x-5">
                <div className="flex flex-col w-1/5">
                    <ProfileInfo />
                    <ProfileBiography/>
                </div>
                <div className="flex w-4/5 mb-40">
                    <CourseReviewSection tutor_id={tutor.id}/>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;