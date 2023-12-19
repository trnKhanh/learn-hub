import { CourseCart } from "./cart";
import { PaymentMethod } from "./payment-method";

const PaymentPage = () => {
  return (
    <div className="flex flex-row justify-between gap-5 space-x-5">
      <PaymentMethod />
      <CourseCart />
    </div>
  );
};

export default PaymentPage;
