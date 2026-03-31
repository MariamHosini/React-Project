import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {removeProduct , clearCart} from '../../store/cartSlice'
import { useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {products} from '../../data/mock_data'
export default function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products_data = useSelector(store=>store.cart.productData);
    const products_Number = useSelector(store=>store.cart.productNumbers);
    const [finalProducts , setFinalProducts] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0); 
    const [subTotalPrice , setSubTotalPrice] = useState(0); 
    const[shippingPrice , setShippingPrice] = useState(0);
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
           console.log(finalProducts)
           const prices = finalProducts.reduce((accumilator,product)=>{return accumilator + (Number(product.numberOfProduct) * Number(product.price))},0)
           console.log(prices)
           const subprice = prices * 50;
           const shipping = (subprice * 0.07).toFixed(0);
            const finalPrice = subprice + Number(shipping);
           setShippingPrice(shipping)
           setSubTotalPrice(subprice)
           setTotalPrice(finalPrice)
        
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[products_data])
    function remove_product(product){
        dispatch(removeProduct(product))
    }
  return (
    <>
    <div className="container mx-auto px-4 py-10 mt-8">
        {finalProducts.length>0?
            <>
                <div className='flex flex-col lg:flex-row justify-between w-[100%] lg:w-[65%] items-center'>
                <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-10 text-light-secondary-700 dark:text-dark-secondary-500">
                    Your Beauty Bag
                </h1>
                <p className='font-playfair text-2xl  mb-5 md:mb-10 text-light-secondary-500 dark:text-dark-secondary-300'>
                    ({products_Number} products)
                </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="lg:w-2/3 space-y-1">
                        {/* Product Item */}
                        {
                            finalProducts?.map((product,index)=>{
                                return(
                                    <>
                                    <div key={`${product.id}-${index}`} className="flex gap-3 py-5 border-b border-light-secondary-100 items-center">
                                        <img src= {product.api_featured_image}  alt={product.name}
                                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl bg-light-secondary-50" />
                                        <div className="flex-1 space-y-1">
                                        <h3 className="font-playfair font-bold text-light-secondary-500 
                                        dark:text-light-secondary-300 text-lg md:text-xl first-letter:uppercase">{product.brand}</h3>
                                        <p className="text-light-secondary-700 
                                        dark:text-light-secondary-400 text-md md:text-lg first-letter:uppercase">{product.product_type}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button className="w-8 h-8 rounded-full border-2 border-light-secondary-500 text-lg md:text-xl
                                            text-light-neutral-800 dark:text-dark-neutral-50 dark:border-dark-secondary-700">-</button>
                                            <span className="font-semibold text-light-neutral-700 dark:text-light-neutral-100">{product.numberOfProduct}</span>
                                            <button className="w-8 h-8 rounded-full border-2 border-light-secondary-500 text-lg md:text-xl
                                            text-light-neutral-800 dark:text-dark-neutral-50 dark:border-dark-secondary-700 text-center">+</button>
                                        </div>
                                        </div>
                                        
                                        <div className="">
                                        <p className="font-bold text-md md:text-lg text-light-neutral-600 dark:text-dark-neutral-50">{(product.price *50).toFixed(0)} EGP</p>
                                        <button className="text-red-400 text-sm mt-2 hover:underline" onClick={()=>{remove_product(product)}}>Remove</button>
                                        </div>
                                    </div>
                                    </>
                                )
                            })
                        }
                    </div>

                    <div className="lg:w-1/3">
                    <div className="bg-light-secondary-50 dark:bg-light-secondary-500 p-6 rounded-3xl sticky top-28 border
                    border-light-secondary-100 dark:border-light-secondary-500">
                        <h2 className="font-playfair text-2xl font-bold text-light-primary-700 dark:text-light-primary-800 mb-6">Summary</h2>
                        <div className="space-y-4 font-opensans">
                        <div className="flex justify-between">
                            <span className="text-light-primary-700 dark:text-light-primary-900">Subtotal</span>
                            <span className="text-light-neutral-600 dark:text-dark-neutral-700 font-bold">{subTotalPrice} EGP</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-light-primary-700 dark:text-light-primary-800">Estimated Shipping</span>
                            <span className="text-green-800 font-bold">{shippingPrice}</span>
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
                    text-light-primary-400 font-playfair text-20 font-bold">
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
