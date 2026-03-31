import React from "react";
import { useParams , useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { products } from "../../data/mock_data";
import {useDispatch , useSelector} from 'react-redux'
import { addProduct } from "../../store/cartSlice";
import supabase from '../../supabaseClient'
import {addToWishlistRedux,removeFromWishlistRedux} from '../../store/authSlice'
export default function One_product() {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [count, setCount] = useState(1);
  const[loved , setLoved] = useState(false);
  const [toastMessageBody , setToatMessageBody] = useState("");
  const [message , setMessage] = useState(false);
  const isAuth = useSelector(store=>store.auth.isAuthenticated);
  const userWishList = useSelector(store=>store.auth.wishList);
  function incrementCount(){
    setCount(prev=>{
        if(prev<product.stock){return prev+1}
        else{return prev}
    })
  }
  function decrementCount(){
    setCount(prev=>{
        if(prev>1){return prev-1}
        else{return prev}
    })
  }
  useEffect(() => {
    if (id && id != null) {
      const new_id = atob(id);
      if(!isAuth  && new_id){
            setLoved(false);
        }
        else{
            if(userWishList.includes(Number(new_id))){setLoved(true)}
        }
      (async () => {
        setLoading(true);
        const data = await new Promise((resolve) => {
          const singleProduct = products.find((p) => String(p.id) === new_id);
          resolve(singleProduct);
        });
      setProduct(data);
      if (data?.product_colors?.length > 0) {
        const firstColor = data.product_colors[0];
        setSelectedColor({
          color: firstColor.colour_name,
          hex_value: firstColor.hex_value,
        });
      }
      setLoading(false);
      })();
      
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  function add_to_cart(pID) {
    dispatch(addProduct({
    id: pID, 
    selectedColor: selectedColor, 
    numberOfProduct: count
  }));
  setMessage(true);
  setToatMessageBody("Added to your cart 🤍");
        setTimeout(()=>{
             setMessage(false);
        setToatMessageBody("");
        },2000)
  }
async function toggleWishlist(pID) {
  if (!isAuth) return navigate("/login");

  if (!loved) {
    const { error } = await supabase.from('wishlist').insert([{ product_Id: pID }]);
    if (!error) { 
        setLoved(true);
        setMessage(true);
        dispatch(addToWishlistRedux(pID))
        setToatMessageBody("Added to your wishlist 🤍");
        setTimeout(()=>{
             setMessage(false);
        setToatMessageBody("");
        },2000)
    }
  } else {
    const { error } = await supabase.from('wishlist').delete().eq("product_Id", pID);
     if (!error) { setLoved(false);
        setMessage(true);
        dispatch(removeFromWishlistRedux(pID))
        setToatMessageBody("Removed from your wishlist 🌸");
        setTimeout(()=>{
             setMessage(false);
        setToatMessageBody("");
        },2000)
    }
  }
}
  return (
    <>
      <div className="flex items-stretch px-5 md:px-12 lg:px-6 mt-10 mb-10 ">
        {/*wishlist Message */}
       { message&&
        <div className="z-10 toast toast-end w-[40%] text-center">
                <div className=" alert alert-info text-center flex items-center justify-center text-14  md:text-[18px] bg-light-secondary-700 text-light-secondary-50 font-bold p-5">
                    <span>{toastMessageBody}</span>
                </div>
            </div>
        }

        {!loading && product ? (
          <div className="w-full flex flex-col md:flex-row justify-between  ">
            {/*product image  */}
            <div className=" relative w-[100%] md:w-[40%] h-96 flex justify-center items-center">
              <img
                src={product.api_featured_image}
                alt={product.name}
                className="h-full w-auto object-contain"
              />
              <button className="absolute top-4 right-4 hover:scale-110 ease-in-out duration-200 transition-all"
              onClick={()=>{toggleWishlist(product.id )}}>
                    <i className={` fa-heart font-bold text-[30px] md:text-[40px] cursor-pointer 
                         dark:text-dark-secondary-800 text-light-secondary-400 
                         hover:text-light-secondary-500 dark:hover:text-dark-secondary-700
                         ${loved && isAuth?`fa-solid`:`fa-regular`}`}></i>
              </button>
            </div>
            {/* product data*/}
            <div className="mt-8 w-[100%] md:w-[50%] flex flex-col gap-4 ">
              {/*Product info */}
              <div className="flex gap-4 flex-col ">
                {/**name -brand - category */}
                <div className="flex gap-4 items-center">
                  {/*brand */}
                  <div className="rounded-lg bg-light-primary-700 dark:bg-dark-secondary-300 py-2 px-4 text-center w-fit">
                    <h2
                      className=" text-sm md:text-lg  font-playfair uppercase font-bold text-light-secondary-200
                                    dark:text-dark-neutral-400 "
                    >
                      {product.brand}
                    </h2>
                  </div>
                  {product.category !== product.product_type && (
                    <p
                      className=" text-20 md:text-24 font-bold font-playfair first-letter:uppercase
                                text-light-secondary-500 dark:text-dark-secondary-700"
                    >
                      {product.product_type}
                    </p>
                  )}
                  {/*name & category */}
                  {product.category && (
                    <p
                      className=" text-20 md:text-24 font-bold font-playfair first-letter:uppercase
                                text-light-secondary-500 dark:text-dark-secondary-700"
                    >
                      {product.category}
                    </p>
                  )}
                </div>
                {/*descripton */}
                <p
                  className="text-light-secondary-700 text-[16px] md:text-[20px] font-playfair first-letter:uppercase
                        dark:text-dark-secondary-500"
                >
                  {product.description.split("\n")[0].split(":")[0]}
                </p>
                <div className="flex mt-1 gap-3 items-center">
                  <p
                    className="text-light-primary-700 dark:text-dark-secondary-700  font-extrabold  text-24 md:text-28
                            font-playfair"
                  >
                    Price:
                  </p>
                  <p
                    className="text-light-secondary-900 dark:text-dark-secondary-300 font-extrabold text-24 md:text-28
                            font-playfair "
                  >
                    {(product.price * 50).toFixed(0)} EGP
                  </p>
                </div>
              </div>
              {/* shades */}
              <div
                className="grid grid-cols-1 gap-6 w-[100%] border-t-[0.5px] pt-4 dark:border-dark-secondary-800 
              border-light-neutral-100"
              >
                {product.product_colors &&
                  product.product_type !== "eyeshadow" &&
                  product.product_colors.length !== 0 &&
                  (() => {
                    return (
                      <>
                        <p className="text-light-primary-800 text-24 font-bold font-playfair dark:text-dark-secondary-300 uppercase tracking-wide mb-2">
                          Product Shades
                        </p>
                        <div
                          className="flex flex-col md:flex-row md:items-center gap-4 bg-light-neutral-50 dark:bg-dark-neutral-800 p-4 rounded-xl
                         border-[2px] border-gray-100 dark:border-dark-neutral-700"
                        >
                          <div className="md:w-1/4 text-center">
                            <p className="text-14 font-semibold text-light-neutral-400 dark:text-dark-neutral-400">
                              {product.product_colors.length} Colors
                            </p>
                          </div>
                          <div className="flex flex-row justify-center md:justify-normal flex-wrap gap-3 md:w-3/4">
                            {product.product_colors.map((item, idx) => (
                              <div
                                key={`single-${idx}`}
                                className="flex flex-col items-center group"
                              >
                                {product.product_colors.length > 1 ? (
                                  <div
                                    onClick={() => {
                                      setSelectedColor({
                                        color: item.colour_name,
                                        hex_value: item.hex_value,
                                      });
                                    }}
                                    className={`cursor-pointer h-10 w-10 rounded-full transition-all duration-300 shadow-md border-2 
                                    ${
                                      selectedColor?.color === item.colour_name
                                        ? "scale-125 border-light-primary-200 dark:border-dark-secondary-500 "
                                        : "border-white hover:scale-110"
                                    }`}
                                    style={{ backgroundColor: item.hex_value }}
                                    title={item.name}
                                  ></div>
                                ) : (
                                  <div
                                    className={`cursor-pointer h-10 w-10 rounded-full transition-all duration-300 shadow-md border-2 `}
                                    style={{ backgroundColor: item.hex_value }}
                                    title={item.name}
                                  ></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
              </div>
             {/*counter & addButton  */}
              {product.stock !== 0 ?
                <div className="flex justify-between">
                    {/*counter */}
                    <div className="flex text-[18px] text-light-neutral-50 bg-light-neutral-300 w-[30%] md:w-[30%] lg:w-[20%] rounded-full overflow-hidden ">
                    <div className="flex-1 flex items-center justify-center border-r-[0.25px] dark:border-dark-neutral-800
                    border-light-neutral-50 cursor-pointer hover:bg-light-secondary-600 dark:hover:bg-dark-secondary-700"
                    onClick={()=>{decrementCount()}}>
                        -
                    </div>
                    <div className="flex-1 border-r-[0.25px] flex items-center justify-center dark:border-dark-neutral-800 border-light-neutral-50">
                        {count}
                    </div>
                    <div className="flex-1 flex items-center justify-center cursor-pointer
                    hover:bg-light-secondary-600 dark:hover:bg-dark-secondary-700"
                    onClick={()=>{incrementCount()}}>+</div>
                    </div>
                    {/*button add to cart */}
                    <button
                    className=" flex justify-center items-center rounded-full border-light-secondary-50
                            dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                            dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px] w-[50%] py-2 
                            hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                            text-light-primary-400 font-playfair text-[16px] md:text-20 font-bold
                            disabled:cursor-not-allowed disabled:hover:bg-light-secondary-400 dark:disabled:hover:bg-dark-secondary-800
                            dark:disabled:hover:border-dark-secondary-800"
                    onClick={() => {
                    add_to_cart(product.id);
                    }}
                >
                    Add to <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
                :
                <div className="w-[100%] h-11 flex justify-center items-center bg-red-900 text-white text-16 md:text-20">
                    OUT OF STOCK
                </div>
              }
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 w-full">
            <div className="w-12 h-12 border-4 border-light-secondary-100 border-t-light-secondary-800 dark:border-dark-secondary-500 dark:border-t-dark-neutral-800 rounded-full animate-spin"></div>
            <p className="mt-4 font-playfair text-lg text-light-secondary-800 dark:text-dark-secondary-300 animate-pulse">
              Preparing the product...
            </p>
          </div>
        )}
      </div>
    </>
  );
}
