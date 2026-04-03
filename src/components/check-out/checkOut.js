import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { products } from "../../data/mock_data";
import Spinner from "../spinner/spinner";
import { startSpinner, stopSpinner } from "../../store/spinnerSlice";
import { clearCart } from "../../store/cartSlice";
import  supabase  from '../../supabaseClient';
export default function CheckOut() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(false);
  const [finalProducts, setFinalProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingFree, setShippingFree] = useState(false);
  const loadding = useSelector((store) => store.spinner.mode);
  const products_data = useSelector((store) => store.cart.productData);
  const numberOfProducts = useSelector((store) => store.cart.productNumbers);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const user = useSelector((store) => store.auth.user);
  useEffect(() => {
    if (products_data && products_data != null) {
      const finalProducts = products_data.map((item) => {
        const productInfo = products.find(
          (prd) => Number(prd.id) === Number(item.id),
        );
        return {
          ...productInfo,
          numberOfProduct: item.numberOfProduct,
          selectedColor: item.selectedColor,
        };
      });
      setFinalProducts(finalProducts);
      const prices = finalProducts.reduce((accumilator, product) => {
        return (
          accumilator + Number(product.numberOfProduct) * Number(product.price)
        );
      }, 0);
      const subprice = (prices * 50).toFixed(0);
      let shipping = 0;
      let finalPrice = 0;
      if (subprice >= 10000) {
        setShippingFree(true);
        shipping = 0;
        finalPrice = Number(subprice) + Number(shipping);
        setShippingPrice(shipping);
        setSubTotalPrice(subprice);
        setTotalPrice(finalPrice);
      } else {
        setShippingFree(false);
        shipping = (subprice * 0.1).toFixed(0);
        finalPrice = Number(subprice) + Number(shipping);
        setShippingPrice(shipping);
        setSubTotalPrice(subprice);
        setTotalPrice(finalPrice);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });
  async function submit(data) {
    dispatch(startSpinner());
    const{firstName,lastName,email,streetAddress,stateProvince,city,zipPostalCode,phone} = data; 
    const finalOrder = {
        user_id: user?.id || null,
        order_price: subTotalPrice,
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        shipping_address: `${streetAddress}, ${city}, ${stateProvince}, ${zipPostalCode}`,
        order_items: finalProducts,
        phone_number: phone,}
    const { error } = await supabase.from('orders').insert(finalOrder);
    if (error) {
        dispatch(stopSpinner());
        setLoadingMessage(true)
        setMessage("There was an error processing your order. Please try again.");
        setTimeout(() => {
          setMessage("");
          setLoadingMessage(false);
        }, 3000);
    } else {
        setLoadingMessage(true);
        setTotalPrice(0);
        setSubTotalPrice(0);
        setShippingPrice(0);
        setShippingFree(false);
        dispatch(stopSpinner());
        dispatch(clearCart());
        setFinalProducts([]);
        reset();
        setMessage("Congratulations! Your order is confirmed 🤍.");
        setTimeout(() => {
          setMessage("");
          setLoadingMessage(false);
        }, 3000);
    }
  } 
  return (
    <>
      <div className=" py-5 mt-8 flex flex-col  justify-center px-0 md:px-5 lg:px-10">
        <div className="flex flex-col items-center text-center gap-3">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-light-secondary-800 dark:text-dark-secondary-300">
            Secure Your Beauty Treasures
          </h1>
          <p className="font-opensans text-light-neutral-500 mt-2 text-sm md:text-base">
            Safe & Secure Checkout • Fast Delivery Guaranteed
          </p>
        </div>
        <div className="flex flex-col items-center gap-10 mt-10">
          
          <div className="flex flex-col w-[100%] lg:grid lg:grid-cols-3 px-4 lg:px-0 gap-10 ">
            {/*order review in mobile */}
            <div className="lg:hidden collapse collapse-arrow border-[3px] w-[100%]  border-gray-100 dark:border-2
               dark:border-dark-neutral-400 mb-2">
                <input type="checkbox" className="peer" />
                <div className="collapse-title flex flex-col w-[100%] ">
                  <p
                    className="font-bold text-16 md:text-20 bg-transparent text-light-secondary-900 
                                    dark:text-dark-secondary-300 font-playfair
                                     dark:peer-checked:text-dark-neutral-800 peer-checked:text-light-neutral-50"
                  >
                    Order Review
                  </p>
                  <p className="text-12 md:text-14 bg-transparent text-light-secondary-500 dark:text-dark-secondary-700 font-playfai">
                    {numberOfProducts} {numberOfProducts > 1 ? "items" : "item"}{" "}
                    in a card
                  </p>
                </div>
                <div className="w-[100%] collapse-content font-opensansw-[100%] text-14 lg:text-16 text-light-neutral-50  dark:text-dark-neutral-800">
                  {/* Product Item */}
                  {finalProducts?.map((product, index) => {
                    return (
                      <React.Fragment key={`${product.id}-${index}`}>
                        <div className="flex gap-2 md:gap-3 py-5 border-b border-light-secondary-100 items-center">
                          <img
                            src={product.api_featured_image}
                            alt={product.name}
                            className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl bg-light-secondary-50"
                          />
                          <div className="flex-1 space-y-1">
                            <h3
                              className="font-playfair font-bold text-light-secondary-500 
                                dark:text-light-secondary-300 text-lg md:text-xl first-letter:uppercase"
                            >
                              {product.brand}
                            </h3>
                            <div className="flex flex-col justify-center gap-2">
                              <p
                                className="text-light-primary-800
                                        dark:text-light-secondary-700 text-md md:text-lg first-letter:uppercase"
                              >
                                {product.product_type}
                              </p>
                              <div className="flex items-center gap-1 md:gap-2 ">
                                {product.selectedColor?.hex_value &&
                                  product.selectedColor?.color && (
                                    <>
                                      <div
                                        className="w-4 h-4 border-light-primary-800 dark:border-light-neutral-50 border-[1px] md:w-5 md:h-5 rounded-full"
                                        style={{
                                          backgroundColor:
                                            product.selectedColor.hex_value,
                                        }}
                                      ></div>
                                      <p className="text-light-secondary-700  dark:text-light-secondary-500 text-xs md:text-lg first-letter:uppercase">
                                        {product.selectedColor.color}
                                      </p>
                                    </>
                                  )}
                              </div>
                              <p className="  text-dark-secondary-700 text-sm md:text-lg first-letter:uppercase">
                                Number of products : {product.numberOfProduct}
                              </p>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            {/* Billing address */}
            <div
              className="order-1  w-[100%] lg:col-span-2 lg:rounded-3xl lg:border-[3px] lg:border-gray-100
                        dark:lg:border-2 dark:lg:border-dark-neutral-400 p-0 lg:p-10"
            >
              <h1
                className="text-[34px] md:text-48 lg:text-[50px]  font-bold font-playfair
                         dark:text-dark-secondary-300 text-light-secondary-900"
              >
                Billing Address
              </h1>
              <div>
                <form
                  id="billig-form"
                  onSubmit={handleSubmit(submit)}
                  className="ml-2 mt-10"
                >
                  {/*first name and last name */}
                  <div className="w-[100%] flex flex-col md:flex-row justify-between">
                    {/*first name */}
                    <div className="w-[100%] md:w-[45%]">
                      <label
                        className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                            dark:text-dark-secondary-300"
                      >
                        First name
                      </label>
                      <div className="relative ">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                          <i className="fa-solid fa-user"></i>{" "}
                        </span>
                        <input
                          {...register("firstName", {
                            required: "First name is required",
                            pattern: {
                              value: /^[a-zA-Z\s]*$/,
                              message: "Name contains characters only",
                            },
                          })}
                          type="text"
                          placeholder="Enter your first name"
                          className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50
                                "
                        />
                      </div>
                      <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                        {errors.firstName?.message || ""}
                      </p>
                    </div>
                    {/*last name */}
                    <div className="w-[100%] md:w-[45%]">
                      <label
                        className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                            dark:text-dark-secondary-300"
                      >
                        Last name
                      </label>
                      <div className="relative ">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                          <i className="fa-solid fa-user"></i>
                        </span>
                        <input
                          {...register("lastName", {
                            required: "Last name is required",
                            pattern: {
                              value: /^[a-zA-Z\s]*$/,
                              message: "Name contains characters only",
                            },
                          })}
                          type="text"
                          placeholder="Enter your last name "
                          className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                        />
                      </div>
                      <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                        {errors.lastName?.message || ""}
                      </p>
                    </div>
                  </div>
                  {/*email */}
                  <div className="w-[100%] ">
                    {/*Email */}
                    <label
                      className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                              dark:text-dark-secondary-300"
                    >
                      Email
                    </label>
                    <div className="relative ">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                        <i className="fa-regular fa-envelope"></i>
                      </span>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                        type="text"
                        placeholder="Enter your email"
                        className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                      />
                    </div>
                    <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                      {errors.email?.message || ""}
                    </p>
                  </div>
                  {/*street Address */}
                  <div className="w-[100%]">
                    <label
                      className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                                    dark:text-dark-secondary-300"
                    >
                      Street Address
                    </label>
                    <div className=" ">
                      <input
                        {...register("streetAddress", {
                          required: "Street address is required",
                        })}
                        type="text"
                        placeholder="Enter your street address"
                        className="w-full bg-transparent rounded-full pt-2 pb-2 pl-4
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                      />
                    </div>
                    <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                      {errors.streetAddress?.message || ""}
                    </p>
                  </div>
                  {/*state & city */}
                  <div className="w-[100%] flex flex-col md:flex-row justify-between">
                    {/*state / province */}
                    <div className="w-[100%] md:w-[45%]">
                      <label
                        className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                            dark:text-dark-secondary-300"
                      >
                        State / Province
                      </label>
                      <div className="relative ">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                          <i className="fa-solid fa-map-marker-alt"></i>{" "}
                        </span>
                        <input
                          {...register("stateProvince", {
                            required: "State / Province is required",
                          })}
                          type="text"
                          placeholder="Your state / province"
                          className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50
                                "
                        />
                      </div>
                      <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                        {errors.stateProvince?.message || ""}
                      </p>
                    </div>
                    {/*city */}
                    <div className="w-[100%] md:w-[45%]">
                      <label
                        className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                            dark:text-dark-secondary-300"
                      >
                        City
                      </label>
                      <div className="relative ">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                          <i className="fa-solid fa-map-marker-alt"></i>
                        </span>
                        <input
                          {...register("city", {
                            required: "City is required",
                            pattern: {
                              value: /^[a-zA-Z\s]*$/,
                              message: "Name contains characters only",
                            },
                          })}
                          type="text"
                          placeholder="Your city"
                          className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                        />
                      </div>
                      <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                        {errors.city?.message || ""}
                      </p>
                    </div>
                  </div>
                  {/*zip/postalCode & phone */}
                  <div className="w-[100%] flex flex-col md:flex-row justify-between">
                    {/*zip/postalCode */}
                    <div className="w-[100%] md:w-[45%]">
                      <label
                        className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                            dark:text-dark-secondary-300"
                      >
                        Zip / Postal Code
                      </label>
                      <div className="relative ">
                        <input
                          {...register("zipPostalCode", {
                            required: "Zip / Postal Code is required",
                          })}
                          type="text"
                          placeholder="Your zip / postal code"
                          className="w-full bg-transparent rounded-full pt-2 pb-2 pl-4
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50
                                "
                        />
                      </div>
                      <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                        {errors.zipPostalCode?.message || ""}
                      </p>
                    </div>
                    {/*phone */}
                    <div className="w-[100%] md:w-[45%]">
                      <label
                        className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                            dark:text-dark-secondary-300"
                      >
                        Phone Number
                      </label>
                      <div className="relative ">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                          <i className="fa-solid fa-phone"></i>
                        </span>
                        <input
                          {...register("phone", {
                            required: "Phone Number is required",
                            pattern: {
                              value: /^[0-9\s\-+()]+$/,
                              message: "Please enter a valid phone number",
                            },
                          })}
                          type="text"
                          placeholder="Your phone number"
                          className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                        />
                      </div>
                      <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                        {errors.phone?.message || ""}
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {/*Billing summary side */}
            <div className="lg:sticky lg:top-10 order-3 lg:order-2  lg:col-span-1 flex flex-col gap-3 ">
              <div className="hidden lg:collapse collapse-arrow border-[3px] w-[100%]  border-gray-100 dark:border-2
               dark:border-dark-neutral-400 mb-2">
                <input type="checkbox" className="peer" />
                <div className="collapse-title flex flex-col w-[100%] ">
                  <p
                    className="font-bold text-16 md:text-20 bg-transparent text-light-secondary-900 
                                    dark:text-dark-secondary-300 font-playfair
                                     dark:peer-checked:text-dark-neutral-800 peer-checked:text-light-neutral-50"
                  >
                    Order Review
                  </p>
                  <p className="text-12 md:text-14 bg-transparent text-light-secondary-500 dark:text-dark-secondary-700 font-playfai">
                    {numberOfProducts} {numberOfProducts > 1 ? "items" : "item"}{" "}
                    in a card
                  </p>
                </div>
                <div className="w-[100%] collapse-content font-opensansw-[100%] text-14 lg:text-16 text-light-neutral-50  dark:text-dark-neutral-800">
                  {/* Product Item */}
                  {finalProducts?.map((product, index) => {
                    return (
                      <React.Fragment key={`${product.id}-${index}`}>
                        <div className="flex gap-2 md:gap-3 py-5 border-b border-light-secondary-100 items-center">
                          <img
                            src={product.api_featured_image}
                            alt={product.name}
                            className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl bg-light-secondary-50"
                          />
                          <div className="flex-1 space-y-1">
                            <h3
                              className="font-playfair font-bold text-light-secondary-500 
                                dark:text-light-secondary-300 text-lg md:text-xl first-letter:uppercase"
                            >
                              {product.brand}
                            </h3>
                            <div className="flex flex-col justify-center gap-2">
                              <p
                                className="text-light-primary-800
                                        dark:text-light-secondary-700 text-md md:text-lg first-letter:uppercase"
                              >
                                {product.product_type}
                              </p>
                              <div className="flex items-center gap-1 md:gap-2 ">
                                {product.selectedColor?.hex_value &&
                                  product.selectedColor?.color && (
                                    <>
                                      <div
                                        className="w-4 h-4 border-light-primary-800 dark:border-light-neutral-50 border-[1px] md:w-5 md:h-5 rounded-full"
                                        style={{
                                          backgroundColor:
                                            product.selectedColor.hex_value,
                                        }}
                                      ></div>
                                      <p className="text-light-secondary-700  dark:text-light-secondary-500 text-xs md:text-lg first-letter:uppercase">
                                        {product.selectedColor.color}
                                      </p>
                                    </>
                                  )}
                              </div>
                              <p className="  text-dark-secondary-700 text-sm md:text-lg first-letter:uppercase">
                                Number of products : {product.numberOfProduct}
                              </p>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div
                className="bg-light-secondary-50 dark:bg-light-secondary-500 p-6 rounded-3xl border
                        border-light-secondary-100 dark:border-light-secondary-500"
              >
                <h2 className="font-playfair text-2xl font-bold text-light-primary-700 dark:text-light-primary-800 mb-6">
                  Billig summary
                </h2>
                <div className="space-y-4 font-opensans">
                  <div className="flex justify-between">
                    <span className="text-light-primary-700 dark:text-light-primary-900">
                      Subtotal
                    </span>
                    <span className="text-light-neutral-600 dark:text-dark-neutral-700 font-bold">
                      {subTotalPrice} EGP
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-light-primary-700 dark:text-light-primary-800">
                      Estimated Shipping
                    </span>
                    <span className="text-green-800 font-bold">
                      {!shippingFree ? shippingPrice : "Free"}
                    </span>
                  </div>
                  <hr className="border-light-secondary-200" />
                  <div className="flex justify-between text-xl font-bold">
                    <span className="text-light-primary-700 dark:text-light-primary-800">
                      Total
                    </span>
                    <span className="text-light-secondary-800 dark:text-dark-neutral-700">
                      {totalPrice} EGP
                    </span>
                  </div>
                </div>
                {!loadding ? (
                  <button
                    type="submit"
                    form="billig-form"
                    className="w-full py-4 mt-8 rounded-full border-light-secondary-50
                                dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                                dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px]
                                    hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                text-light-primary-400 font-playfair text-20 md:text-16 lg:text-20 font-bold
                                dark:disabled:bg-light-neutral-600
                          dark:disabled:text-neutral-100 dark:disabled:border-light-neutral-600 disabled:text-neutral-100
                          disabled:bg-light-neutral-600 login_btn"
                    disabled={!isValid || !isDirty || subTotalPrice === 0}
                  >
                    Pay {totalPrice} EGP <Spinner className="ml-2 mt-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    form="billig-form"
                    className="w-full py-4 mt-8 rounded-full border-light-secondary-50 flex items-center justify-center  
                                dark:text-dark-primary-500  dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                                dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px]
                                    hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700
                                text-light-primary-400 font-playfair text-20 md:text-16 lg:text-20 font-bold"
                  >
                    Pay {totalPrice} EGP <Spinner className="ml-2 " />
                  </button>
                )}
              </div>
            </div>
            {/* Payment Method Section */}
            <div
              className="col-span-2 order-2 lg:order-3  border rounded-3xl lg:border-[3px] border-gray-100
                        dark:lg:border-2 dark:border-dark-neutral-400  lg:p-8 shadow-sm"
            >
              <div className="flex flex-col gap-4">
                {/* Credit Card Option */}
                <div className={`p-4 `}>
                  <label className="flex items-center justify-between mb-6 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-light-secondary-800 dark:text-dark-secondary-300">
                        Pay with Credit Card
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <i className="fa-brands fa-cc-visa text-blue-600 text-xl"></i>
                      <i className="fa-brands fa-cc-mastercard text-red-500 text-xl"></i>
                    </div>
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                    <div className="flex flex-col gap-2 md:col-span-2">
                      {/*card Number */}
                      <div className="w-[100%]">
                        <label
                          className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                                    dark:text-dark-secondary-300"
                        >
                          Card Number
                        </label>
                        <div className=" ">
                          <input
                            id="billing-form"
                            {...register("cardNumber", {
                              required: "Card number is required", 
                            onChange: (e) => {
                              const value = e.target.value.replace(/\D/g, "");   
                              e.target.value = value.replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 19);  
                            },
                            pattern: {
                              value: /^(\d{4}\s?){4}$/,
                              message: "Card number must be 16 digits"
                            }
                            })}
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-transparent rounded-full pt-2 pb-2 pl-4
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                          />
                        </div>
                        <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                          {errors.cardNumber?.message || ""}
                        </p>
                      </div>
                      {/*state & city */}
                      <div className="w-[100%] flex flex-col md:flex-row justify-between">
                        {/*ex date / security code */}
                        <div className="w-[100%] md:w-[45%]">
                          <label
                            className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                            dark:text-dark-secondary-300"
                          >
                            Expiration Date
                          </label>
                          <div className=" ">
                            <input
                              id="billing-form"
                              {...register("expirationDate", {
                                required: "Expiration date is required",
                                pattern: {
                                  value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                  message:
                                    "Invalid expiration date format (MM/YY)",
                                },
                              })}
                              type="text"
                              placeholder="MM/YY"
                              className="w-full bg-transparent rounded-full pt-2 pb-2 pl-4
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50
                                "
                            />
                          </div>
                          <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                            {errors.expirationDate?.message || ""}
                          </p>
                        </div>
                        {/*Card Securty Key */}
                        <div className="w-[100%] md:w-[45%]">
                          <label
                            className="block font-bold lg:text-16 text-14 font-opensans text-light-primary-800 ml-3 mb-2
                            dark:text-dark-secondary-300"
                          >
                            Card Security Code
                          </label>
                          <div className="relative ">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-light-secondary-600 dark:text-dark-secondary-500">
                              <i className="fa-solid fa-lock"></i>
                            </span>
                            <input
                              id="billing-form"
                              {...register("securityKey", {
                                required: "Security key is required",
                                pattern: {
                                  value: /^[0-9]{3,4}$/,
                                  message: "Invalid security key",
                                },
                              })}
                              type="text"
                              placeholder="MM/YY"
                              className="w-full bg-transparent rounded-full pt-2 pb-2 pl-12
                                placeholder:text-light-secondary-600 dark:placeholder:text-dark-secondary-500
                                lg:text-16 text-14
                                lg:placeholder:text-16 placeholder:text-14 placeholder:font-opensans
                                border-light-neutral-100 dark:border-dark-neutral-400 border-2
                                focus:outline-none dark:focus:border-dark-neutral-800
                                focus:ring-2 focus:ring-light-secondary-600
                                focus:border-light-neutral-50 text-light-secondary-900 dark:text-dark-neutral-50"
                            />
                          </div>
                          <p className="min-h-[30px] lg:text-16 text-14 text-[#B83280] ml-3 mt-2">
                            {errors.securityKey?.message || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loadingMessage && (
            <div className="toast ">
              <div className="alert alert-info bg-light-secondary-700 text-light-secondary-50 text-12 md:text-16 font-bold p-5">
                <span>{message}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
