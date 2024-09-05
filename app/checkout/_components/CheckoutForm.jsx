'use client'
import { useUser } from '@clerk/nextjs';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import cartApis from '../../_apis/cartApis';
import orderApis from '../../_apis/orderApis';
import { CartContext } from '../../_context/CartContext';

export default function CheckoutForm (props) {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const [processing, setProcessing] = useState('Submit');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setProcessing('Processing')
      return;
    }

    // Handle Error
    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message)
    }

    createOrder_();

    // Tigger from validation and wallet collection
    const {error: submeitError} = await elements.submit();
    if (submeitError) {
      handleError(submeitError);
      return
    }

    const res = await fetch('api/create-intent', {
      method: 'POST',
      body: JSON.stringify({
        amount: props.amount
      })
    });

    const clientSecret = await res.json();

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const createOrder_ = async () => {
    let productIds = [];

    cart.forEach((el) => {
      productIds.push(el?.product?.id);
    });

    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount: props.amount,
        products: productIds
      }
    }
    const res = await orderApis.createOrder(data);
    if (res) {
      cart.forEach((item) => {
        cartApis.deleteCartItem(item?.id).then(() => {
          
        });
      })
    }
  }
  return (
    <form className="mx-32 md:mx-[220px] my-20" onSubmit={handleSubmit}>
      <div className="">
        <PaymentElement />
      </div>
      <button className="w-full m-0 my-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-300 py-2 px-4 text-white">
        {processing}
      </button>
    </form>
  );
};