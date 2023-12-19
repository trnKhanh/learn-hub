"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AlarmClock, Award, BarChart4, BookText, Clock, Facebook, Layers, LibraryBig, MailPlus, Monitor, Twitter, Users, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const difficultyMap: { [key: string]: string } = {
    "BEGINNER": "Beginner",
    "INTERMEDIATE": "Intermediate",
    "ADVANCED": "Advanced",
};

interface CourseOverviewCardProps {
    price: number,
    discount: number,
    duration: number,
    difficulty: string,
    language: string,
    studentEnrolled: number
}

export const CourseOverviewCard = ({
    price,
    discount,
    duration,
    difficulty,
    language,
    studentEnrolled
} : CourseOverviewCardProps) => {
    const newPrice = price - price * discount;
    const formatDiscount = discount * 100;
    return (
        <Card className="w-[350px] shadow-lg">
        <CardHeader>
            <CardTitle>
                {discount > 0 ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="text-3xl font-semibold">
                                {newPrice}$
                            </div>
                            <div className="line-through text-gray-300 text-xl">
                                {price}$
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Badge variant="destructive">Sale off {formatDiscount}%</Badge>
                        </div>
                    </div>  
                ) : (
                    <p className="text-2xl font-semibold">{price}€</p>
                )}
            </CardTitle>
            <CardDescription>
                <div className="flex flex-row items-center gap-2">
                    <AlarmClock className="h-4 w-4"/>
                    <div className="text-xs text-red-600">2 days left at this price!</div>
                </div>
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5"/>
                        <div className="text-gray-500 text-sl">Duration</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-500 text-sl">{duration} hours</div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <BarChart4 className="h-5 w-5"/>
                        <div className="text-gray-500 text-sl">Course Level</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-500 text-sl">{difficultyMap[difficulty]}</div>
                    </div>
                </div> 
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5"/>
                        <div className="text-gray-500 text-sl">Students Enrolled</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-500 text-sl">{studentEnrolled}</div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <BookText className="h-5 w-5"/>
                        <div className="text-gray-500 text-sl">Language</div>
                    </div>
                    <div className="flex items-center">
                        <div className="text-gray-500 text-sl">{language}</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-2 mt-10">
                <Button className="w-full">Add to cart</Button>
                <Button variant="attract" className="w-full">Buy now</Button>
                <div className="flex flex-row space-x-2">
                    <Button variant="outline" className="w-full">Wishlist</Button>
                    <Button variant="outline" className="w-full">Financial Aid</Button>
                </div>
                <div className="text-xs text-gray-500">All courses have 30-days money-back guarantee</div>
            </div>

            <div className="flex flex-col space-y-2 mt-10">
                <div className="text-gray-500 text-sl">This course includes:</div>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <BookText className="h-5 w-5"/>
                            <div className="text-gray-500 text-sm">Full lifetime access</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Monitor className="h-5 w-5"/>
                            <div className="text-gray-500 text-sm">Access on mobile and TV</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Award className="h-5 w-5"/>
                            <div className="text-gray-500 text-sm">Certificate of completion</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Layers className="h-5 w-5"/>
                            <div className="text-gray-500 text-sm">100% online course</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <LibraryBig className="h-5 w-5"/>
                            <div className="text-gray-500 text-sm">Free exercises file & downloadable resources</div>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
            <div className="flex flex-col space-y-2 mt-2">
                <div className="text-gray-500 text-sl">Share this course:</div>
                <div className="flex flex-row space-x-2 items-center">
                    <Button variant="outline" className="w-full">Copy link</Button>
                    <Facebook className="h-10 w-10"/>
                    <Twitter className="h-10 w-10"/>
                    <MailPlus className="h-10 w-10"/>
                    <MessageSquare className="h-10 w-10"/>
                </div>
            </div>
        </CardFooter>
        </Card>
    )
}
