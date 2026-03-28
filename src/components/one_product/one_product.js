import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import {products} from '../../data/mock_data'
export default function One_product() {
    const {id} = useParams();
    const [product , setProduct] = useState();
    const [loading , setLoading] = useState(false);
      const generateRandomStock = () => {
        const min = 0;
        const max = 20;
        const random = Math.random() * (max - min) + min;
        return random.toFixed(0); 
        };
    useEffect(()=>{
        if(id && id!=null){
        const new_id = atob(id);
        (async()=>
            {
        setLoading(true);
        const data  = await new Promise((resolve)=>{
            const singleProduct = products.find(p=>String(p.id) === new_id)
            resolve(singleProduct)
            console.log(singleProduct)
            
        })
        setProduct({...data,stock:generateRandomStock()});
        })();
        setLoading(false);
        }
    },[id])
  return (
   <>
        <div className='flex items-stretch px-5 md:px-12 lg:px-6 mt-10  '>
            {!loading && product?
                <div className="w-full flex flex-col md:flex-row justify-between ">
                    {/*right side */}
                    <div className="w-[100%] md:w-[40%] h-96 flex justify-center items-center">
                        <img src={product.api_featured_image} alt={product.name}
                         className='h-full w-auto object-contain'/>
                    </div>
                    <div className="mt-8 w-[100%] md:w-[50%] flex flex-col gap-4">
                        <div className="rounded-lg bg-light-primary-700 dark:bg-dark-secondary-300 py-2 px-4 text-center w-fit">
                            <h2 className=" text-sm md:text-lg  font-playfair uppercase font-bold text-light-secondary-200
                                 dark:text-dark-neutral-400 ">
                            {product.brand}</h2>
                        </div>
                        <p className='text-light-secondary-700 text-24 md:text-28 font-bold font-playfair 
                        dark:text-dark-secondary-500'>{product.name}</p>
                        <p className=' text-20 md:text-24 font-bold font-playfair first-letter:uppercase
                        text-light-secondary-500 dark:text-dark-secondary-700'>{product.category}</p>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                            {product.product_type !=="eyshadow"&&
                                product.product_colors.map((color)=>{
                                    return(
                                        <>
                                        <div key={product.product_colors.colour_name} className='flex flex-col text-center items-center'>
                                            <div className='h-8 w-8 rounded-full'
                                            style={{backgroundColor:color.hex_value}}></div>
                                            <p>{color.colour_name}</p>
                                        </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            :
                <div className="flex flex-col items-center justify-center py-20 w-full">
                    <div className="w-12 h-12 border-4 border-light-secondary-100 border-t-light-secondary-800 dark:border-dark-secondary-500 dark:border-t-dark-neutral-800 rounded-full animate-spin"></div>
                    <p className="mt-4 font-playfair text-lg text-light-secondary-800 dark:text-dark-secondary-300 animate-pulse">
                        Preparing the product...
                    </p>
                </div>
            }
           
        </div>
   </>
  )
}
