import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';

export default function Books() {
    // const [ books, setBooks ] = useState([]);
    const dispatch = useDispatch();
    const books = useSelector(state => state.book)


    useEffect(() => {
        fetch('http://localhost:8080/api/bookrepo/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then(response => {
            if (response.ok) {
                console.log(response.status);
                return response.json();
            } else {
                throw new Error(response.status);
            }
        })
        .then(data => {
            // setBooks(data);
            dispatch({ type: "INITIAL_BOOKS", payload: data })
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

    console.log(books);

    return(
        <div className='books'>
            <div className='book-form'>
                <NavLink to={'/book/add'} 
                    className='m-5 absolute top-20 right-10 text-right bg-blue-500 text-white rounded-md py-2 px-4'>
                    Add New Book
                </NavLink>
            </div>
            <div className='book-list'>
                {books.map(book => (
                    <div className='book-details relative top-20' key={book.id}>
                        <div className='book-cover'>
                            <img src={book.cover} alt='' width="150" height="200" className='border'/>
                        </div>
                        <div className='book-detail'>
                            <div className='book-info'>
                                <h3>{book.title}</h3>
                                <p>{book.author}</p>
                                <h4>{formatter.format(book.price)}</h4>
                            </div>
                            <div className='book-button '>
                                <NavLink to={`/book/${book.id}`} className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded-sm'>
                                    <button >Detail</button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}