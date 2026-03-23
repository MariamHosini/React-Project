import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-fadeIn">
      {/* 1. Header Section (Cover + Photo) */}
      <div className="relative mb-24">
        {/* Cover Image Placeholder */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-pink-100 to-rose-200 dark:from-dark-secondary-900 dark:to-neutral-900 rounded-3xl shadow-sm"></div>
        
        {/* Profile Info Overlay */}
        <div className="absolute -bottom-16 left-8 flex items-end gap-6">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-dark-neutral-800 p-2 rounded-full shadow-xl">
            <div className="w-full h-full bg-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-serif font-bold border-4 border-pink-100 dark:border-dark-neutral-700">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "My Orders", value: "05", icon: "📦" },
              { label: "Wishlist", value: "12", icon: "❤️" },
              { label: "Reviews", value: "03", icon: "✨" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-neutral-800 p-6 rounded-3xl text-center border border-neutral-50 dark:border-white/5 hover:shadow-md transition-shadow">
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <span className="text-2xl font-bold block dark:text-white">{stat.value}</span>
                <span className="text-xs text-neutral-400 uppercase tracking-tighter">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Recent Activity / Order History Placeholder */}
          <div className="bg-white dark:bg-dark-neutral-800 p-8 rounded-3xl shadow-sm border border-neutral-100 dark:border-white/5">
            <h3 className="text-lg font-bold mb-6 dark:text-white">Recent Beauty Picks</h3>
            <div className="flex flex-col items-center py-12 text-center">
              <div className="w-20 h-20 bg-neutral-50 dark:bg-dark-neutral-900 rounded-full mb-4 flex items-center justify-center">
                <i className="fa-solid fa-bag-shopping text-neutral-300 text-2xl"></i>
              </div>
              <p className="text-neutral-500 max-w-xs">Your shopping bag is waiting for its first FemmeFlair treasure.</p>
              <button className="mt-6 text-pink-500 font-bold underline decoration-2 underline-offset-4">
                Start Shopping
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}