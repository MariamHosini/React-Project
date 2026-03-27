import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate =useNavigate();
  const [brands, setBrands] = useState(); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [allproducts , setAllProducts] = useState([]);
  const [ ClassifiedProducts, setClassifiedProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error , setError] = useState(false);
  const categories =[
    {id:1,cat_name:"Blush",cat_class:"blush",cat_image:blush},
    {id:2,cat_name:"Bronzer",cat_class:"bronzer",cat_image:bronzer},
    {id:3,cat_name:"Eyebrow",cat_class:"eyebrow",cat_image:eyebrow},
    {id:4,cat_name:"Eyeliner",cat_class:"eyeliner",cat_image:eyeliner},
    {id:5,cat_name:"Eyeshadow",cat_class:"eyeshadow",cat_image:eyeshadow},
    {id:6,cat_name:"Foundation",cat_class:"foundation",cat_image:foundation},
    {id:7,cat_name:"Lipliner",cat_class:"lip_liner",cat_image:lipliner},
    {id:8,cat_name:"Lipstick",cat_class:"lipstick",cat_image:lipstick},
    {id:9,cat_name:"Mascara",cat_class:"mascara",cat_image:mascara},
    {id:10,cat_name:"Nail Polish",cat_class:"nail_polish",cat_image:nailPolish},
  ]
  const generateRandomPrice = () => {
  const min = 10;
  const max = 60;
  const random = Math.random() * (max - min) + min;
  return random.toFixed(2); 
};
useEffect(() => {
    if (products && products.length > 0) {
      if (products) {
    const productsWithPrices = products.map(product => ({
       ...product,
      price: product.price && product.price !== "0.0" 
             ? product.price 
             : generateRandomPrice()
    }));
    
    get_validate_product(productsWithPrices.filter(item => item.brand !== null && item.brand !== "").slice(200,300)); 
    setAllProducts(productsWithPrices);
  }
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
    borderColor: state.isFocused 
      ? (document.documentElement.classList.contains('dark') ? '#a08298' : '#786171')
      : (document.documentElement.classList.contains('dark') ? '#4F404B' : '#c9a3be'),
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
      marginLeft: '26px', 
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

option: (base, state) => ({
    ...base,
    marginBottom:'2px',
    backgroundColor: state.isSelected ? '#786171' : 'transparent',
   color: state.isSelected 
      ? '#ffffff' 
      : 'var(--select-option-color)',
   
    '&:hover': {
      backgroundColor: '#786171 !important',
      color: '#ffffff !important',
    },
    cursor: 'pointer',
    ':active': {
      backgroundColor: '#786171',
      color: '#ffffff',
    }
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
    setSelectedOption(brand);
    if (!brand || brand.value === "1") {
      get_validate_product(allproducts.slice(200,400))
    } 
    else {
      const filtered = allproducts.filter((item) => item.brand === brand.value);
      get_validate_product(filtered)
    }
}
function get_MakeUp_Category(category) {
  const filtered = allproducts.filter((item) => item.product_type === category);
  get_validate_product(filtered);
}
async function get_validate_product(products_List){
  setIsLoading(true);
  setError(false);
  function check_Image(product){
      return new Promise((resolve)=>{
          const img = new Image();
          img.src = product.image_link;
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
function go_to_product(id){
  const new_id=btoa(id);
  console.log(new_id)
  navigate(`/one-product/${new_id}`);
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
        <div className=" w-[95%] flex justify-center mt-16 md:mt-18 lg:mt-20">
          <p className="text-[36px] md:text-40 lg:text-48 font-bold font-playfair text-light-secondary-800 
           dark:text-dark-secondary-500 ">Shop by Category</p>
          
        </div>
        {/*Search icons in tablet & laptop*/}
        <div className="w-[95%] hidden lg:grid  lg:grid-cols-5 place-items-stretch  gap-x-4 gap-y-6 md:mt-18 lg:mt-20">
          {/*Categories */}
          { categories.map((cat)=>{
            return(
               <div key= {cat.id} className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category(`${cat.cat_class}`)}>
            <div className=" flex justify-center items-center md:h-14 md:w-14 xl:h-16 xl:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={cat.cat_image} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair md:text-16
               lg:text-20 xl:text-24 font-bold">{cat.cat_name}</p>
            </div>
                </div>
            )
          })
          }
        </div>
        {/*Search icons in  mobile */}
        <div className="carousel w-[90%] mt-10 flex lg:hidden  gap-4 ">
          {/*categories */}
          {
            categories.map((cat)=>{
              return(
              <div key={cat.id} className="carousel-item w-[35%] md:w-[20%]">
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
        </div> ):
          !error?
            (<div className="mb-20 px-3 md:px-0 w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8 place-items-stretch mt-5 md:mt-10 lg:mt-12">
              {
                ClassifiedProducts.map((product,index)=>{
                  return(
                    <div key={product.id || index} id={`product-${product.id}`} className=" p-3 md:p-5 rounded-xl border-[3px] border-gray-100 
                    dark:border-2 dark:border-dark-neutral-400 flex flex-col  justify-center items-center gap-y-3 "> 
                      <div className="overflow-hidden h-44 md:h-64 w-full flex justify-center ">
                            <img src={product.image_link} alt={product.name} className=" h-auto w-full
                            transition-transform duration-300 ease-in-out hover:scale-110 "/>
                      </div>
                      <div className="w-full flex flex-col  items-center h-[9rem] md:h-36">
                        <div className="h-24 flex items-center justify-center">
                          <p className="first-letter:uppercase text-light-secondary-900 dark:text-dark-secondary-300 text-[16px] md:text-24
                        lg:text-28 font-bold font-playfair text-center">
                          {product.brand}</p>
                        </div>
                        
                        <p className="text-light-secondary-600 text-14 md:text-[18px] text-center font-playfair h-12
                        first-letter:uppercase">{product.product_type}</p>
                        <p className="text-light-secondary-600 text-14 md:text-[18px] text-center font-playfair h-12">{product.price* 50} EGP</p>
                        <div className=" w-[100%] h-20 md:h-28 flex justify-between items-center">
                          <button className=" flex justify-center items-center rounded-md border-light-secondary-50
                        dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                        dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px] w-[80%] h-[100%]
                          hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                        text-light-primary-400 font-playfair text-[16px] md:text-20 font-bold"
                        onClick={()=>{go_to_product(product.id)}} >
                        Read more
                        </button>
                        <i className="fa-regular fa-heart text-24 md:text-[26px] cursor-pointer  dark:text-dark-secondary-800 text-light-secondary-400"></i>
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
     </div>
    </>
  );
}
