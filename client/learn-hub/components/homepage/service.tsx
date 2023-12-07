"use client";

import { Container } from "../container"
import { Features } from "./feature";
import { ServiceShortcuts } from "./service-shortcut";

export const Services = () => {
    return (
        <>
            <Features color="#EEF4FF" colorDark="#E0EAFF">
                <Features.Main
                    title={
                        <div className="hidden sm:block">
                            <div className="text-gray">
                                <div className="text-center">
                                    <p className="mb-4 text-lg md:mb-7 md:text-7xl">
                                        Explore Programs
                                    </p>
                                    <h2 className="mx-auto mb-12 max-w-[68rem] text-lg text-primary-text md:mb-7 md:text-xl">
                                        Our Most Popular Class
                                    </h2>
                                </div>
                            </div>
                        </div>
                    }
                    image={
                        <div className="hidden sm:block">
                            <ServiceShortcuts />
                        </div>
                    }
                />
            </Features>
        </>
    );
};