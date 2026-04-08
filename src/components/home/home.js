import React from "react";
import { useNavigate , useSearchParams } from "react-router-dom";
import { useEffect , useState } from "react";
import modelImage from "../../assets/model2.png";
import backGround from "../../assets/bg.webp";
import lipliner from '../../assets/lipliner.png'
import lipstick from '../../assets/lipstick.png'
import mascara from '../../assets/mascara.png'
import nailPolish from '../../assets/nail-polish.png'
import {products} from '../../data/mock_data.js'
import {useSelector,useDispatch} from 'react-redux'
import supabase from '../../supabaseClient'
import {addToWishlistRedux,removeFromWishlistRedux} from '../../store/authSlice'
export default function Home() {
    const isAuth = useSelector(store=>store.auth.isAuthenticated)
    const userWishList = useSelector(store=>store.auth.wishList)
    const [searchParams ]= useSearchParams();
  const navigate = useNavigate();
    const dispatch =useDispatch();
  const [allproducts , setAllProducts] = useState([]);
  const [ClassifiedProducts, setClassifiedProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [error , setError] = useState(false);
        const [toastMessageBody , setToatMessageBody] = useState("");
        const [message , setMessage] = useState(false);
const categories =[
      {id:7,cat_name:"Lipliner",cat_class:"lip_liner",cat_image:lipliner},
      {id:8,cat_name:"Lipstick",cat_class:"lipstick",cat_image:lipstick},
      {id:9,cat_name:"Mascara",cat_class:"mascara",cat_image:mascara},
      {id:10,cat_name:"Nail Polish",cat_class:"nail_polish",cat_image:nailPolish},
  ]
useEffect(() => {
        if (products && products.length > 0) {
          const filteredData = products.filter(p => p.price && p.price !== "0.0" && p.price !== null && p.brand !=="" && p.brand!==null
            && p.stock !==0);
          setAllProducts(filteredData);
          
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
useEffect(() => {
          if (allproducts.length > 0) {
              get_validate_product(allproducts.filter(item => item.brand).slice(400, 460));
          }
  }, [searchParams, allproducts]); 
  async function get_validate_product(products_List){
  setIsLoading(true);
  setError(false);
  function check_Image(product){
      return new Promise((resolve)=>{
          const img = new Image();
          img.src = product.api_featured_image;
          img.onload = ()=>resolve(product)
          img.onerror = ()=>resolve(null)
      })
  }
  const results = await Promise.all(products_List.map((p)=>check_Image(p)))
  const validate_result = results.filter((p)=>p!==null)
  if(validate_result.length === 0){
    setError(true)
  }
  else{
    setClassifiedProducts(validate_result)
  }
  setIsLoading(false)
}
function get_MakeUp_Category(cat) {
  const brand = searchParams.get('brand') || "1";
    navigate(`/products?category=${cat}&brand=${brand}`);
}
  async function toggleWishList(pID){
  if(!isAuth){
    navigate("/login")
  }
  else{
    const currentlyLoved = userWishList.includes(pID);
    if(!currentlyLoved){
      const { error } = await supabase
      .from('wishlist') 
      .insert([{ product_Id: pID }]);
      if(error){
        setMessage(true)
        setToatMessageBody("Oops! Something went wrong while saving your favorite. Please try again in a moment!");
        setTimeout(()=>{setMessage(false);setToatMessageBody("")},2000)
      }
      else{
        setMessage(true)
         dispatch(addToWishlistRedux(pID))
        setToatMessageBody("Added to your wishlist 🤍");
        setTimeout(()=>{setMessage(false);setToatMessageBody("")},2000)
      }
    }
    else{
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
  }
}
function go_to_product(id){
  const new_id=btoa(id);
  navigate(`/one-product/${new_id}`);
}
  return (
    <div className="flex flex-col px-0 md:px-6 lg:px-6  gap-8">
      { message&&
        <div className="toast toast-end ">
                <div className="alert alert-info bg-light-secondary-700 text-light-secondary-50 font-bold p-5">
                    <span>{toastMessageBody}</span>
                </div>
            </div>
        }
      {/*Upper part */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 items-center w-full ">
        <div className="w-[100%] lg:w-[30%] flex flex-col gap-3 px-4 md:px-0 text-center lg:text-start items-center lg:items-start">
          <h1
            className="text-light-secondary-900 dark:text-dark-secondary-500
            font-playfair font-bold text-40 lg:text-48 "
          >
            Glow Beyond Limits
          </h1>
          <p className="font-opensans text-16 text-light-secondary-600 dark:text-dark-secondary-300">
            Elevate your beauty ritual with FemmeFlair. Discover premium
            essentials designed to celebrate your unique glow and redefine your
            elegance."
          </p>
          <button
            type="submit"
            className="justify-center items-center rounded-2xl border-light-secondary-50 mt-2
               dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800 dark:hover:border-dark-secondary-700
             bg-light-secondary-400 border-[2px] h-[50px] w-[60%] md:w-[50%] lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
              text-light-primary-400 font-playfair text-20 font-bold login_btn dark:disabled:bg-light-neutral-600
               dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
               disabled:bg-light-neutral-600"
            onClick={() => {
              navigate("/products");
            }}
          >
            Shop Now
          </button>
        </div>
        <div className="w-[100%] lg:w-[70%] sm:flex-row flex-col flex gap-4">
          <div className="flex-1 flex justify-center ">
            <div
              className="w-[100%] lg:w-[70%]  rounded-t-full h-[450px] sm:h-[350px] flex justify-center items-end "
              style={{ backgroundImage: `url(${backGround})` }}
            >
              <img
                className=" w-auto h-full "
                src={modelImage}
                alt="Beauty model showcasing femme flair makeup"
              ></img>
            </div>
          </div>
          <div className="flex-1  justify-end flex flex-col gap-3 px-4 md:px-0 text-center md:text-start items-center md:items-start">
            <div className=" flex justify-center  gap-3 mb-5 lg:mb-0">
              <div
                className="flex items-center justify-center  
                  xl:w-[70px] xl:h-[70px] xl:rounded-2xl xl:text-28 xl:p-2
                  lg:w-[60px] lg:h-[60px] lg:rounded-xl  lg:text-24 lg:p-2
                  md:w-[70px] md:h-[70px] md:rounded-2xl  md:text-28 text-18 md:p-4
                  w-[60px] h-[60px] rounded-2xl  text-20  p-4
                  dark:bg-dark-secondary-800 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                +50
              </div>
              <div className="flex flex-col ">
                <h5
                  className=" text-start font-bold font-playfair
                    text-light-secondary-900 
                    dark:text-dark-secondary-300 
                    xl:text-28  lg:text-20 md:text-24 text-20"
                >
                  Product
                </h5>
                <p
                  className=" font-opensans lg:w-[90%] text-start text-12
                    dark:text-dark-secondary-500 
                  text-light-secondary-600  "
                >
                  Transform your makeups routine with our innovative solutions.
                </p>
              </div>
            </div>
            <div className=" flex justify-center gap-3">
              <div
                className="flex items-center justify-center  
                  xl:w-[70px] xl:h-[70px] xl:rounded-2xl xl:text-28 xl:p-2
                  lg:w-[60px] lg:h-[60px] lg:rounded-xl  lg:text-24 lg:p-2
                  md:w-[70px] md:h-[70px] md:rounded-2xl  md:text-28 text-18 md:p-4
                  w-[60px] h-[60px] rounded-2xl  text-20  p-4
                  dark:bg-dark-secondary-800 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                +1K
              </div>
              <div className="flex flex-col">
                <h5
                  className="text-start font-bold font-playfair
                    text-light-secondary-900 
                    dark:text-dark-secondary-300 
                    xl:text-28  lg:text-20 md:text-24 text-20"
                >
                  Users
                </h5>
                <p
                  className="font-opensans lg:w-[90%] text-start text-12
                    dark:text-dark-secondary-500 
                  text-light-secondary-600  "
                >
                  Transform your makeup routine with our innovative solutions.
                </p>
              </div>
            </div>
            <div className=" flex justify-center gap-3">
              <div
                className="flex items-center justify-center  
                  xl:w-[70px] xl:h-[70px] xl:rounded-2xl xl:text-28 xl:p-2
                  lg:w-[60px] lg:h-[60px] lg:rounded-xl  lg:text-24 lg:p-2
                  md:w-[70px] md:h-[70px] md:rounded-2xl  md:text-28 text-18 md:p-4
                  w-[60px] h-[60px] rounded-2xl  text-20  p-4
                  dark:bg-dark-secondary-800 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                24/7
              </div>
              <div className="flex flex-col">
                <h5
                  className="text-start font-bold font-playfair
                    text-light-secondary-900 
                    dark:text-dark-secondary-300 
                    xl:text-28  lg:text-20 md:text-24 text-20"
                >
                  Online Support
                </h5>
                <p
                  className="font-opensans lg:w-[90%] text-start text-12
                    dark:text-dark-secondary-500 
                  text-light-secondary-600  "
                >
                  Transform your makeup routine with our innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*cards */}
      <div className="md:px-0 px-4 w-full rounded-r-2xl rounded-l-2xl grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 lg:gap-16">
        <div className="flex border-light-neutral-100 rounded-xl border p-4 hover:shadow-xl gap-8  md:gap-2 lg:gap-8 
        dark:border-dark-secondary-700 transition-all ease-in-out duration-300">
          <div className="text-dark-secondary-700 text-20"><i className="fa-solid fa-truck-fast"></i></div>
          <div className="flex flex-col">
              <p className="text-light-secondary-800 font-bold text-20 dark:text-dark-secondary-300">Free Shipping</p>
              <p className="text-light-secondary-600  text-16 dark:text-dark-secondary-500">On orders over 10k EGP</p>
          </div>
        </div>
        <div className="transition-all ease-in-out duration-300 flex border-light-neutral-100 rounded-xl border p-4 hover:shadow-xl gap-8  md:gap-2 lg:gap-8 
        dark:border-dark-secondary-700">
          <div className="text-dark-secondary-700 text-20"><i className="fa-solid fa-shield-halved"></i></div>
          <div className="flex flex-col">
              <p className="text-light-secondary-800 font-bold text-20 dark:text-dark-secondary-300">Secure Payment</p>
              <p className="text-light-secondary-600  text-16 dark:text-dark-secondary-500">100% Secure transaction</p>
          </div>
        </div>
        <div className="transition-all ease-in-out duration-300 flex border-light-neutral-100 rounded-xl border p-4 hover:shadow-xl gap-8  md:gap-2 lg:gap-8 
        dark:border-dark-secondary-700">
          <div className="text-dark-secondary-700 text-20"><i className="fa-solid fa-crown"></i></div>
          <div className="flex flex-col">
              <p className="text-light-secondary-800 font-bold text-20 dark:text-dark-secondary-300">20% Discount</p>
              <p className="text-light-secondary-600  text-16 dark:text-dark-secondary-500">On first order when login</p>
          </div>
        </div>
      </div>
      {/*products category */}
      <div className="md:mt-16 mt-10 flex flex-col gap-5 px-4 md:px-0 ">
        <h2 className="relative text-light-secondary-900 dark:text-dark-secondary-500 font-playfair font-bold text-32 lg:text-[36px] 
               before:content-[''] before:block before:w-2 before:h-14
               before:bg-dark-secondary-700 before:mb-3 
              before:absolute  before:-left-3 ml-3">
  Shop by Category
</h2>
        {/*Categories in labtop*/}
        <div className="hidden md:flex gap-5 md:gap-12 justify-center rounded-r-2xl rounded-l-2xl border
         border-light-neutral-100 dark:border-dark-secondary-700 p-6">
          
          { categories.map((cat)=>{
            return(
               <div key= {cat.id} className="flex gap-2 items-center flex-col lg:flex-row " >
                <div onClick={()=>get_MakeUp_Category(`${cat.cat_class}`)}
                className=" cursor-pointer flex justify-center items-center md:h-16 md:w-16 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
                  <img src={cat.cat_image} alt="blush" className="w-[70%] h-[70%]"/>
                </div>
                <div onClick={()=>get_MakeUp_Category(`${cat.cat_class}`)}>
                  <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 cursor-pointer
                  lg:text-20 xl:text-24 font-bold">{cat.cat_name}</p>
                </div>
                </div>
            )
          })
          }
          <button
            type="submit"
            className="justify-center items-center rounded-2xl border-light-secondary-50 mt-2
               dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800 dark:hover:border-dark-secondary-700
             bg-light-secondary-400 border-[2px] h-[50px] w-[30%] lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
              text-light-primary-400 font-playfair text-20 font-bold login_btn dark:disabled:bg-light-neutral-600
               dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
               disabled:bg-light-neutral-600 login-btn"
            onClick={() => {
              navigate("/products");
            }}
          >
            All Products
          </button>
        </div>
        {/*Search icons in  mobile */}
        <div className="carousel md:hidden flex gap-8  p-4  ">
          {/*categories */}
          {
            categories.map((cat)=>{
              return(
              <div key={cat.id} className="carousel-item ">
                  <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category(`${cat.cat_class}`)}>
                    <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100
                     dark:bg-dark-secondary-500 ">
                      <img src={cat.cat_image} alt="blush" className="w-[70%] h-[70%]"/>
                    </div>
                    <div>
                      <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20 
                       font-bold">{cat.cat_name}</p>
                    </div>
                  </div>
              </div>
              )
            })
          }
          <div className="carousel-item ">
            <button
            type="submit"
            className="justify-center items-center rounded-2xl border-light-secondary-50 mt-2
               dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800 dark:hover:border-dark-secondary-700
             bg-light-secondary-400 border-[2px] h-[60px] p-4 lg:mb-0 mb-3 hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
              text-light-primary-400 font-playfair text-20 font-bold login_btn dark:disabled:bg-light-neutral-600
               dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
               disabled:bg-light-neutral-600 login-btn"
            onClick={() => {
              navigate("/products");
            }}
          >
            All Products
          </button>
          </div>
        </div>
      </div>
      {/*FeaturedProducts */}
        <h2 className="relative text-light-secondary-900 dark:text-dark-secondary-500
            font-playfair font-bold text-32 lg:text-[36px] 
            before:content-[''] before:block before:w-2 before:h-14
               before:bg-dark-secondary-700 before:mb-3  mt-5 md:mt-10 lg:mt-12
              before:absolute  before:-left-3 ml-3">Featured products</h2>
             {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 w-full">
          <div className="w-12 h-12 border-4 border-light-secondary-100 border-t-light-secondary-800 dark:border-dark-secondary-500 dark:border-t-dark-neutral-800 rounded-full animate-spin"></div>
          <p className="mt-4 font-playfair text-lg text-light-secondary-800 dark:text-dark-secondary-300 animate-pulse">
            Preparing your beauty shelf...
          </p>
        </div> ):
          !error?
            (<div className="mb-16 px-3 md:px-0 w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 place-items-stretch mt-5 md:mt-8 lg:mt-8">
              {
                ClassifiedProducts.map((product,index)=>{
                  return(
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
                          dark:text-dark-secondary-800 text-light-secondary-400
                          ${userWishList.includes(product.id) && isAuth?`fa-solid`:`fa-regular`}`} onClick={()=>{toggleWishList(product.id)}}></i>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>)
            :
            (<div className="flex flex-col items-center justify-center py-20 px-4 text-center">
              <div className="bg-pink-50 p-6 rounded-full mb-6">
              <svg 
                className="w-16 h-16 text-pink-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-dark-secondary-500 mb-2">
              Oops! Beauty Sleep Mode
            </h2>

            <p className="text-gray-500 max-w-md leading-relaxed dark:text-dark-secondary-300">
              It looks like our beauty shelf is empty for this brand. 
              Don't worry, your perfect glow is just a click away in our other collections!
            </p>
          </div>)
       }
      {/*why  shop with us*/}  
      <div className=" flex  justify-between flex-col lg:flex-row gap-10 md:gap-16   ">
        <div className="flex px-6 lg:px-10 py-20 w-[100%] lg:w-[50%] justify-center lg:text-start text-center
        md:rounded-r-3xl md:rounded-l-3xl text-light-neutral-50 flex-col gap-4" style={{ backgroundImage: `url(${backGround})` }}>
          <p className='font-playfair font-bold md:text-40 text-32'>Why Shop with Us?</p>
          <p className='font-opensans md:text-16 text-14  '>
            Experience exceptional service with every purchase. We're here to make your makeup journey smooth and satisfying.</p>
        </div>
         <div className="w-[100%] lg:w-[50%] grid md:grid-cols-2 grid-cols-1 gap-4 px-4">
          <div className="p-5 flex flex-col rounded-r-3xl rounded-l-2xl border border-light-neutral-100 gap-4
          hover:shadow-lg transition-all ease-in-out duration-300 dark:border-dark-secondary-700">
            <div className="flex gap-4 items-center">
               <div
                className="flex items-center justify-center  
                  w-[50px] h-[50px] md:rounded-2xl  md:p-4
                   rounded-2xl  text-20 p-4
                  dark:bg-dark-secondary-800 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <p className="font-bold text-light-secondary-900 font-playfair text-20 dark:text-dark-secondary-500">
                Free Shipping Daily</p>
            </div>
            <p className="text-14 font-opensans text-light-secondary-600 dark:text-dark-secondary-300">
              Enjoy fast, free shipping on all orders, every day. Get your favorite products delivered straight 
              to your door without extra costs.</p>
          </div>
          <div className="p-5 flex flex-col rounded-r-3xl rounded-l-2xl border border-light-neutral-100 gap-4
          hover:shadow-lg transition-all ease-in-out duration-300 dark:border-dark-secondary-700">
            <div className="flex gap-4 items-center">
               <div
                className="flex items-center justify-center  
                   md:rounded-2xl  md:p-4
                  w-[50px] h-[50px] rounded-2xl  text-20 p-4
                  dark:bg-dark-secondary-800 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                <i className="fa-solid fa-headset"></i>
              </div>
              <p className="font-bold text-light-secondary-900 font-playfair text-20 dark:text-dark-secondary-500">
                24/7 Online Support</p>
            </div>
            <p className="text-14 font-opensans text-light-secondary-600 dark:text-dark-secondary-300">
             Our expert team is available around the clock to answer your questions and offer personalized skincare advice. We're here whenever you need us.</p>
          </div>
          <div className="p-5 flex flex-col rounded-r-3xl rounded-l-2xl border border-light-neutral-100 gap-4
          hover:shadow-lg transition-all ease-in-out duration-300 dark:border-dark-secondary-700">
            <div className="flex gap-4 items-center">
               <div
                className="flex items-center justify-center  
                   md:rounded-2xl  md:p-4
                  w-[50px] h-[50px] rounded-2xl  text-20 p-4
                  dark:bg-dark-secondary-800 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                <i className="fa-solid fa-heart"></i>
              </div>
              <p className="font-bold text-light-secondary-900 font-playfair text-20 dark:text-dark-secondary-500">
                Your Satisfaction</p>
            </div>
            <p className="text-14 font-opensans text-light-secondary-600 dark:text-dark-secondary-300">
              Not in love with your purchase?  
              We offer hassle-free returns to ensure you’re completely satisfied. Your happiness is our top priority.</p>
          </div>
          <div className="p-5 flex flex-col rounded-r-3xl rounded-l-2xl border border-light-neutral-100 gap-4
          hover:shadow-lg transition-all ease-in-out duration-300 dark:border-dark-secondary-700">
            <div className="flex gap-4 items-center">
               <div
                className="flex items-center justify-center  
                   md:rounded-2xl  md:p-4
                  w-[50px] h-[50px] rounded-2xl  text-20 p-4
                  dark:bg-dark-secondary-800 dark:text-dark-secondary-300
                  bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
              >
                <i className="fa-solid fa-gem"></i>
              </div>
              <p className="font-bold text-light-secondary-900 font-playfair text-20 dark:text-dark-secondary-500">
                Exclusive Rewards</p>
            </div>
            <p className="text-14 font-opensans text-light-secondary-600 dark:text-dark-secondary-300">
              Join our loyalty program to earn points with every purchase and unlock special perks. Get rewarded for taking care of your skin.</p>
          </div>
         </div>
      </div>
      {/*Answers */}
        <div className="mt-16 md:mt-18 lg:mt-24 flex flex-col justify-between gap-3 lg:gap-0 lg:flex-row ">
          {/*right side */}
          <div className="flex flex-col text-center px-4 lg:px-0 w-[100%] lg:w-[45%] gap-6 items-center lg:items-start">
              <div>
                <h3 className="text-center lg:text-start
                text-light-secondary-900 dark:text-dark-secondary-300 font-playfair font-bold text-[25px] md:text-48 mb-3">
                Need Answers? <br/>We've Got You Covered!
              </h3>
              </div>
             <div className="text-center lg:text-start">
               <p className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-14 md:text-16 lg:w-[85%]">
               Find answers to common questions about our products, shipping, returns, and more. We've compiled everything you need
                to know for a seamless shopping experience. If you still have questions, feel free to contact us—we're here to help!
              </p>
             </div>
               <div>
                <button className="login_btn mb-1  justify-center items-center rounded-full border-light-secondary-50
                 bg-light-secondary-400 dark:bg-dark-secondary-800 dark:text-dark-primary-500 dark:border-dark-secondary-800
                border-[2px] lg:h-[65px] lg:w-[180px] hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                  text-light-primary-400  font-bold font-playfair lg:text-20 px-5
                  text-16 h-[80px] w-[160px]" onClick={()=>{navigate('/contact-us')}}>Contact Us</button>
               </div>
          </div>
          {/*left side */}
          <div className="mb-16 md:mb-18 lg:mb-32 w-[100%] lg:w-[45%] flex flex-col gap-3 px-4 ">
            <div className="collapse collapse-plus border-[3px]  border-gray-100
              dark:border-2 dark:border-dark-neutral-400 mb-2 ">
              <input type="checkbox" className="peer" /> 
              <div className="collapse-title font-bold text-16 md:text-20 bg-transparent text-light-secondary-900
              dark:text-dark-secondary-300 font-playfair
              dark:peer-checked:bg-dark-primary-500 dark:peer-checked:text-dark-neutral-800
              peer-checked:bg-light-primary-400 peer-checked:text-light-neutral-50">
                What is your return policy?
              </div>
              <div className="collapse-content font-opensans text-14 lg:text-16 text-light-neutral-50 bg-light-primary-400
              dark:bg-dark-primary-500 dark:text-dark-neutral-800">
                <p>We offer hassle-free returns within 30 days of purchase. If you're not completely 
                  satisfied with your product, simply contact our support team to initiate the return process.
                  We'll guide you through the steps to ensure a smooth experience.</p>
              </div>
            </div>
            <div className="collapse collapse-plus border-[3px]  border-gray-100
            dark:border-2 dark:border-dark-neutral-400 mb-2">
            <input type="checkbox" className="peer" /> 
            <div className="collapse-title font-bold text-16 md:text-20 bg-transparent text-light-secondary-900
            dark:text-dark-secondary-300 font-playfair
            dark:peer-checked:bg-dark-primary-500 dark:peer-checked:text-dark-neutral-800
            peer-checked:bg-light-primary-400 peer-checked:text-light-neutral-50">
             Are your products cruelty-free?
            </div>
            <div className="collapse-content font-opensans text-14 lg:text-16 text-light-neutral-50 bg-light-primary-400
            dark:bg-dark-primary-500 dark:text-dark-neutral-800">
              <p>Absolutely! At FemmeFlair, we believe in beauty without compromise. All of our products are 100% cruelty-free and are
                 never tested on animals. We carefully partner with suppliers who uphold these same ethical standards.</p>
            </div>
            </div>
            <div className="collapse collapse-plus border-[3px]  border-gray-100
              dark:border-2 dark:border-dark-neutral-400 mb-2">
              <input type="checkbox" className="peer" /> 
              <div className="collapse-title font-bold text-16 md:text-20 bg-transparent text-light-secondary-900
              dark:text-dark-secondary-300 font-playfair
              dark:peer-checked:bg-dark-primary-500 dark:peer-checked:text-dark-neutral-800
              peer-checked:bg-light-primary-400 peer-checked:text-light-neutral-50">
                How can I track my order?
              </div>
              <div className="collapse-content font-opensans text-14 lg:text-16 text-light-neutral-50 bg-light-primary-400
              dark:bg-dark-primary-500 dark:text-dark-neutral-800">
                <p>Once your order ships, you will receive a confirmation email with a tracking number and a link to
                   monitor your delivery. You can also track your orderstatus anytime directly from the 'My Account' 
                   section on our website.</p>
              </div>
            </div>
            <div className="collapse collapse-plus border-[3px]  border-gray-100
              dark:border-2 dark:border-dark-neutral-400 mb-2">
              <input type="checkbox" className="peer" /> 
              <div className="collapse-title font-bold text-16 md:text-20 bg-transparent text-light-secondary-900
              dark:text-dark-secondary-300 font-playfair
              dark:peer-checked:bg-dark-primary-500 dark:peer-checked:text-dark-neutral-800
              peer-checked:bg-light-primary-400 peer-checked:text-light-neutral-50">
                Do you offer international shipping?
              </div>
              <div className="collapse-content font-opensans text-14 lg:text-16 text-light-neutral-50 bg-light-primary-400
              dark:bg-dark-primary-500 dark:text-dark-neutral-800">
                <p>Yes, we ship our beauty products worldwide! Shipping costs and delivery times vary depending on your location. 
                  You can view the exact shipping rates for your country at checkout before finalizing your order.</p>
              </div>
            </div>
            <div className="collapse collapse-plus border-[3px]  border-gray-100
              dark:border-2 dark:border-dark-neutral-400 mb-2">
              <input type="checkbox" className="peer" /> 
              <div className="collapse-title font-bold text-16 md:text-20 bg-transparent text-light-secondary-900
              dark:text-dark-secondary-300 font-playfair
              dark:peer-checked:bg-dark-primary-500 dark:peer-checked:text-dark-neutral-800
              peer-checked:bg-light-primary-400 peer-checked:text-light-neutral-50">
                How do I join the loyalty program?
              </div>
              <div className="collapse-content font-opensans text-14 lg:text-16 text-light-neutral-50 bg-light-primary-400
              dark:bg-dark-primary-500 dark:text-dark-neutral-800">
                <p>Joining is easy and rewarding! Simply create an account on our website, and you'll be automatically
                   enrolled in our loyalty program. You'll earn points with every purchase,
                   which can be redeemed for exclusive discounts and special gifts.</p>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  );
}
