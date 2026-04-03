import React from "react";
import { useSelector } from "react-redux";
export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.auth.orders);
  console.log(orders)
  const numberOfOrders = useSelector((state) => state.auth.number_of_orders);
  const numberOfWishlistitems = useSelector((state) => state.auth.number_of_items_in_wishlist);
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
      {/* 1. Header Section (Cover + Photo) */}
      <div className="relative mb-24">
        
        {/* Profile Info Overlay */}
        <div className=" flex items-end gap-6">
          <div className="w-32 h-32 md:w-40 md:h-40  dark:bg-dark-neutral-800 p-2 rounded-full shadow-xl">
            <div className="w-full h-full bg-pink-200  rounded-full flex items-center justify-center text-light-primary-600 text-5xl font-serif font-bold">
              {user?.userName?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="mb-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-light-secondary-900 dark:text-white leading-none">
              {user?.userName || "Beauty Enthusiast"}
            </h1>
            <p className="text-light-secondary-500 dark:text-dark-neutral-400 mt-2 tracking-widest uppercase text-xs">
              FemmeFlair Member since 2026
            </p>
          </div>
        </div>
      </div>

      {/* 2. Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar: Account Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-dark-neutral-800 p-8 rounded-3xl shadow-sm border border-neutral-100 dark:border-white/5">
            <h3 className="text-lg font-bold mb-6 border-b pb-2 dark:text-white">Account Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs uppercase text-neutral-400">Email Address</label>
                <p className="font-medium dark:text-dark-secondary-200">{user?.email || "user@femmeflair.com"}</p>
              </div>
              <div>
                <label className="text-xs uppercase text-neutral-400">Phone Number</label>
                <p className="font-medium dark:text-dark-secondary-200">+20 123 456 789</p>
              </div>
              <button className="w-full mt-4 py-3 rounded-xl border-2 border-pink-500 text-pink-500 font-bold hover:bg-pink-500 hover:text-white transition-all duration-300">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Content: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2  gap-4">
            {[
              { label: "My Orders", value: numberOfOrders, icon: "📦" },
              { label: "Wishlist", value: numberOfWishlistitems, icon: "💖" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-neutral-800 p-6 rounded-3xl text-center border border-neutral-50 dark:border-white/5 hover:shadow-md transition-shadow">
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <span className="text-2xl font-bold block dark:text-white">{stat.value}</span>
                <span className="text-xs text-neutral-400 uppercase tracking-tighter">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Recent Activity / Order History Placeholder */}
          <div className="border border-neutral-100 dark:border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-serif font-bold text-light-secondary-700 dark:text-dark-secondary-300 mb-6">
            Recent Orders
          </h3>
          {numberOfOrders === 0 ? (
            <div className="text-center py-10">
              <p className="dark:text-dark-secondary-700 text-light-secondary-500  text-20 italic">You haven't placed any orders yet.</p>
            </div>
          ) : (
                <div className="space-y-2">
                {orders.map((order) => (
                  <div 
                    key={order.id} 
                    className="collapse collapse-arrow   border-[3px] border-light-secondary-700  rounded-xl"
                  >
                    <input type="checkbox" className="peer" /> 
                    <div className="collapse-title text-md font-medium flex justify-between  pt-10 pr-2">
                      <div className="flex flex-col gap-4">
                        <span className=" text-light-secondary-800 dark:text-dark-secondary-700 font-bold">Order #{(Math.random()*1000).toFixed(0)}</span>
                        <span className="text-light-secondary-600 font-bold">{order.order_price} EGP</span>
                      </div>
                      <div className="text-md badge badge-outline border-dark-secondary-500
                       text-dark-secondary-500 uppercase tracking-tighter mt-1">
                        {order.status || 'Processing'}
                      </div>
                    </div>
                    <div className="collapse-content p-1 md:p-5 "> 
                      <div className=" ">
                        <h4 className="text-[12px] uppercase mb-2 text-light-neutral-500 tracking-widest font-bold">Ordered Items</h4>
                        
                        {order.order_items.map((item, idx) => {
                          return (
                            <div key={idx} className="flex items-center gap-4 mb-5">
                              <img src={item.api_featured_image} alt={item.product_name} className="w-20 h-20 rounded-lg object-cover" />
                              <div>
                                <p className="text-md font-medium text-light-secondary-700 dark:text-dark-secondary-300
                                first-letter:uppercase">{item.brand} - {item.product_type}</p>
                                <p className="text-sm text-light-secondary-500 dark:text-dark-secondary-400">
                                  {item.numberOfProduct} x {(item.price*50).toFixed(0)} EGP</p>
                                  {item.selectedColor && 
                                    <div className="flex items-center gap-1 md:gap-2 mt-1">
                                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.selectedColor.hex_value}}></div>
                                     <span className="text-sm text-light-secondary-500 dark:text-dark-secondary-400">{item.selectedColor.color}</span>
                                    </div>
                                  }
                              </div>

                            </div>);})}
                        
                      </div>  
                    </div>
                  </div>
                ))}
              </div>
            )}
</div>
        </div>

      </div>
    </div>
  );
}