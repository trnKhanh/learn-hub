import { CourseCart } from "./cart";
import { PaymentMethod } from "./payment-method";

const dummyCourses = [
    {
        id: 1,
        name: "Course 1",
        full_name: "Full Name 1",
        profile_picture: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
        price: 50,
        discount: 0.2,
    },
    {
        id: 2,
        name: "Course 2",
        full_name: "Full Name 2",
        profile_picture: "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
        price: 70,
        discount: 0.3,
    },
];

const PaymentPage = () => {
    return ( 
        <div className="flex flex-row justify-between gap-5 space-x-5">
            <PaymentMethod />
            <CourseCart courses={dummyCourses}/>
        </div>
    );
}

export default PaymentPage;