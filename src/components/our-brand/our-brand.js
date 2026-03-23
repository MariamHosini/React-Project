import React from "react";
import image from "../../assets/Group.webp";
import modelImage from "../../assets/model.webp";
import backGround from "../../assets/bg.webp";
import person1 from "../../assets/person1.webp";
import person2 from "../../assets/person2.webp";
import person3 from "../../assets/person3.webp";
import person4 from "../../assets/person4.webp";
import makeupImage from '../../assets/makeup.webp'
import { NavLink , Link} from "react-router-dom";
export default function ourBrand() {
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
            <i className="!hidden md:!block fa-solid fa-star absolute lg:left-[20%] xl:left-[25%] md:left-[15%] text-yellow-100 text-xl animate-pulse"></i>
            Beauty with Purpose
          </h1>
          <p className="w-[80%] md:w-[65%] text-center text-light-secondary-100 font-opensans text-16 dark:text-dark-neutral-600">
            Elevate your beauty ritual with curated textures and timeless
            shades. We believe makeup is more than just color; it’s the flair
            that completes your story.
            <i className="!hidden md:!block fa-solid fa-star absolute bottom-18 right-[16%] text-lg animate-pulse text-yellow-100"></i>{" "}
            Discover the art of effortless glam
          </p>
        </div>
        {/*our story */}
        <div className="flex flex-col lg:flex-row items-stretch mt-16 md:mt-18 lg:mt-32 gap-6 lg:gap-0 ">
          {/*story */}
          <div className="flex flex-col w-[100%] lg:w-[60%] text-center lg:text-start px-4 lg:px-0 ">
            <div className="mb-10 md:mb-15 lg:mb-20">
              <h3 className="text-light-secondary-900 dark:text-dark-secondary-300 font-playfair font-bold text-40 md:text-48 mb-3">
                Our story
              </h3>
              <p className="text-light-secondary-600 dark:text-dark-secondary-500 font-opensans text-14 md:text-16 lg:w-[85%]">
                Our story began with a simple belief: makeup should be both
                stunning and empowering. Frustrated by the lack of products that
                truly celebrated diverse beauty needs while being kind to the
                skin, we set out to create a glam line that does more. Our
                journey is fueled by a passion for artistry, high-pigment, and
                inclusivity.
                <br /> We carefully source premium, ethically obtained
                ingredients and combine them with vibrant colors to develop
                formulas that deliver professional results. But it’s more than
                just the products—it’s about the confidence. <br />
                Our mission is to empower individuals to feel like queens, no
                matter their style, skin tone, or background. We are proud to
                create collections that not only enhance features but also
                promote self-expression and creativity. Every palette we make is
                a reflection of our commitment to luxury, quality, and the
                belief that beauty is for everyone.
              </p>
            </div>
            <div
              className=" relative flex flex-col lg:flex-row md:px-7 items-center !bg-none lg:bg-light-primary-400 lg:bg-cover lg:bg-no-repeat 
           lg:bg-center w-full  lg:h-[120px] rounded-none md:rounded-l-[40px]"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="lg:w-[50%] flex justify-center  gap-3 mb-5 lg:mb-0">
                <div
                  className="flex items-center justify-center  
               xl:w-[70px] xl:h-[70px] xl:rounded-2xl xl:text-28 xl:p-2
               lg:w-[60px] lg:h-[60px] lg:rounded-xl  lg:text-24 lg:p-2
               md:w-[70px] md:h-[70px] md:rounded-2xl  md:text-28 text-18 md:p-4
              w-[60px] h-[60px] rounded-2xl  text-20  p-4
              dark:bg-dark-neutral-600 dark:text-dark-secondary-300
               bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
                >
                  +50
                </div>
                <div className="flex flex-col ">
                  <h5
                    className=" text-start font-bold font-playfair
                text-light-secondary-900 lg:text-light-secondary-50
                dark:text-dark-secondary-300 dark:lg:text-dark-neutral-700
                xl:text-28  lg:text-20 md:text-24 text-20"
                  >
                    Product
                  </h5>
                  <p
                    className=" font-opensans lg:w-[90%] text-start text-12
                dark:text-dark-secondary-500 dark:lg:text-dark-neutral-600
              text-light-secondary-600 lg:text-light-secondary-50 "
                  >
                    Transform your skincare routine with our innovative
                    solutions.
                  </p>
                </div>
              </div>
              <div className="lg:w-[50%] flex justify-center gap-3">
                <div
                  className="flex items-center justify-center  
               xl:w-[70px] xl:h-[70px] xl:rounded-2xl xl:text-28 xl:p-2
               lg:w-[60px] lg:h-[60px] lg:rounded-xl  lg:text-24 lg:p-2
               md:w-[70px] md:h-[70px] md:rounded-2xl  md:text-28 text-18 md:p-4
              w-[60px] h-[60px] rounded-2xl  text-20  p-4
               dark:bg-dark-neutral-600 dark:text-dark-secondary-300
               bg-light-secondary-100 text-light-secondary-900   font-playfair font-bold"
                >
                  +1K
                </div>
                <div className="flex flex-col">
                  <h5
                    className="text-start font-bold font-playfair
                text-light-secondary-900 lg:text-light-secondary-50
                dark:text-dark-secondary-300 dark:lg:text-dark-neutral-700
                xl:text-28  lg:text-20 md:text-24 text-20"
                  >
                    Users
                  </h5>
                  <p
                    className="font-opensans lg:w-[90%] text-start text-12
                 dark:text-dark-secondary-500 dark:lg:text-dark-neutral-600
              text-light-secondary-600 lg:text-light-secondary-50 "
                  >
                    Transform your skincare routine with our innovative
                    solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*Image */}
          <div
            className="w-[100%] lg:w-[40%]  flex items-end justify-center lg:rounded-br-[95rem] rounded-t-full  overflow-hidden "
            style={{ backgroundImage: `url(${backGround})` }}
          >
            <img
              src={modelImage}
              alt="Beauty model showcasing femme flair makeup"
            ></img>
          </div>
        </div>
        {/*Experts */}
        <div className="mt-16 md:mt-18 lg:mt-32 ">
          <div className="mb-10">
            <h3 className=" text-light-secondary-900 dark:text-dark-secondary-300 font-playfair font-bold 
            text-center lg:text-start text-[36px]  lg:text-40 md:text-48 mb-3">
              Meet the Experts
            </h3>
            <p className="px-4 lg:px-0 text-light-secondary-600 dark:text-dark-secondary-500 text-center lg:text-start font-opensans text-14 md:text-16 lg:w-[85%]">
              Our dedicated team of beauty experts is passionate about bringing
              you innovative artistry for a flawless, radiant look.
            </p>
          </div>
          <div className="carousel w-[100%] justify-between gap-4  px-6 lg:px-0 ">
            <div className=" w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20%] carousel-item rounded-3xl border-[3px]  border-gray-100
            dark:border-2 dark:border-dark-neutral-400  flex flex-col gap-2 justify-center items-center p-5">
              <img src={person1} alt="Beauty expert from Femme Flair team" className="rounded-lg"></img>
              <h6 className="text-light-secondary-900 dark:text-dark-secondary-300 text-20 font-bold font-playfair ">Leslie Alexander</h6>
              <p className="font-opensans text-light-secondary-600 text-14"> Co-Founder</p>
              <div className="flex items-center lg:justify-normal justify-center">
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800 rounded-xl  
                                hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800 
                              hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              rounded-xl w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://www.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp  text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800
                              hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              rounded-xl w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://web.telegram.org/k/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-telegram  text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
              </div>
            </div>
              <div className="w-[80%]  sm:w-[60%] md:w-[40%] lg:w-[20%] carousel-item rounded-3xl border-[3px] border-gray-100
              dark:border-2 dark:border-dark-neutral-400 flex flex-col gap-2 justify-center items-center p-5">
              <img src={person2} alt="Beauty expert from Femme Flair team" className="rounded-lg"></img>
              <h6 className="text-light-secondary-900 text-20 font-bold font-playfair dark:text-dark-secondary-300 ">Marvin McKinney</h6>
              <p className="font-opensans text-light-secondary-600 text-14"> Co-Founder</p>
              <div className="flex items-center lg:justify-normal justify-center">
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800 rounded-xl  
                                hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800 
                              hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              rounded-xl w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://www.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp  text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800
                              hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              rounded-xl w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://web.telegram.org/k/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-telegram  text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20%] carousel-item rounded-3xl border-[3px] border-gray-100
            dark:border-2 dark:border-dark-neutral-400
            flex flex-col gap-2 justify-center items-center p-5">
              <img src={person3} alt="Beauty expert from Femme Flair team" className="rounded-lg"></img>
              <h6 className="text-light-secondary-900 text-20 font-bold font-playfair dark:text-dark-secondary-300 ">Theresa Webb</h6>
              <p className="font-opensans text-light-secondary-600 text-14"> Co-Founder</p>
              <div className="flex items-center lg:justify-normal justify-center">
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800 rounded-xl  
                                hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800 
                              hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              rounded-xl w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://www.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp  text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800
                              hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              rounded-xl w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://web.telegram.org/k/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-telegram  text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[20%] carousel-item rounded-3xl border-[3px] border-gray-100 
            dark:border-2 dark:border-dark-neutral-400
            flex flex-col gap-2 justify-center items-center p-5">
              <img src={person4} alt="Beauty expert from Femme Flair team" className="rounded-lg"></img>
              <h6 className="text-light-secondary-900 text-20 font-bold font-playfair dark:text-dark-secondary-300 ">Ronald Richards</h6>
              <p className="font-opensans text-light-secondary-600 text-14"> Co-Founder</p>
              <div className="flex items-center lg:justify-normal justify-center">
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800 rounded-xl  
                                hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800 
                              hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              rounded-xl w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://www.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-whatsapp  text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
                <div
                  className="bg-light-secondary-400 dark:bg-dark-secondary-800
                              hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 transition duration-200 ease-in-out
                              rounded-xl w-[42px] h-[42px]  flex items-center justify-center mr-2"
                >
                  <NavLink
                    to="https://web.telegram.org/k/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-telegram  text-light-primary-400 dark:text-dark-primary-500 text-24"></i>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*video  */}
        <div className="mt-16 md:mt-18 lg:mt-32 flex flex-col gap-12 px-4 md:px-0">
          <div className="flex justify-center items-center dark:bg-dark-secondary-800  bg-light-secondary-100 py-6 rounded-3xl text-center 
          px-6 lg:px-2">
            <p className="text-light-secondary-800 italic dark:text-dark-secondary-300  font-serif lg:text-24 text-16 ">
              “ True radiance reflects the beauty you embrace within. Enhance it with artistry, and let your inner queen shine. ”
            </p>
          </div>
          <img src={makeupImage} alt="Makeup product"  className="w-[100%] h-auto rounded-badge"/>
        </div>
        {/*Answers */}
        <div className="mt-16 md:mt-18 lg:mt-32 flex flex-col justify-between gap-3 lg:gap-0 lg:flex-row ">
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
                  text-16 h-[80px] w-[160px]"><Link to='/contact-us'>Contact Us</Link></button>
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
    </>
  );
}
