import { Key, useCallback, useEffect, useRef, useState } from "react";
import { ButtonCustomized, Highlight } from "../ui/button-customized";

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import { getCourses } from "@/actions/get-course";
import { CourseCard } from "../course-card";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const ServiceShortcuts = async () => {
    const courses = await getCourses();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                },
            }
        ]
    }
    return (
        <div className="w-3/4 m-auto">
            <Slider {...settings}>
                {courses.map((item: { id: string; name: string; image_url: string; price: number; progress: number | null; category: { name: string; }; }) => (
                            <CourseCard
                            key={item.id}
                            id={item.id}
                            title={item.name}
                            imageUrl={item.image_url!}
                            chaptersLength={1}
                            price={item.price!}
                            progress={item.progress}
                            category={item?.category?.name!}
                            />
                        ))}
            </Slider>
        </div>
    );
};