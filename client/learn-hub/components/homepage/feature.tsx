"use client";

import classNames from "classnames";
import { Container } from "@/components/container";
import { useInView } from "react-intersection-observer";

type FeaturesProps = {
    children: React.ReactNode;
    color: string;
    colorDark: string;
};

export const Features = ({ children, color, colorDark }: FeaturesProps) => {
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: false });

    return (
        <section
        ref={ref}
        className={classNames(
            "after:bg-[radial-gradient(ellipse_100%_40%_at_50%_60%,rgba(var(--feature-color),0.1),transparent) relative flex flex-col items-center overflow-x-clip before:pointer-events-none before:absolute before:h-[40rem] before:w-full before:bg-[conic-gradient(from_90deg_at_80%_50%,#000212,rgb(var(--feature-color-dark))),conic-gradient(from_270deg_at_20%_50%,rgb(var(--feature-color-dark)),#000212)] before:bg-no-repeat before:transition-[transform,opacity] before:duration-1000 before:ease-in before:[mask:radial-gradient(100%_50%_at_center_center,_black,_transparent)] before:[background-size:50%_100%,50%_100%] before:[background-position:1%_0%,99%_0%] after:pointer-events-none after:absolute after:inset-0",
            inView &&
            "is-visible before:opacity-100 before:[transform:rotate(180deg)_scale(2)]",
            !inView && "before:rotate-180 before:opacity-40"
        )}
        style={
            {
            "--feature-color": color,
            "--feature-color-dark": colorDark,
            } as React.CSSProperties
        }
        >
        <div className="w-full md:mt-[12.5rem] md:mb-[12.8rem]">
            {children}
        </div>
        </section>
    );
    };

    type MainFeatureProps = {
        title: React.ReactNode;
        image: React.ReactNode;
    };

    const MainFeature = ({
        title,
        image,
        }: MainFeatureProps) => {
        return (
            <>
                <div className="relative before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_50%_50%_at_center,rgba(var(--feature-color),0.1),transparent)]">
                    <Container
                    className={classNames(
                        "max-w-[90%] text-center"
                    )}
                    >
                        {title}
                    </Container>
                    {image}
                </div>
            </>
        );
    };

    type FeatureGridProps = {
        features: {
            icon: React.FC;
            title: string;
            text: string;
        }[];
    };

    const FeatureGrid = ({ features }: FeatureGridProps) => {
    return (
        <Container>
        <div className="mb-16 grid w-full grid-cols-2 place-items-center gap-y-9 text-sm text-primary-text md:mb-[14rem] md:grid-cols-3 md:text-md">
            {features.map(({ title, text, icon: Icon }) => (
            <div
                className="max-w-[25.6rem] [&_svg]:mb-[4px] [&_svg]:fill-white md:[&_svg]:mr-[6px] md:[&_svg]:mb-[2px] md:[&_svg]:inline"
                key={title}
            >
                <Icon />
                <span className="block text-white md:inline">{title}</span> {text}
            </div>
            ))}
        </div>
        </Container>
    );
    };

    type FeatureCardsProps = {
    features: {
        image: string;
        imageClassName: string;
        title: string;
        text: string;
    }[];
    };

    const FeatureCards = ({ features }: FeatureCardsProps) => {
    return (
        <Container>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {features.map(({ title, text, image, imageClassName }) => (
            <div
                key={title}
                className="relative aspect-[1.1/1] overflow-hidden rounded-[2.4rem] border border-transparent-white bg-[radial-gradient(ellipse_at_center,rgba(var(--feature-color),0.15),transparent)] py-6 px-8 before:pointer-events-none before:absolute before:inset-0 before:bg-glass-gradient md:rounded-[4.8rem] md:p-14"
            >
                <h3 className="mb-2 text-2xl text-white">{title}</h3>
                <p className="max-w-[31rem] text-md text-primary-text">{text}</p>
                <img
                className={classNames("absolute max-w-none", imageClassName)}
                src={image}
                />
            </div>
            ))}
        </div>
        </Container>
    );
};

Features.Main = MainFeature;
Features.Grid = FeatureGrid;
Features.Cards = FeatureCards;