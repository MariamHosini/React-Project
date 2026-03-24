import React from "react";
import image from "../../assets/Group.webp";

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

export default function products() {
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
      color: 'inherit',
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
        ? '#775fb4' 
        : 'transparent',
      color: state.isSelected ? '#ffffff' : (document.documentElement.classList.contains('dark') ? '#D8C1D5' : '#5f4c90'),
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#775fb4' : 'transparent',
      }
    }),

    menu: (base) => ({
      ...base,
      backgroundColor:'transparent',
      borderRadius: '20px',
      border: '2px solid ',
      borderColor:  
       (document.documentElement.classList.contains('dark') ? '#392c35' : '#c9a3be'),
    
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
  function get_MakeUp_Category(category){
    console.log(category)
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
        {/*Search icons */}
        <div className="w-[95%] hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 place-items-stretch  gap-x-4 gap-y-6 mt-16 md:mt-18 lg:mt-24">
          {/*blush */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("blush")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500 ">
              <img src={blush} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Blush</p>
            </div>
          </div>
           {/*bronzer */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("bronzer")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={bronzer} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Bronzer</p>
            </div>
          </div>
          {/*eye-brow */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyebrow")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={eyebrow} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Eyebrow</p>
            </div>
          </div>
          {/*eye-liner */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyeliner")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={eyeliner} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Eyeliner</p>
            </div>
          </div>
          {/*eye-shadow */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("eyeshadow")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={eyeshadow} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Eyeshadow</p>
            </div>
          </div>
          {/*foundation */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("foundation")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={foundation} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Foundation</p>
            </div>
          </div>
          {/*foundation */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("lipliner")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={lipliner} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Lipliner</p>
            </div>
          </div>
          {/*lipstick */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("lipstick")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={lipstick} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Lipstick</p>
            </div>
          </div>
          {/*mascrara */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("mascara")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={mascara} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Mascara</p>
            </div>
          </div>
          {/*lipstick */}
          <div className="flex gap-3 items-center cursor-pointer"   onClick={()=>get_MakeUp_Category("nail_polish")}>
            <div className=" flex justify-center items-center md:h-16 md:w-16 rounded-2xl bg-light-secondary-100 dark:bg-dark-secondary-500">
              <img src={nailPolish} alt="blush" className="w-[70%] h-[70%]"/>
            </div>
            <div>
              <p className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair text-24 font-bold">Nail Polish</p>
            </div>
          </div>
        </div>
        {/*Search tap */}
        <div className="relative w-full flex justify-center items-center mt-14 md:mt-18 lg:mt-24">
          <Select
            className="lg:w-[60%] md:w-[70%] w-[90%]"
            styles={customStyles}
            isSearchable={true} 
            placeholder="Search for a brand..."
          />
            <span className="absolute left-[12%] md:left-[18%] lg:left-[21%] z-10 cursor-pointer text-light-secondary-600 dark:text-dark-secondary-500 pointer-events-none"> 

              <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>


             <div className="relative w-full flex justify-center items-center mt-14 md:mt-18 lg:mt-24"></div>
      </div>
    </>
  );
}
