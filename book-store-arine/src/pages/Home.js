import React from 'react';
import image from '../assets/book-home.png';

function Home() {

    const imageUrl = image;

    return (
        <div className="bg-cover bg-center h-full w-full flex flex-row justify-around">
            <div className='flex flex-col pl-10 py-52 font-extrabold'>
                <h1 className='font-bold text-5xl'>New & Trending</h1>
                <h1 className='font-semibold text-2xl'>Explore new books everyday</h1>
            </div>
            <div className='py-20'>
                <img src={imageUrl} alt='book-home-item'/>
            </div>
        </div>
    );
}

export default Home;
