import React, { useEffect, useState } from 'react'

import Booknew  from './booknew'
import Searchbar from './searchbar'
import Bookdetails from './bookdetails'

const Allbooks = () => {
     const [books, setsbooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = async() =>{
    const url = "http://localhost:5000/user/booksFetch";
    const response = await fetch(url);
    const data = await response.json();


    setsbooks(data.result)
    }
        return (
            <div>
                <h1 > All Books</h1>
                <Searchbar />
                {books.map(books => (
                    <Booknew  author = {books.author}  ISBN = {books.ISBN} url = {books.image} name = {books.title}  route = "Home"/>  ))}
            </div>
        )
}
export default Allbooks
