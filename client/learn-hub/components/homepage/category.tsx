"use client";

import { motion } from "framer-motion";
import { fadeIn } from "./variant";
import CategoryItem from "./category-item";

const Categories = () => {
    return (
        <div className="py-10 md:px-14 p-4 max-w-screen-2xl mx-auto pt-20" id="pricing">
            <div className="text-center">
                <h2 className="md:text-5xl text-2xl font-extrabold text-gray-900 mb-2">Top Categories</h2>
            </div>
            <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.2 }}

                className="pt-10">
                    <div className="pb-10 flex flex-wrap justify-around gap-x-5 gap-y-8 [&_svg]:max-w-[16rem] [&_svg]:basis-[calc(50%-12px)] md:[&_svg]:basis-[calc(16.66%-20px)]">
                        <CategoryItem label="Programming" image={<img src="/images/programming.png" alt="" />} />
                        <CategoryItem label="UX/UI Design" image={<img src="/images/uxui.png" alt="" />} />
                        <CategoryItem label="Marketing" image={<img src="/images/marketing.png" alt="" />} />
                        <CategoryItem label="Photography" image={<img src="/images/photography.png" alt="" />} />
                    </div>

                    <div className="flex flex-wrap justify-around gap-x-5 gap-y-8 [&_svg]:max-w-[16rem] [&_svg]:basis-[calc(50%-12px)] md:[&_svg]:basis-[calc(16.66%-20px)]">
                        <CategoryItem label="Animation" image={<img src="/images/animation.png" alt="" />} />
                        <CategoryItem label="Video" image={<img src="/images/video.png" alt="" />} />
                        <CategoryItem label="Business" image={<img src="/images/business.png" alt="" />} />
                        <CategoryItem label="Finance" image={<img src="/images/finance.png" alt="" />} />
                    </div>
            </motion.div>
        </div>
    );
};

export default Categories;