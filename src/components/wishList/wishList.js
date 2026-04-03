import React from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import {products} from '../../data/mock_data'
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../supabaseClient';
import {  removeFromWishlistRedux ,clearWishlist} from '../../store/authSlice';
import { Link } from 'react-router-dom';
export default function WishList() {
    const[message,setMessage]=useState(false);
    const[toastMessageBody,setToatMessageBody]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [WishListProducts, setWishListProducts] = useState([]);
    const wishListFromStore = useSelector((state) => state.auth.wishList);
    const id=useSelector((state) => state.auth.user?.id);
    useEffect(() => {
        const filteredProducts = products.filter(product => wishListFromStore.includes(product.id));
        setWishListProducts(filteredProducts);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products, wishListFromStore]);
    function go_to_product(id){
  const new_id=btoa(id);
  navigate(`/one-product/${new_id}`);
}
async function clearyourWishlist(){
    dispatch(clearWishlist());
    const{error} = await supabase.from('wishlist')
    .delete()
    .eq('userId', id)
        if(error){
            console.log(error);
            setMessage(true)
            setToatMessageBody("Oops! Something went wrong while clearing your wishlist. Please try again in a moment!");
            setTimeout(()=>{setMessage(false);setToatMessageBody("")},2000)
        }
        else{
            setMessage(true)
            setToatMessageBody("Your wishlist has been cleared 🌸");
            setTimeout(()=>{setMessage(false);setToatMessageBody("")},2000)
        }
}
async function toggleWishList(pID){
 
      const { error } = await supabase
      .from('wishlist') 
      .delete()
      .eq("product_Id" ,pID );
      if(error){
        setMessage(true)
        setToatMessageBody("Oops! Something went wrong while saving your favorite. Please try again in a moment!");
        setTimeout(()=>{setMessage(false);setToatMessageBody("")},2000)
      }
      else{
        setMessage(true)
        dispatch(removeFromWishlistRedux(pID))
        setToatMessageBody("Removed from your wishlist 🌸");
        setTimeout(()=>{setMessage(false);setToatMessageBody("")},2000)
      }
 }
  return (
    <>
    <div className="max-w-6xl mx-auto  py-12 animate-fadeIn flex flex-col items-center gap-4">
         { message&&
        <div className="toast toast-end ">
                <div className="alert alert-info bg-light-secondary-700 text-light-secondary-50 font-bold p-5">
                    <span>{toastMessageBody}</span>
                </div>
            </div>
        }
            
        {WishListProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-24 px-6 min-h-[70vh] animate-fadeIn">
            <div className="mb-10 relative">
                <i className="fa-solid fa-heart-crack text-8xl text-dark-secondary-700 opacity-40 hover:opacity-100 transition-opacity duration-500 cursor-default"></i>
                <i className="fa-solid fa-sparkles absolute -top-2 -right-4 text-xl text-dark-secondary-500/50 animate-pulse"></i>
            </div>

            <h2 className="text-4xl font-serif font-bold text-light-secondary-800 dark:text-dark-secondary-500 mb-4 tracking-tight">
                Your Heart's Desires?
            </h2>
            <p className="text-lg text-light-secondary-600 dark:text-dark-secondary-400 mb-12 max-w-sm mx-auto leading-relaxed italic">
                "Your wishlist is currently empty and a little heartbroken. Fill it with the beauty pieces you love!"
            </p>

            <Link
                to="/products"
                className="group relative inline-flex items-center justify-center px-12 py-4 font-bold text-white transition-all duration-300
                 bg-light-secondary-500
                 dark:bg-dark-secondary-500 dark:text-gray-950 rounded-full hover:shadow-[0_0_20px_rgba(var(--secondary-500),0.4)] overflow-hidden"
            >
                <span className="relative z-10">Go Shopping</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            </Link>
            
            </div>
        ) : (
           <>
             <div className="w-full flex flex-col md:flex-row  items-center gap-4 md:gap-10  md:mb-8">
                <h1 className=" text-3xl md:text-5xl  text-center font-serif font-bold text-light-secondary-800 dark:text-dark-secondary-500 
                animate-fadeInUp ">My Wish List</h1>
                <p className=' text-20 text-light-secondary-600 dark:text-dark-secondary-700'>{wishListFromStore.length} 
                    {wishListFromStore.length === 1 ? 'item' : 'items'} </p>
                <div className="ml-auto ">
                <button onClick={() => clearyourWishlist()}
                    className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors text-sm font-medium px-2 py-1">
                    <i className="fa-regular fa-trash-can"></i> Clear Your Wishlist</button> </div>
                </div>
             <div className="mb-20 px-3 md:px-0 w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 place-items-stretch mt-5 md:mt-10 lg:mt-12">
            
         {
             WishListProducts.map((product,index) => {
            return (
                 <div key={product.id || index} id={`product-${product.id}`} className={` p-3 md:p-5 rounded-xl flex flex-col justify-center 
                      items-center gap-y-2
                      ${product.stock===0?`border-[2px] border-red-400`
                      :`border-[3px] border-gray-100 dark:border-2 dark:border-dark-neutral-400`}`}> 
                      <div className="overflow-hidden h-44 md:h-64 w-full flex flex-col items-center ">
                            <div className="h-[90%] w-full flex justify-center overflow-hidden">
                              <img loading="lazy" src={product.api_featured_image} alt={product.name} className={`h-[100%] w-auto
                            ${product.stock===0?`opacity-40`:`opacity-100 transition-transform duration-300 ease-in-out hover:scale-110`} `}/>
                            </div>
                            {product.stock ===0 &&
                            <p className="text-white bg-red-900 w-[100%] text-center text-12 md:text-16 ">OUT OF STOCK</p>

                            }
                      </div>
                      <div className="w-full flex flex-col  items-center h-[9rem] md:h-44">
                        <div className="h-24 flex items-center justify-center">
                          <p className="first-letter:uppercase text-light-secondary-900 dark:text-dark-secondary-300 text-[16px]
                           md:text-24 font-bold font-playfair text-center">
                          {product.brand}</p>
                        </div>
                        
                        <p className="text-light-secondary-600 text-14 md:text-[18px] text-center font-playfair h-12
                        first-letter:uppercase">{product.product_type}</p>
                        <p className="text-light-secondary-800 dark:text-dark-secondary-300 font-medium mt-1 text-14 md:text-[18px] text-center font-playfair h-12">{(product.price* 50).toFixed(0)} EGP</p>
                        <div className=" w-[100%] h-20 md:h-28 flex justify-between items-center">
                          <button className=" flex justify-center items-center rounded-md border-light-secondary-50
                        dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                        dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px] w-[80%] h-[80%]
                          hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                        text-light-primary-400 font-playfair text-[16px] md:text-20 font-bold"
                        onClick={()=>{go_to_product(product.id)}} >
                        Read more
                        </button>
                        <i className={` fa-heart text-24 md:text-[26px] cursor-pointer 
                          dark:text-dark-secondary-800 text-light-secondary-400 fa-solid`} onClick={()=>{toggleWishList(product.id)}}></i>
                        </div>
                      </div>
                    </div>
            );
          })
         }
          </div>
          </>
        )}
    </div>
    </>
  )
}


