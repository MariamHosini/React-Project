import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {removeProduct , clearCart,updateQuantity} from '../../store/cartSlice'
import { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {products} from '../../data/mock_data'
export default function Cart() {
    const isAuth = useSelector(store=>store.auth.isAuthenticated);
    const orders = useSelector(store=>store.auth.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products_data = useSelector(store=>store.cart.productData);
    const products_Number = useSelector(store=>store.cart.productNumbers);
    const [finalProducts , setFinalProducts] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0); 
    const [subTotalPrice , setSubTotalPrice] = useState(0); 
    const[shippingPrice , setShippingPrice] = useState(0);
    const[shippingFree , setShippingFree] = useState(false);
    const[discount , setDiscount] = useState(0);
    useEffect(()=>{
        if(products && products!=null){
            const finalProducts = products_data.map(item => {
                const productInfo = products.find(prd => Number(prd.id) === Number(item.id));
                return {
                    ...productInfo,      
                    numberOfProduct: item.numberOfProduct, 
                    selectedColor: item.selectedColor      
                };
            })
           setFinalProducts(finalProducts)
           const prices = finalProducts.reduce((accumilator,product)=>{return accumilator + (Number(product.numberOfProduct) * Number(product.price))},0)
           const subprice = (prices * 50).toFixed(0);
           let calDiscount = 0;
           let shipping = 0;
          let finalPrice = 0;
           if(subprice >= 10000 ){
            if(isAuth && orders.length===0){
                setShippingFree(true)
                calDiscount = (0.2 *subprice).toFixed(0);
                shipping=0;
                finalPrice = Number(subprice) + Number(shipping) - calDiscount;
                setDiscount(calDiscount)
            setShippingPrice(shipping)
            setSubTotalPrice(subprice)
            setTotalPrice(finalPrice)
            }
            else{
            setShippingFree(true)
            calDiscount=0;
            shipping=0;
            finalPrice = Number(subprice) + Number(shipping);
           setShippingPrice(shipping)
           setSubTotalPrice(subprice)
           setTotalPrice(finalPrice)
             setDiscount(calDiscount)
            }
           }
           else{
            if(isAuth && orders.length===0){
                setShippingFree(false)
                calDiscount = (0.2 *subprice).toFixed(0);
                shipping = (subprice * 0.1).toFixed(0);
                finalPrice = Number(subprice) + Number(shipping) - calDiscount;
                  setDiscount(calDiscount)
            setShippingPrice(shipping)
            setSubTotalPrice(subprice)
            setTotalPrice(finalPrice)
            }
            else{
            setShippingFree(false)
            calDiscount=0;
            shipping = (subprice * 0.1).toFixed(0);
           finalPrice = Number(subprice) + Number(shipping);
             setDiscount(calDiscount)
           setShippingPrice(shipping)
           setSubTotalPrice(subprice)
           setTotalPrice(finalPrice)
            }
           }
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[products_data])
    function remove_product(product){
        dispatch(removeProduct(product))
    }
    function incrementCount(id, numberOfProduct , stock , selectedColor){
        const newQuantity = Number(numberOfProduct) + 1;
        if((newQuantity) <= stock){
            dispatch(updateQuantity({ id, numberOfProduct: newQuantity, selectedColor }));
        }
     }
    function decrementCount(id, numberOfProduct, selectedColor){
        const newQuantity = Number(numberOfProduct) - 1;
        if(newQuantity >= 1){
            dispatch(updateQuantity({ id, numberOfProduct: newQuantity, selectedColor }));
        }
    }
  return (
    <>
        <div className="container mx-auto px-4 py-5 mt-8">
            {finalProducts.length>0?
                < >
                    <div className='flex flex-col lg:flex-row justify-between w-[100%] lg:w-[65%] items-center'>
                    <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-10 text-light-secondary-700 dark:text-dark-secondary-500">
                        Your Beauty Bag
                    </h1>
                    <p className='font-playfair text-2xl  mb-5 md:mb-10 text-light-secondary-500 dark:text-dark-secondary-300'>
                        ({products_Number} {products_Number > 1 ? 'items' : 'item'})
                    </p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:justify-center gap-10">
                        <div className="lg:w-2/3 w-[100%] space-y-1">
                            {/* Product Item */}
                            {
                                finalProducts?.map((product,index)=>{
                                    return(
                                        <React.Fragment key={`${product.id}-${index}`} >
                                        <div  className="flex gap-2 md:gap-3 py-5 border-b border-light-secondary-100 items-center">
                                            <img src= {product.api_featured_image}  alt={product.name}
                                            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl bg-light-secondary-50
                                            cursor-pointer"  onClick={()=>{navigate(`/one-product/${btoa(product.id)}`)}}/>
                                            <div className="flex-1 space-y-1">
                                            <h3 className="font-playfair font-bold text-light-secondary-500 
                                            dark:text-light-secondary-300 text-lg md:text-xl first-letter:uppercase">{product.brand} </h3>
                                            <div className="flex flex-col justify-center gap-2">
                                                <p className="text-light-secondary-700 
                                                dark:text-light-secondary-700 text-md md:text-lg first-letter:uppercase">
                                                {product.product_type}</p>
                                                <div className='flex items-center gap-1 md:gap-2 '>
                                                {  product.selectedColor?.hex_value && product.selectedColor?.color &&
                                                    ( <>
                                                    <div className='w-4 h-4 border-light-primary-800 dark:border-light-neutral-50 border-[1px] md:w-5 md:h-5 rounded-full' style={{backgroundColor:product.selectedColor.hex_value}}></div>
                                                    <p className="text-light-secondary-700 
                                                dark:text-light-secondary-500 text-xs md:text-lg first-letter:uppercase">{product.selectedColor.color}</p>
                                                    </>)

                                                }
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <button className="w-8 h-8 rounded-full border-2 border-light-secondary-500 text-lg md:text-xl
                                                text-light-neutral-800 dark:text-dark-neutral-50 dark:border-dark-secondary-700"
                                                onClick={()=>{decrementCount(product.id,product.numberOfProduct, product.selectedColor)}}>-</button>
                                                <span className="font-semibold text-light-neutral-700 dark:text-light-neutral-100">{product.numberOfProduct}</span>
                                                <button className="w-8 h-8 rounded-full border-2 border-light-secondary-500 text-lg md:text-xl
                                                text-light-neutral-800 dark:text-dark-neutral-50 dark:border-dark-secondary-700 text-center"
                                                onClick={()=>{incrementCount(product.id,product.numberOfProduct , product.stock , product.selectedColor)}}>+</button>
                                            </div>
                                            </div>
                                            
                                            <div className="">
                                            <p className="font-bold text-md md:text-lg text-light-neutral-600 dark:text-dark-neutral-50">{(product.price *50).toFixed(0)} EGP</p>
                                            <button className="text-red-400 text-sm mt-2 hover:underline" onClick={()=>{remove_product(product)}}>Remove</button>
                                            </div>
                                        </div>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </div>

                        <div className="lg:w-1/3 sticky w-[100%] top-10 md:self-start">
                        <div className="mb-6 p-4 bg-transparent w-[100%] h-24
                         rounded-2xl border border-dashed border-light-secondary-300 text-center ">
                            {shippingFree ? (
                                <p className="text-green-600 font-bold flex items-center justify-center gap-2">
                                    <i className="fa-solid fa-truck-fast"></i>
                                    Congratulations! You've unlocked Free Shipping! 🥳
                                </p>
                            ) : (
                                <p className="text-light-secondary-700 dark:text-dark-secondary-300 flex items-center justify-center">
                                    Add <span className="font-bold text-light-secondary-500 px-1">
                                        {(10000 - subTotalPrice).toFixed(0)} EGP</span> more to get 
                                    <span className="font-bold pl-1"> FREE SHIPPING!</span>
                                </p>
                            )}
        
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3 overflow-hidden">
                                <div 
                                    className="bg-light-secondary-400 dark:bg-dark-secondary-700 h-full transition-all duration-500" 
                                    style={{ width: `${Math.min((subTotalPrice / 10000) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="bg-light-secondary-50 dark:bg-light-secondary-500 p-6 rounded-3xl border
                        border-light-secondary-100 dark:border-light-secondary-500">
                            <h2 className="font-playfair text-2xl font-bold text-light-primary-700 dark:text-light-primary-800 mb-6">Summary</h2>
                            <div className="space-y-4 font-opensans">
                            <div className="flex justify-between">
                                <span className="text-light-primary-700 dark:text-light-primary-900">Subtotal</span>
                                <span className="text-light-neutral-600 dark:text-dark-neutral-700 font-bold">{subTotalPrice} EGP</span>
                            </div>
                            {(isAuth && orders.length===0)&&
                                <div className="flex justify-between">
                                <span className="text-green-800  font-bold">20% Discount</span>
                                <span className="text-light-neutral-600 dark:text-dark-neutral-700 font-bold">-{discount} EGP</span>
                            </div>

                            }
                            <div className="flex justify-between">
                                <span className="text-light-primary-700 dark:text-light-primary-800">
                                    <i className="fa-solid fa-truck-fast text-green-800 font-bold text-20"></i> Shipping</span>
                                <span className="text-green-800 font-bold">{!shippingFree?shippingPrice: 'Free'}</span>
                            </div>
                            <hr className="border-light-secondary-200" />
                            <div className="flex justify-between text-xl font-bold">
                                <span className="text-light-primary-700 dark:text-light-primary-800">Total</span>
                                <span className="text-light-secondary-800 dark:text-dark-neutral-700">{totalPrice} EGP</span>
                            </div>
                            </div>
                            
                            <button className="w-full py-4 mt-8 rounded-full border-light-secondary-50
                        dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                        dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px]
                            hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                        text-light-primary-400 font-playfair text-20 md:text-16 lg:text-20 font-bold"
                        onClick={()=>{navigate("/check-out")}}>
                            Proceed to Checkout
                            </button>
                        </div>
                        </div>
                    </div>
                    <div className="flex justify-start mt-4">
                                <button 
                                        onClick={() => dispatch(clearCart())}
                                        className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors text-sm font-medium px-2 py-1"
                                        >
                                        <i className="fa-regular fa-trash-can"></i>
                                        Clear Shopping Bag
                                </button>
                    </div>
                </>
            :
            <div className="flex flex-col items-center justify-center py-20 w-full text-center space-y-6 animate-fadeIn">

                <div className="relative">
                    <i className="fa-solid fa-bag-shopping text-8xl text-light-secondary-500 dark:text-dark-secondary-800"></i>
                </div>
                <div className="space-y-2">
                <h2 className="font-playfair text-3xl font-bold text-light-secondary-800 dark:text-dark-secondary-300">
                    Your Bag is Empty
                </h2>
                <p className="text-light-secondary-700 dark:text-dark-secondary-500 font-opensans max-w-xs mx-auto">
                    Looks like you haven't added your beauty essentials yet. Let's find something special for you!
                </p>
                </div>
                <button 
                onClick={()=>{navigate('/products')}}
                className="px-10 py-3 bg-light-secondary-500 dark:bg-dark-secondary-800 text-white font-playfair font-bold rounded-full 
                            hover:bg-light-secondary-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                Explore Shop
                </button>
            </div>

            }
        </div>
    </>
  )
}
