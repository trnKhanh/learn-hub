import classNames from "classnames";

interface HeroProps {
    children: React.ReactNode;
}

interface HeroElementProps {
    children: React.ReactNode;
    className?: string;
}

export const HeroTitle = ({ children, className }: HeroElementProps) => {
    return (
        <h1
        className={classNames(
            "bg-gradient-to-r from-[#98A2B3] via-[#666666] to-black bg-clip-text text-7xl text-transparent my-6 md:text-8xl",
            className
        )}
        >
        {children}
        </h1>
    );
};

export const HeroSubtitle = ({ children, className }: HeroElementProps) => {
    return (
        <p
        className={classNames(
            "mb-12 text-lg text-primary-text md:text-xl",
            className
        )}
        >
        {children}
        </p>
    );
};

export const Hero = ({ children }: HeroProps) => {
    return <div className="text-center">{children}</div>;
};

export const ChevronIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M5.46967 11.4697C5.17678 11.7626 5.17678 12.2374 5.46967 12.5303C5.76256 12.8232 6.23744 12.8232 6.53033 12.5303L10.5303 8.53033C10.8207 8.23999 10.8236 7.77014 10.5368 7.47624L6.63419 3.47624C6.34492 3.17976 5.87009 3.17391 5.57361 3.46318C5.27713 3.75244 5.27128 4.22728 5.56054 4.52376L8.94583 7.99351L5.46967 11.4697Z"></path>
    </svg>
);