import React from "react";
import { useParams, Link } from "react-router-dom";

import shadow from "../../assets/shadow.webp";
import skinProduct from "../../assets/skinProduct.webp";
import rouge from "../../assets/rouge.webp";
const blogPosts = [
  {
    id: 1,
    title: "Summer Radiance: Top 5 Lipsticks for the Season",
    content: `As the sun takes center stage, your beauty routine deserves a vibrant upgrade. Summer 2026 is all about that "effortless glow," and nothing completes the look like the perfect lip shade. 

    This season, we’re moving beyond basic tints to high-pigment formulas that stay comfortable under the sun. From our signature "Sunset Coral" that brings warmth to any skin tone, to the sophisticated "Mocha Nude" for those beach-side brunches, we’ve curated the ultimate top 5. 

    Pro Tip: To ensure your summer shade lasts through the humidity, always start with a light lip exfoliation and define your edges with a matching waterproof liner. Your smile is your best accessory—make it pop!`,
    images: rouge,
    date: "Mar 20, 2026",
    category: "Product Tips",
  },
  {
    id: 2,
    title: "Mastering the Night: The Ultimate Smokey Eye Guide",
    content: `There is nothing more timeless than a perfectly blended smokey eye. It’s the ultimate expression of drama and elegance. However, the secret isn't just in the dark shadows; it's in the technique of "The Seamless Blend."

    Start by prepping your lids with a high-grip primer to prevent creasing. Use a neutral transition shade before diving into the deep charcoals or rich bronzes. The key is to keep the darkest pigment close to the lash line and diffuse it upwards.

    To finish the FemmeFlair way, add a touch of champagne shimmer to the inner corners of your eyes. It opens up the gaze and adds that "high-fashion" sparkle that turns heads the moment you enter the room.`,
    images: shadow,
    date: "Mar 15, 2026",
    category: "Tutorials",
  },
  {
    id: 3,
    title: "The Flawless Canvas: Pre-Makeup Skincare Rituals",
    content: `Professional makeup artists all agree on one thing: your makeup is only as good as the skin underneath. A "Flawless Canvas" isn't born; it's prepped. 

    Before you reach for your foundation, your skin needs hydration and protection. Start with a lightweight, hyaluronic-based serum to plump the skin, followed by a non-greasy moisturizer that locks in water without creating a slippery surface. 

    Don't forget the "Golden Rule": always allow your skincare to absorb for at least three minutes before applying primer. This prevents "pilling" and ensures your FemmeFlair foundation melts into the skin for a finish that looks like a second skin, only better.`,
    images: skinProduct,
    date: "Mar 10, 2026",
    category: "Skincare Tips",
  },
];

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === parseInt(id));
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center ">
        <h1 className="text-6xl md:text-8xl font-bold text-light-secondary-900 dark:text-dark-secondary-500 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-light-secondary-900 dark:text-dark-secondary-500 dark:text-dark-secondary-100 mb-2">
          Oops! Page not found 💄
        </h2>
        <p className="text-light-secondary-600 dark:text-dark-secondary-400 mb-6 max-w-md">
          Looks like this beauty got lost... Let’s get you back to something
          gorgeous!
        </p>
        <a
          href="/blog"
          className="h-[50px] w-[100%] md:w-[20%] "
        >
            <div className="p-3 flex justify-center items-center rounded-full border-light-secondary-50 
                dark:text-dark-primary-500   dark:bg-dark-secondary-800 dark:border-dark-secondary-800
                 dark:hover:border-dark-secondary-700 bg-light-secondary-400 border-[2px] 
                  hover:bg-light-secondary-200 hover:dark:bg-dark-secondary-700 text-light-primary-400 font-playfair text-20 font-bold ">
                     ← Back to Blog
                  </div>
         
        </a>
      </div>
    );
  }
  return (
    <article className="max-w-5xl mx-auto px-6 md:px-12 py-16">
      <nav className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-light-secondary-500">
        <span className="font-bold text-light-primary-700 px-2 py-1 bg-light-secondary-400 rounded-md">
          {post.category}
        </span>
        <span>{post.date}</span>
      </nav>

      {/* Main Title */}
      <header className="mb-12">
        <h1 className=" md:text-48 text-28 font-serif font-bold text-light-secondary-900 dark:text-dark-secondary-500 leading-tight">
          {post.title}
        </h1>
      </header>

      {/* Grid Layout for Content & Images */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Images */}
        <div className="lg:col-span-6 space-y-8">
          <img
            src={post.images}
            alt={post.title}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Right: Content Text */}
        <div className="lg:col-span-6 lg:sticky lg:top-24">
          <div className="text-light-secondary-700 dark:text-dark-secondary-300
           md:text-20 text-16 leading-relaxed space-y-8 first-letter:text-6xl
           first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-dark-secondary-700">
            {post.content
              .split("\n")
              .map(
                (paragraph, i) =>
                  paragraph.trim() && <p key={i}>{paragraph.trim()}</p>,
              )}
          </div>

          {/* Luxury Brand Quote */}
          <div className="mt-12 p-8 bg-neutral-50 dark:bg-neutral-900 border-l-2 border-light-primary-600">
            <p className="italic text-lg text-neutral-600 dark:text-neutral-400">
              "Redefining beauty through the lens of FemmeFlair artistry."
            </p>
          </div>

          <Link
            to="/blog"
            className="mt-12 group flex items-center gap-2 text-light-primary-800 dark:text-dark-secondary-300 font-bold text-lg
             hover:text-dark-secondary-700 dark:hover:text-dark-secondary-700 transition-colors"
          >
            <span className="group-hover:-translate-x-2 transition-transform">
              ←
            </span>
            Explore More Stories
          </Link>
        </div>
      </div>
    </article>
  );
}
