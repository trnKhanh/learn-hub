"use client";

import { createContext, useEffect, useState } from "react"

interface ProfileContextProps {
    tutor: Tutor,
    setTutor: React.Dispatch<React.SetStateAction<Tutor>>
}

export const ProfileContext = createContext<ProfileContextProps>({
    tutor: undefined,
    setTutor: () => {},
})

const dummyTutor = {
    "full_name": "Elliot Nguyen",
    "username": "elliotnguyen",
    "id": "123",
    "email": "elliotnguyen@gmail.com",
    "password": "123",
    "date_of_birth": "2003",
    "phone_number": "123",
    "institute": "University of Science",
    "area_of_study": "Software Development, Artificial Intelligence",
    "biography": "hello everyone",
    "profile_picture": "https://github.com/shadcn.png",
    "admin_id": "123",
    "verified": true,
    "profit": 100,
}

export const ProfileProvider = ({children, params} : {children : React.ReactNode, params : {userId : string}}) => {
    const [tutor, setTutor] = useState<Tutor>(dummyTutor);
    useEffect(() => {
        
    }, [])

    return (
        <ProfileContext.Provider value={{tutor, setTutor}}>
            {children}
        </ProfileContext.Provider>
    );
};
