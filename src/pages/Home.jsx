import './Home.css'
import React from 'react'

import image1 from '../../public/images/15.jpg'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <div className="pt-20 bg-gradient-to-b from-gray-100 to-gray-300 ">


            <div className=" flex items-center justify-between px-10 py-10  ">
                {/* Left: Text */}
                <h1 className="text-5xl font-bold w-1/2 pl-24">Purchase hassle-free!</h1>

                {/* Right: Image */}
                <img src={image1} alt="Product" className="w-64 object-cover rounded-lg" />
            </div>

            <div className='flex justify-center h-52 space-x-5' >
                <h1 className="text-4xl font-bold text-shadow-lg">
                    1000's of products on a single click
                </h1>

                <div>
                    <Link to='/userProducts'
                        className="bg-black text-white rounded-full text-lg font-semibold p-3  shadow-md hover:bg-gray-800 animate-bounce"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
            <div className='bg-black h-7'>
                <h1 className='text-white'>ahammedali.puthuppalli@gmail.com</h1>

            </div>
        </div>
    )
}
