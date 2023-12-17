"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./variant";

const Services = () => {
    const [isYearly, setIsYearly] = useState(false);

    const packages = [
        { name: 'User Experience', monthlyPrice: 19, yearlyPrice: 199, description: "Lessons on design that cover the most recent developments.", green: "/src/assets/green-dot.png" },
        { name: 'Web Development', monthlyPrice: 39, yearlyPrice: 399, description: "Classes in development that cover the most recent advancements in web.", green: "/src/assets/green-dot.png" },
        { name: 'Marketing', monthlyPrice: 59, yearlyPrice: 599, description: "Marketing courses that cover the most recent marketing trends", green: "/src/assets/green-dot.png" },
    ];

    return (
        <div className="py-10 md:px-14 p-4 max-w-screen-2xl mx-auto pt-20" id="pricing">
            <div className="text-center">
                <h2 className="md:text-5xl text-2xl font-extrabold text-gray-900 mb-2">Our Services</h2>
                <p className="text-tertiary md:w-1/3 mx-auto">Fostering a playful & engaging learning environment</p>
            </div>
            <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}

                className="grid sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 mt-20 md:w-11/12 mx-auto">
                    {packages.map((pkg, index) => (
                    <div key={index} className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl">
                        <h3 className="text-3xl  font-bold text-center text-[#010851]">{pkg.name}</h3>
                        <p className="text-tertiary text-center my-6">{pkg.description}</p>
                        <p className="mt-5 text-center text-secondary text-4xl font-bold text-green-700">
                        {isYearly ? `$${pkg.yearlyPrice}` : `$${pkg.monthlyPrice}`}<span className="text-base text-tertiary font-medium">/{isYearly ? 'year' : 'month'}</span>
                        </p>
                        <ul className="mt-4 space-y-2 px-4">
                        <li className="flex items-center">
                            Videos of Lessons
                        </li>
                        <li className="flex items-center">
                            Homework check
                        </li>
                        <li className="flex items-center">
                            Additional practical task
                        </li>
                        <li className="flex items-center">
                            Monthly conferences 
                        </li>
                        <li className="flex items-center">
                            Personal advice from teachers
                        </li>
                        </ul>

                        <div className="w-full mx-auto flex items-center justify-center mt-5">
                            <button className="mt-6 px-10 text-secondary py-2 border border-secondary bg-[#04A3FD] hover:bg-secondary hover:text-white font-semibold rounded-lg">
                                Learn More
                            </button>
                        </div>
                    </div>
                    ))}
            </motion.div>
        </div>
    );
};

export default Services;