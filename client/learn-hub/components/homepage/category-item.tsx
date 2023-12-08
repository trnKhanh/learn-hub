"use client";

import Link from 'next/link';
import React from 'react';

interface CategoryItemProp {
    label: string;
    image: React.ReactNode;
}

const CategoryItem : React.FC<CategoryItemProp> = ({label, image}) => {
    return (
        <Link href={`/category/${label}`}>
            <div className="flex flex-col items-center justify-center gap-y-2 cursor-pointer transition hover:scale-105">
                <div className="w-16 h-16 bg-white flex items-center justify-center">
                    {image}
                </div>
                <h3 className="text-3xl  font-bold text-center text-[#010851]">{label}</h3>
            </div>
        </Link>
    )
}

export default CategoryItem;