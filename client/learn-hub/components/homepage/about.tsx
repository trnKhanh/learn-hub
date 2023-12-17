"use client";

import { motion } from "framer-motion";
import { fadeIn } from "./variant";

const About = () => {
    return (
        <div className="md:px-14 p-4 max-w-screen-2xl mx-auto pt-20" id="about">
            <div className="text-center">
                <h2 className="md:text-5xl text-2xl font-extrabold text-gray-900 mb-2">About Us</h2>
            </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.div className="md:w-1/2"
            
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            >
            <img src="./images/about-3.png" alt="" />
            </motion.div>
            <motion.div
            
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}

            className="md:w-2/5">
            <h2 className="md:text-5xl text-3xl font-bold text-primary mb-5 leading-normal">
                We have been improving our courses 
                <span className="leading-normal text-[#04A3FD]"> for many years.</span>
            </h2>
            <p className="text-tertiary text-lg mb-7">
                We are constantly improving our courses and materials to make them more interesting and useful for you. 
            </p>
            <button className="py-3 px-7 bg-[#04A3FD] font-semibold text-white rounded hover:bg-primary transition-all duration-300">
                Get Started
            </button>
            </motion.div>
        </div>

        <div className="my-12"></div>

        {/* 2nd about */}
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-8">
            {/* img */}
            <motion.div 
                    variants={fadeIn("right", 0.4)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
            
            className="md:w-1/2">
            <img src="./images/about-2.png"  alt="" className="w-full" />
            </motion.div>
            <motion.div
                    variants={fadeIn("down", 0.5)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
            className="md:w-2/5">
            <h2 className="md:text-5xl text-3xl font-bold text-primary mb-5 leading-normal">
            You can Practice at any 
                <span className="leading-normal text-[#04A3FD]"> time convinent for you.</span>
            </h2>
            <p className="text-tertiary text-lg mb-7">
                With famous tutors around the world
            </p>
            <button className="py-3 px-7 bg-[#04A3FD] font-semibold text-white rounded hover:bg-primary transition-all duration-300">
                Get Started
            </button>
            </motion.div>
        </div>
        </div>
    );
};

export default About;