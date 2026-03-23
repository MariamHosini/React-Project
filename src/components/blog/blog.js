import React from 'react'
import { Link } from "react-router-dom";
import image from "../../assets/Group.webp";
import shadow from "../../assets/shadow.webp"
import skinProduct from "../../assets/skinProduct.webp"
import rouge from "../../assets/rouge.webp"

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Lipsticks for the Season",
    excerpt: "From bold corals to sun-kissed nudes, discover the high-pigment shades that define your summer glow...",
    image: rouge,
    date: "Mar 20, 2026",
    category: "Product Tips",
  },
  {
    id: 2,
    title: "The Ultimate Smokey Eye Guide",
    excerpt: "Learn the professional techniques to blend, sculpt, and create a captivating gaze that lasts all night...",
    image: shadow,
    date: "Mar 15, 2026",
    category: "Tutorials",
  },
  {
    id: 3,
    title: "Pre-Makeup Skincare Rituals",
    excerpt: "Unlock the secret to a seamless application. Prepare your skin for a radiant, long-lasting finish...",
    image: skinProduct,
    date: "Mar 10, 2026",
    category: "Skincare Tips",
  },
];

export default function blog() {
  return (
    <>
    <div className="flex flex-col px-0 md:px-12 lg:px-6 items-center">
      {/* Banner */}
      <div className="flex flex-col justify-center items-center bg-light-primary-400 bg-cover bg-no-repeat bg-center w-full
        lg:h-[300px] md:h-[250px] h-[350px] rounded-none md:rounded-3xl"style={{ backgroundImage: `url(${image})` }} >
          <h1 className="text-[36px] md:text-48 lg:text-64 text-center pb-2 font-bold font-playfair dark:text-dark-neutral-800 text-light-neutral-50">
          <i className="!hidden md:!block fa-solid fa-star absolute lg:left-[20%] xl:left-[25%] md:left-[15%] text-yellow-100 text-xl animate-pulse"></i>
           Insights & Inspiration</h1>
          <p className="w-[80%] md:w-[65%] text-center text-light-secondary-100 font-opensans text-16 dark:text-dark-neutral-600">
            Explore expert tips, trends, and stories that inspire a healthier, more beautiful you. Stay updated with the latest in beauty
            <i className="!hidden md:!block fa-solid fa-star absolute bottom-18 right-[16%] text-lg animate-pulse text-yellow-100"></i>{" "}
              , wellness, and lifestyle.</p>
      </div>
      {/*paragraphs & quates */}
      <div className="lg:w-[70%] md:w-[80%] w-[90%] flex flex-col mt-16 md:mt-18 lg:mt-32 gap-6  ">
        <div className='flex flex-col gap-5' >
          <h4 className='font-bold text-24 md:text-28 font-playfair text-light-secondary-900 dark:text-dark-secondary-300'>
           Embracing Beauty Without Compromise
          </h4>
          <p className='font-opensans text-14 md:text-16 text-light-secondary-600 dark:text-dark-secondary-500'>
            In today's fast-paced world, achieving a flawless, expressive look shouldn't be complicated or overwhelming. At FemmeFlair, 
            we believe that every woman deserves a curated makeup collection that not only fits into her lifestyle but also empowers her
             self-expression. That's why we've designed our range of high-performance products to help you glow beyond limits—whether you're
              looking for a natural, defined everyday look or a bold, dramatic touch, our innovative cosmetic solutions are here to
             simplify your beauty journey.
          </p>
        </div>
        <div className='flex flex-col gap-5' >
          <h4 className='font-bold text-24 md:text-28 font-playfair text-light-secondary-900 dark:text-dark-secondary-300'>
            Our Innovation
          </h4>
          <p className='font-opensans text-14 md:text-16 text-light-secondary-600 dark:text-dark-secondary-500'>
            Our commitment to pushing boundaries means we consistently seek out the latest advancements in cosmetic technology. We combine skin-loving ingredients with cutting-edge techniques to create products that work synergistically with your natural beauty. Each formula
             is meticulously curated to provide flawless coverage, long-lasting wear, and stunning vibrancy while highlighting your unique features.
          </p>
        </div>
        <div className='flex flex-col gap-5' >
          <h4 className='font-bold text-24 md:text-28 font-playfair text-light-secondary-900 dark:text-dark-secondary-300'>
          Curated Collections for Every Tone and Occasion
          </h4>
          <p className='font-opensans text-14 md:text-16 text-light-secondary-600 dark:text-dark-secondary-500'>
           No two women are alike, and neither are their personal styles. That's why our products are designed to cater to a variety of skin tones and
            application needs. From lightweight, breathable foundations with soft finishes to bold, high-pigment lip colors and curated eyeshadow 
            palettes, our collection offers a perfect choice for every moment. Whether
            your goal is a defined "no-makeup" look or an artistic, dramatic statement, our innovative formulas ensure you express yourself perfectly.
          </p>
        </div>
        <div className="flex justify-center items-center dark:bg-dark-secondary-800  bg-light-secondary-100 py-6 rounded-3xl text-center 
          px-6 lg:px-2">
            <p className="text-light-secondary-800 italic dark:text-dark-secondary-300  font-serif lg:text-24 text-16 ">
              “ True glamour is the confidence to be yourself—unlock your unique expression with curated beauty that inspires. ”
            </p>
        </div>
        <div className='flex flex-col gap-5' >
          <h4 className='font-bold text-24 md:text-28 font-playfair text-light-secondary-900 dark:text-dark-secondary-300'>
          Mindful Beauty, Empathetic Expression
          </h4>
          <p className='font-opensans text-14 md:text-16 text-light-secondary-600 dark:text-dark-secondary-500'>
           Transforming your makeup routine doesn't stop at the final look; it's also about making responsible choices
           for yourself and the world. We're proud to use ethically sourced ingredients, with a focus on cruelty-free formulas and, where possible,
          sustainable packaging to deliver products that are as kind to your skin as they are responsible to the planet. You can express yourself
           with complete confidence, knowing that your FemmeFlair makeup is clean, conscious, and stunning.
          </p>
        </div>
         <div className='flex flex-col gap-5' >
          <h4 className='font-bold text-24 md:text-28 font-playfair text-light-secondary-900 dark:text-dark-secondary-300'>
           Master the Art of Expression
          </h4>
          <p className='font-opensans text-14 md:text-16 text-light-secondary-600 dark:text-dark-secondary-500'>
           True beauty isn’t about wearing a mask; it’s about having the professional tools to reveal your inner confidence. Our approach focuses on
            high-pigment, seamlessly blendable formulas that empower you to create a personalized, striking look—from soft everyday elegance to
            high-fashion drama. By merging creative artistry with cosmetic innovation, we offer products designed to define, sculpt, and highlight
            your features flawlessly. With FemmeFlair, you’re not just applying makeup; you’re showcasing your unique, radiant expression to the world.
          </p>
        </div>
      </div>
      {/* Blog Grid */}
      <div className='mt-16 md:mt-18 lg:mt-24 w-[90%]'>
        <h2 className='font-bold text-24 md:text-32 font-playfair text-light-secondary-900 dark:text-dark-secondary-300'>Latest from Our Blog</h2>
      </div>
      <div className="mb-16 md:mb-18 lg:mb-32 w-[90%] mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-dark-neutral-800 
            rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className=" flex flex-col gap-3 p-4 dark:border-b-light-secondary-700 border-b-[2px] 
            dark:border-x-light-secondary-700 border-x-[2px] rounded-b-2xl ">
              <span className="text-sm text-light-secondary-900 dark:text-dark-secondary-300">
                {post.date} • {post.category}
              </span>
              <h2 className="text-xl font-bold text-light-secondary-900 dark:text-dark-secondary-300">
                {post.title}
              </h2>
              <p className="text-light-secondary-600 flex-grow line-clamp-3 text-sm">
                {post.excerpt}
              </p>
              <Link
                to={`/blogPost/${post.id}`}
                className="mt-auto inline-block text-light-primary-500 dark:text-dark-secondary-300 font-bold hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}
