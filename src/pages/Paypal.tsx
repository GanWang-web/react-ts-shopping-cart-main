import {useState} from 'react'
import { useLocalStorage } from "../hooks/useLocalStorage"
import { formatCurrency } from '../utilities/formatCurrency';
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import { CreateOrderActions } from "@paypal/paypal-js";
import { useShoppingCart } from '../context/ShoppingCartContext';

type Props = {}
type CartItem = {
  id: number
  quantity: number
}

const Paypal=({}: Props)=>{
  const {resetCart,storeItems} = useShoppingCart()
 const [ErrorMessage, setErrorMessage] = useState<Record<string,unknown>>();
 const [orderID, setOrderID] = useState(false);
 
 const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )
  let total = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find(i => i.id === cartItem.id)
    return total + (item?.price || 0) * cartItem.quantity
  }, 0)
 // creates a paypal order
 const createOrder = async (data:any, actions:CreateOrderActions) => {
   return actions.order.create({
       purchase_units: [
         {
           description: "grocery",
          //  intent:'CAPTURE',
           amount: {
             currency_code: "USD",
             value: `${total}`,
           },
         },
       ],
       application_context: {
         shipping_preference: "NO_SHIPPING",
       },
     }).then((orderID:string) => {
        setOrderID(Boolean(orderID));
       return orderID;
     });
 };
 
 const onApprove = async () => {
   alert('payment succeed')
   setCartItems([])
   total=0
   resetCart()
 };

 const onError = (err:Record<string,unknown>) => {
   alert("An Error occured with your payment");
   setErrorMessage(err)
 };

 return (
  <div>
    <div>sandbox payment, not real payment.</div>
    Total{" "}
    {formatCurrency(
      total
    )}
    <PayPalScriptProvider
     options={{
       "client-id":"AVC7QCeL_LNh8nbufwl5Pj_sqgFw4bPPysojfIt-s0_k0t6eu2pcK2OrPXMAEZxk5FnPgI8GPVkvMvKy",
     }}
   >
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={createOrder}
      onApprove={onApprove}
      onError={(err)=>onError(err)}
    />
   </PayPalScriptProvider>
   </div>
   
 );
}
export default Paypal