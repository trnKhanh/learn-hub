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

import { motion } from "framer-motion";
import { fadeIn } from "./variant";

const Clients = () => {
    return (
        <div className="py-10 md:px-14 p-4 max-w-screen-2xl mx-auto" id="pricing">
            <div className="text-center">
                <h2 className="md:text-5xl text-2xl font-extrabold text-gray-900 mb-2">Our Clients</h2>
            </div>
            <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}

                className="pt-10">
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
            </motion.div>
        </div>
    );
};

export default Clients;