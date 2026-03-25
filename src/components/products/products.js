import React from "react";
import image from "../../assets/Group.webp";
import { useEffect, useState } from "react";
import Select from 'react-select'
import blush from '../../assets/blush-on.png'
import bronzer from '../../assets/bronzer.png'
import eyebrow from '../../assets/eyebrow.png'
import eyeliner from '../../assets/eyeliner.png'
import eyeshadow from '../../assets/eyeshadow.png'
import foundation from '../../assets/foundation.png'
import lipliner from '../../assets/lipliner.png'
import lipstick from '../../assets/lipstick.png'
import mascara from '../../assets/mascara.png'
import nailPolish from '../../assets/nail-polish.png'
import {products} from '../../data/mock_data.js'
export default function Products() {
  const [brands, setBrands] = useState(); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [allproducts , setAllProducts] = useState([]);
  const [ ClassifiedProducts, setClassifiedProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error , setError] = useState(false);
  const [ , setCounter] =useState();
  
useEffect(() => {
    if (products && products.length > 0) {
      setClassifiedProducts(products.filter(item => item.brand !== null && item.brand !== "").slice(150,250)); 
      setAllProducts(products.filter(item => item.brand !== null && item.brand !== ""));  
      setCounter(200)
      setIsLoading(true);
      setTimeout(()=>{
        setIsLoading(false);
      },2000);
      const uniqueBrands = [...new Set(products.map(item => item.brand))]
        .filter(brand => brand !== null && brand !== "")
        .sort();
      const options = uniqueBrands.map(brand => ({
        value: brand,
        label: brand.charAt(0).toUpperCase() + brand.slice(1) 
      }));
      setBrands([{value:"1" , label:"All Brands"}, ...options]);
    }
}, []); 
const customStyles = {
    container: (base) => ({
    ...base,
    outline: 'none',
  }),

  control: (base, state) => ({
    ...base,
    backgroundColor: 'transparent',
    borderRadius: '9999px',
    borderWidth: '2px',
    // اللون بتاعك الموحد
    borderColor: state.isFocused 
      ? (document.documentElement.classList.contains('dark') ? '#a08298' : '#786171')
      : (document.documentElement.classList.contains('dark') ? '#4F404B' : '#c9a3be'),
    
    // إلغاء الظلال تماماً
    boxShadow: 'none', 
    outline: 'none', 

    paddingTop: '2px',
    paddingBottom: '2px',
    paddingLeft: '20px',
    transition: 'all 0.3s ease',

    '&:hover': {
      borderColor: 'none',
    },
  }),

    placeholder: (base) => ({
      ...base,
      marginLeft: '26px', // مساحة لأيقونة السيرش
      color: document.documentElement.classList.contains('dark') ? '#D8C1D5' : '#a08298',
      fontSize: '14px',
      fontFamily: 'Open Sans, sans-serif',
      '@media (min-width: 1024px)': {
        fontSize: '16px',
      }
    }),

    input: (base) => ({
      ...base,
      marginLeft: '26px',
      color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#161222',
      backgroundColor: 'transparent',
    }),

    singleValue: (base) => ({
      ...base,
      marginLeft: '26px',
      color: document.documentElement.classList.contains('dark') ? '#FFFFFF' : '#161222',
    }),

    // إلغاء الـ Hover جوه القائمة (Options)
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#786171' 
        : 'transparent',
      color: state.isSelected ? '#ffffff' : (document.documentElement.classList.contains('dark') ? '#c9a3be' : '#5f4c90'),
      cursor: 'pointer',
      
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: (document.documentElement.classList.contains('dark') ? '#151515' : '#ffffff'),
      borderRadius: '15px',
      border: '2px solid ',
      borderColor:  (document.documentElement.classList.contains('dark') ? '#a08298' : '#786171'),
      overflow: 'hidden',
      zIndex: 50
    }),

    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#a08298',
      '&:hover': { color: '#a08298' }
    })
  
  };
function get_MakeUp_Brand(brand) {
    setError(false)
    setSelectedOption(brand);
    setIsLoading(true);
    if (!brand || brand.value === "1") {
      setClassifiedProducts(allproducts.slice(150,250));
      setCounter(allproducts.length);
    } 
    else {
      const filtered = allproducts.filter((item) => item.brand === brand.value);
      setClassifiedProducts(filtered);
      setCounter(filtered.length)
    }
    setTimeout(()=>{
        setIsLoading(false);
   },3000);
}
function get_MakeUp_Category(category) {
  setIsLoading(true)
  setError(false);
  const filtered = allproducts.filter((item) => item.product_type === category);
  setClassifiedProducts(filtered);
  setCounter(filtered.length)
      setTimeout(()=>{
        setIsLoading(false);
   },3000);
}
  return (
    <>
      <div className="flex flex-col px-0 md:px-12 lg:px-6 items-center">
        {/*Top image */}
        <div
          className="flex flex-col justify-center items-center bg-light-primary-400 bg-cover bg-no-repeat bg-center w-full lg:h-[300px] md:h-[250px] h-[350px] 
                  rounded-none md:rounded-3xl"
          style={{ backgroundImage: `url(${image})` }}
        >
          <h1 className="text-40 md:text-48 lg:text-64 text-center pb-2 font-bold font-playfair dark:text-dark-neutral-800 text-light-neutral-50">
            <i className="!hidden md:!block fa-solid fa-star absolute lg:left-[15%] xl:left-[20%] md:left-[15%] text-yellow-100 text-xl animate-pulse"></i>
            The Beauty Edit
          </h1>
          <p className="w-[80%] md:w-[65%] text-center text-light-secondary-100 font-opensans text-16 dark:text-dark-neutral-600">
            Discover our complete range of makeup essentials. From iconic
            lippies to radiant primers, every product is chosen to make you feel
            like royalty.
            <i className="!hidden md:!block fa-solid fa-star absolute bottom-18 right-[16%] text-lg animate-pulse text-yellow-100"></i>{" "}
            Start creating your dream look today.
          </p>
        </div>
        {/*selection statment */}
        <div className="w-[95%] flex justify-center mt-16 md:mt-18 lg:mt-20">
          <p className="text-[36px] md:text-40 lg:text-48 font-bold font-playfair text-light-secondary-800  dark:text-dark-secondary-500 ">Shop by Category</p>
        </div>
        {/*Search icons in tablet & laptop*/}
        <div className="w-[95%] hidden lg:grid  lg:grid-cols-5 place-items-stretch  gap-x-4 gap-y-6 md:mt-18 lg:mt-20">
          {/*blush */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("blush")}>
            <div className=" flex justify-center items-center md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={blush} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Blush</p>
            </div>
          </div>
           {/*bronzer */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("bronzer")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={bronzer} alt="bronzer" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Bronzer</p>
            </div>
          </div>
          {/*eye-brow */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyebrow")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={eyebrow} alt="eye-brow" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Eyebrow</p>
            </div>
          </div>
          {/*eye-liner */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyeliner")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={eyeliner} alt="eyeliner" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Eyeliner</p>
            </div>
          </div>
          {/*eye-shadow */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyeshadow")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={eyeshadow} alt="eye-shadow" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Eyeshadow</p>
            </div>
          </div>
          {/*foundation */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("foundation")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={foundation} alt="foundation" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfairmd:text-16 lg:text-20 xl:text-24 font-bold">Foundation</p>
            </div>
          </div>
          {/*lipliner */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("lip_liner")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={lipliner} alt="lipliner" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Lipliner</p>
            </div>
          </div>
          {/*lipstick */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("lipstick")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={lipstick} alt="lipstick" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Lipstick</p>
            </div>
          </div>
          {/*mascrara */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("mascara")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={mascara} alt="mascara" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Mascara</p>
            </div>
          </div>
          {/*nail_polish */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("nail_polish")}>
            <div className=" flex justify-center items-center  md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={nailPolish} alt="lipstick" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16 lg:text-20 xl:text-24 font-bold">Nail Polish</p>
            </div>
          </div>
        </div>
        {/*Search icons in  mobile */}
        <div className="carousel w-[90%] mt-14 flex lg:hidden  gap-4 ">
          {/*Blush */}
          <div className="carousel-item w-[30%] md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("blush")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={blush} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Blush</p>
            </div>
          </div>
          </div>
          {/*bronzer */}
          <div className="carousel-item w-[30%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("bronzer")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={bronzer} alt="bronzer" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Bronzer</p>
            </div>
          </div>
          </div>
          {/*eye-brow */}
          <div className="carousel-item w-[30%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyebrow")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={eyebrow} alt="eyebrow" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Eyebrow</p>
            </div>
          </div>
          </div>
          {/*eye-liner */}
          <div className="carousel-item w-[30%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyeliner")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={eyeliner} alt="eyeliner" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Eyeliner</p>
            </div>
          </div>
          </div>
         {/*eye-shadow */}
          <div className="carousel-item w-[35%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyeshadow")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={eyeshadow} alt="eyeshadow" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Eyeshadow</p>
            </div>
          </div>
          </div>
         {/*foundation */}
          <div className="carousel-item w-[35%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("foundation")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={foundation} alt="foundation" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Foundation</p>
            </div>
          </div>
          </div>
          {/*lipliner */}
          <div className="carousel-item w-[30%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("lip_liner")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={lipliner} alt="lipliner" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Lipliner</p>
            </div>
          </div>
          </div>
         {/*lipstick */}
          <div className="carousel-item w-[30%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("lipstick")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={lipstick} alt="lipstick" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Lipstick</p>
            </div>
          </div>
          </div>
          {/*mascara */}
          <div className="carousel-item w-[30%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("mascara")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={mascara} alt="mascara" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Mascara</p>
            </div>
          </div>
          </div>
          {/*nail_polish */}
          <div className="carousel-item w-[35%]  md:w-[20%]">
            <div className="flex flex-col gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("nail_polish")}>
            <div className=" flex justify-center items-center h-14 w-14  rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={nailPolish} alt="nail_polish" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-20  font-bold">Nail Polish</p>
            </div>
          </div>
          </div>

        </div>
        {/*Search tap */}
        <div className="relative w-full flex justify-center items-center mt-14 md:mt-18 lg:mt-20">
          <Select
            className="lg:w-[60%] md:w-[70%] w-[90%]"
            styles={customStyles}
            isSearchable={true} 
            placeholder="Search for a brand..."
            value={selectedOption}
            options={brands}
            onChange={(option)=>get_MakeUp_Brand(option)}
          />
            <span className="absolute left-[12%] md:left-[18%] lg:left-[21%] z-10 cursor-pointer text-light-secondary-600 dark:text-dark-secondary-500 pointer-events-none"> 

              <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
        {/*Products */}
        {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 w-full">
          <div className="w-12 h-12 border-4 border-light-secondary-100 border-t-light-secondary-800 dark:border-dark-secondary-500 dark:border-t-dark-neutral-800 rounded-full animate-spin"></div>
          <p className="mt-4 font-playfair text-lg text-light-secondary-800 dark:text-dark-secondary-300 animate-pulse">
            Preparing your beauty shelf...
          </p>
        </div>
      ):
        !error?
          (<div className="mb-20 px-3 md:px-0 w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 place-items-stretch mt-5 md:mt-10 lg:mt-12">
            {
              ClassifiedProducts.map((product)=>{
                return(
                  <div key={product.id} id={`product-${product.id}`} className=" p-3 md:p-5 rounded-xl border-[3px] border-gray-100 
                  dark:border-2 dark:border-dark-neutral-400 flex flex-col  justify-center items-center gap-y-3 "> 
                    <div className="overflow-hidden h-32 md:h-52 w-full flex justify-center ">
                          <img src={product.image_link} alt={product.name} className=" h-full w-auto
                          transition-transform duration-300 ease-in-out hover:scale-110 "
                        onError={(e) => {
                              const card = e.target.closest(`#product-${product.id}`);
                              if (card) card.style.display = 'none';
                              setCounter((prevCount) => {
                                const nextCount = prevCount - 1;
                                if (nextCount <= 0) {
                                  setError(true);
                                }
                                return nextCount;
                              });
                            }}/>
                    </div>
                    <div className="w-full flex flex-col  items-center h-[8rem] md:h-32">
                      <div className="h-24 flex items-center justify-center">
                        <p className="first-letter:uppercase text-light-secondary-900 dark:text-dark-secondary-300 text-[16px] md:text-24
                       lg:text-28 font-bold font-playfair text-center">
                        {product.brand}</p>
                      </div>
                      
                      <p className="text-light-secondary-600 text-14 md:text-[18px] text-center font-playfair h-12
                      first-letter:uppercase">{product.product_type}</p>
                      <p className="text-light-secondary-600 text-14 md:text-[18px] text-center font-playfair h-12">{product.price}$</p>
                      <div className=" w-[100%] h-12 md:h-20 flex justify-between items-center">
                        <button className=" flex justify-center items-center rounded-md border-light-secondary-50
                      dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                      dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px] w-[90%]
                        hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                      text-light-primary-400 font-playfair text-16 md:text-20 font-bold" >
                        Add to <i className="ml-1 fa-solid fa-cart-arrow-down text-light-primary-400 text-[12px] md:text-[16px] dark:text-dark-primary-500 "></i>
                      </button>
                      <i class="fa-regular fa-heart text-16 md:text-[20px] cursor-pointer  dark:text-dark-secondary-800 text-light-secondary-400"></i>
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
            It looks like our beauty shelf is empty for this category. 
            Don't worry, your perfect glow is just a click away in our other collections!
          </p>
         </div>)
       }
        
          
     </div>
    </>
  );
}
