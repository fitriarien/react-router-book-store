import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function FormBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ newBook, setNewBook ] = useState({
        title: "",
        author: "",
        descriptions: "",
        cover: "",
        price: "",
        stocks: ""
    })

    function toChange(e) {
        const { id, value } = e.target;

        setNewBook(currBook => {
            return { ...currBook, [ id ]: value };
        });
    }

    function toSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:8080/api/bookrepo/", {
            method: 'POST',
            body: JSON.stringify(newBook),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error(response.status)
            }
        })
        .then((data) => {
            dispatch({type: 'ADD_BOOK', payload: data})
            // console.log(books);
            // const bookIds = books.map(book => book.id);
        
            // setBooks(currBook => {
            //     return [ ...currBook, { id: Math.max(...bookIds)+1, ...data } ];
            // });
            console.log("Book added.");
            navigate('/books');
            
        })
        .catch(err => {
            console.log(err);
        })
        
        setNewBook({ 
            title: "",
            author: "",
            descriptions: "",
            cover: "",
            price: "",
            stocks: ""
        });
    }

    function upload(e) {
    
        const fileName = e.target.files[0].name;
        const storageRef = ref(storage, `${fileName}`);
    
        uploadBytes(storageRef, e.target.files[0])
        .then(snapshot => {
            console.log("Successfully uploaded."); 
            return getDownloadURL(storageRef) // get url storage
        })
        .then(downloadUrl => {
            console.log(downloadUrl);
            setNewBook(currBook => {
                return { ...currBook, cover: downloadUrl }
            });
        })
        .catch(err => {
          console.log(err);
          alert('Error uploading file. Please try again.');
        })
    }

    return (
        <div>
            <form id="book-form" onSubmit={toSubmit}>
                <div id="title-form">
                    <h2>ADD NEW BOOK!</h2>
                </div>
                <div id='field-form'>
                    <label className='col-25'>Title</label>
                    <input type="text" id="title" value={newBook.title} onChange={toChange}/>
                </div>
                
                <div id='field-form'>
                    <label className='col-25'>Author</label>
                    <input type="text" id="author" value={newBook.author} onChange={toChange}/>
                </div>
                
                <div id='field-form'>
                    <label className='col-25'>Descriptions</label>
                    <input type="text" id="descriptions" value={newBook.descriptions} onChange={toChange}/>
                </div>
                
                <div id='field-form'>
                    <label className='col-25'>Price</label>
                    <input type="number" id="price" value={newBook.price} onChange={toChange}/>
                </div>
                
                <div id='field-form'>
                    <label className='col-25'>Stocks</label>
                    <input type="number" id="stocks" value={newBook.stocks} onChange={toChange}/>
                </div>
                
                <div id='field-form'>
                    <label className='col-25'>Cover</label>
                    <input type="file" id="cover" accept='image/*' placeholder='Upload Book Cover' onChange={upload}/>
                </div>
                
                <div>
                    <button className='bg-blue-500 hover:bg-blue-700' id="submit-button" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormBook;
