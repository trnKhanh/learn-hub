"use client";

import { getTutor } from "@/actions/tutors";
import { createContext, useEffect, useState } from "react"

interface ProfileContextProps {
    tutor: Tutor | undefined,
    setTutor: React.Dispatch<React.SetStateAction<Tutor | undefined>>,
}

export const ProfileContext = createContext<ProfileContextProps>({
    tutor: undefined,
    setTutor: () => {},
})

export const ProfileProvider = ({children, params} : {children : React.ReactNode, params : {userId : string}}) => {
    const [tutor, setTutor] = useState<Tutor>();
    useEffect(() => {
        getTutor(params.userId).then((res) => {
            if (res) {
                if (res.status === 200)
                    setTutor(res.data.tutor);
            }
        })
    }, [])

    return (
        <ProfileContext.Provider value={{tutor, setTutor}}>
            {children}
        </ProfileContext.Provider>
    );
};
