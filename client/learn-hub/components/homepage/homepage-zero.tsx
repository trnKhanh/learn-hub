import { ButtonCustomized, Highlight } from "../ui/button-customized";
import { Hero, HeroTitle, HeroSubtitle, ChevronIcon } from "./zero";
import { HeroImage } from "./zero-image";

export const HomepageHero = () => (
    <Hero>
        <ButtonCustomized
            className="translate-y-[-1rem] animate-fade-in"
            href="/"
            variant="secondary"
            size="small"
        >
        <span>Black Friday - Last Chance In 2023</span>{" "}
        <Highlight>→</Highlight>
        </ButtonCustomized>
        <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-1 [--animation-delay:200ms]">
            Boost Your <span className="text-[#04A3FD]">Skills</span>
            <br className="hidden md:block" /> To <span className="text-[#04A3FD]">Advance</span> Your
            <br className="hidden md:block" /> <span className="text-[#04A3FD]">Career</span> Path
        </HeroTitle>
        <HeroSubtitle className="translate-y-[-1rem] animate-fade-in [--animation-delay:400ms] text-gray-500">
            Provides you with the latest online learning system 
            <br className="hidden md:block" /> and material that help your knowledge growing.
        </HeroSubtitle>
        <div className="flex justify-center items-center translate-y-[-2rem]">
            <img src="/images/homepage-0.svg" alt="Hero image"/>
        </div>
        <ButtonCustomized
        className="translate-y-[1rem] animate-fade-in [--animation-delay:600ms] bg-[#04A3FD] hover:bg-[#04A3FD] transition-colors"
        href="/"
        variant="primary"
        size="large"
        >
            <span className="text-white">Get Started </span>
        </ButtonCustomized>
    </Hero>
);