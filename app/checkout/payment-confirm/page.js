import Link from 'next/link';
import { GrValidate } from "react-icons/gr";

export default function PaymentConfirm() {
  return (
    <div className="flex flex-col items-center justify-center px-5 mt-4 my-24">
      <div>
        <GrValidate className="text-3xl mb-2" />
      </div>
      <h2 className="text-2xl">Payment Sucessful!</h2>
      <Link href="/" className="p-2 mt-6 text-white rounded-md bg-blue-600">Go To Home</Link>
    </div>
  )
}
