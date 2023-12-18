import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { WeekNumberLabel } from "react-day-picker"

type CardContent = {
    id: number,
    name: string,
    full_name: string,
    profile_picture: string,
    price: number,
    discount: number,
}

interface CourseCartProps {
    courses: CardContent[],
}

export const CourseCart = ({
    courses
} : CourseCartProps) => {
    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Cart</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {courses.map((course) => (
                            <div className="flex items-center space-x-4 space-y-2">
                                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-md">
                                    <img src={course.profile_picture} className="w-16 h-16 rounded-md" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Course by: {course.full_name}</p>
                                    <p className="text-xl font-medium leading-none">{course.name}</p>
                                    <p className="text-xl text-[#04A3FD]">{course.price - course.price * course.discount}$</p>
                                </div>
                            </div>
                        ))}
                        <div className="bg-neutral-400 flex w-[full] shrink-0 h-0.5 flex-col max-md:mt-0 mt-2.5 max-md:max-w-full" />
                        <div className="flex flex-col mt-5">
                            <p className="text-xl font-medium leading-none">Order Summary</p>
                            <div className="flex flex-row items-center space-x-4 mt-5">
                                <p className="text-sm text-muted-foreground">Subtotal:</p>
                                <p className="text-sm text-muted-foreground">{courses.length} items</p>
                            </div>
                            <div className="flex flex-row items-center space-x-4">
                                <p className="text-sm text-muted-foreground">Discount:</p>
                                <p className="text-sm text-muted-foreground">0%</p>
                            </div>
                        </div>
                        <div className="bg-neutral-400 flex w-[full] shrink-0 h-0.5 flex-col max-md:mt-0 mt-2.5 max-md:max-w-full" />
                        <div className="flex flex-row items-center space-x-4 mt-5">
                            <p className="text-xl font-medium leading-none">Total</p>
                            <p className="text-xl font-medium leading-none">{courses.length * 100}$</p>
                        </div>
                    </CardDescription>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Complete Payment</Button>
                </CardFooter>
            </Card>
        </div>
    )
}