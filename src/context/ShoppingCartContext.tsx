import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"
import {useLoading} from '../hooks/useLoading'
type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}
type storeItem={
  id:number,
  name:string,
  imgUrl:string,
  price:number
}
type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
  storeItems:storeItem[]
  resetCart:()=>void
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  )
  const [isLoading,load] = useLoading()
  let cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )
  const [storeItems,setStoreItems] = useState([])
  
  const fetchData=async ()=>{
    const data = await load(fetch("https://dczjmxgqwf.execute-api.ap-southeast-2.amazonaws.com/Dev"))
    await data.json().then((data: any)=>setStoreItems(JSON.parse(data.body)))
  }

  useEffect(()=>{
    load(fetchData())
  },[])

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }
  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }
  const resetCart:()=>void=()=>{
    setStoreItems([])
    cartQuantity=0
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        storeItems,
        resetCart
      }}
    >
      {isLoading===false?children:'is loading...'}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
