import React from 'react'
import img1 from '../../../public/images/Screenshot 2025-02-11 173930.png'
export default function Dash() {
    return (
        <div className='pt-24 p-5'>
            <div className=' justify-center flex items-center w-full'>
                <h1 className='text-4xl'>Sales Chart</h1>


            </div>
            <div className='pl-5'>
                <img src={img1} alt="sample chart" />
            </div>
        </div>
    )
}
