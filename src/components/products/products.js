import React from "react";
import image from "../../assets/Group.webp";
export default function products() {
  return (
    <>
      <div className="flex flex-col px-0 md:px-12 lg:px-6 ">
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
      </div>
    </>
  );
}
