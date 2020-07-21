import React, { useEffect, useState  } from 'react'
import { useParams} from 'react-router-dom'

import Book  from './bookPage'

const Bookdetails = () =>  {
    // fetch the particular id of the book
        const id  = useParams();
        const [book, setbook] = useState([]);

        useEffect(() => {
            getBook();
        }, [])
    
        const getBook = async() =>{
            const url = "http://localhost:5000/user/book"
            fetch(url,
            { method : "POST",
            headers: {
                "Accept": "application/json , text/plain ,*/*",
                "Content-type": "application/json"
             },
             body: JSON.stringify(id)
            })
            .then((response) => {
                response.json().then((data) => {
                        console.log(data.result);
                        setbook(data.result)
                    });
                });
            }
        return (
            <div>
                <h1> Book</h1>

                <div>
                </div>
                {book.map(book => (
                <Book Likes = {book.Likes}  pagecount = {book.pagecount}  ISBN = {book.ISBN}  genre = {book.genre}  description = {book.description}  rating = {book.rating} author = {book.author} url = {book.image} name = {book.title} /> 
                ))} 


                <div className = "similarBooks">
                <div className = "row">
                      <div className = "similar">
                        <h1>
                            Books similar to this book
                        </h1>             
                      </div>
                      <div className= "similarbooks">
                          
                      </div>
                  </div>
                </div>
            </div>
        )
}
export default Bookdetails