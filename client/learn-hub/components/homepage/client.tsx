"use client";

import { AlanLogo } from "../icons/alan";
import { ArcLogo } from "../icons/arc";
import { CashAppLogo } from "../icons/cashapp";
import { DescriptLogo } from "../icons/descript";
import { LoomLogo } from "../icons/loom";
import { MercuryLogo } from "../icons/mercury";
import { OpenSeaLogo } from "../icons/opensea";
import { PitchLogo } from "../icons/pitch";
import { RampLogo } from "../icons/ramp";
import { VercelLogo } from "../icons/vercel";
import { RaycastLogo } from "../icons/raycast";
import { RetoolLogo } from "../icons/retool";
import { Features } from "./feature";


export const Clients = () => (
    <>
        <Features color="#EEF4FF" colorDark="#E0EAFF">
            <Features.Main
                title={
                    <div className="hidden sm:block">
                        <div className="text-gradient translate-y-[40%] text-center text-6xl [transition:transform_1000ms_cubic-bezier(0.3,_1.17,_0.55,_0.99)_0s] md:pt-0 md:text-8xl [.is-visible_&]:translate-y-0">
                            <h2 className="mb-4 text-4xl md:mb-7 md:text-7xl text-[#04A3FD]">
                                    Our Clients
                            </h2>
                            <p className="mx-auto mb-12 max-w-[68rem] text-lg text-primary-text md:mb-7 md:text-xl">
                                Fostering a playful & engaging learning environment
                            </p>
                        </div>
                    </div>
                }
                image={
                    <div className="hidden sm:block">
                        <div className="flex flex-wrap justify-around gap-x-5 gap-y-8 [&_svg]:max-w-[16rem] [&_svg]:basis-[calc(50%-12px)] md:[&_svg]:basis-[calc(16.66%-20px)]">
                            <RampLogo />
                            <LoomLogo className="hidden md:block" />
                            <VercelLogo />
                            <DescriptLogo className="hidden md:block" />
                            <CashAppLogo />
                            <RaycastLogo />
                            <MercuryLogo />
                            <RetoolLogo />
                            <AlanLogo className="hidden md:block" />
                            <ArcLogo className="hidden md:block" />
                            <OpenSeaLogo className="hidden md:block" />
                            <PitchLogo className="hidden md:block" />
                        </div>
                    </div>
                }
            />
        </Features>
    </>
);