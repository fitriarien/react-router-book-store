import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BookDetail() {
    const { id } = useParams();

    const [bookDetail, setBookDetail] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/api/bookrepo/${id}`, {
            method: "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            setBookDetail(data);
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
  
    const formattedPrice = formatter.format(bookDetail.price);

    return (
        <div className='absolute top-30 left-24 flex flex-col justify-center p-5'>
            <div className='px-5 items-center'>
                <img src={bookDetail.cover} alt='' width="200" height="250"/>
            </div>
            <div className='px-5 flex flex-col justify-between'>
                <div className=''>
                    <h3 className='text-2xl font-bold'>{bookDetail.title}</h3>
                    <h4 className=''>Author: {bookDetail.author}</h4>
                    <p className='py-2 text-justify pr-5'>Descriptions: {bookDetail.descriptions}</p>
                    <h4 className=''>Price: {formattedPrice}</h4>
                    <h4 className=''>Stocks: {bookDetail.stocks}</h4>
                </div>
                <div className='book-button'>
                    <button className='bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-sm'>
                        Add to Cart
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 px-4 mr-5 rounded-sm'>
                        Buy
                    </button>
                </div>
            </div> 
        </div>
    );
}
