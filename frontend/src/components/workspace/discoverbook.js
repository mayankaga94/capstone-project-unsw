import React, { useContext, useEffect, useState } from 'react'
import Booknew  from './booknew'


export default function Discoverbook () {
    const [books, setsbooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = async() =>{
    const url = "http://localhost:5000/booksFetch";
    const response = await fetch(url);
    const data = await response.json();

    setsbooks(data.result)
    }

        return (
            <div>
                <h1 style = {{marginTop : "100px", fontSize: "28px"}}>
                    Discover Your Next Book
                </h1>
                <div>
                    <ul classNAme = "tabsSection" style= {{display  : "block", margin: "30px 0 50px 0", padding : "0"}}>
                        <li style = {{minWidth: "200px", background : "#f1f1f1" ,cursor : "pointer",display : "inline-block",  listStyle : "none", padding : "10px"}}>
                            Latest Release
                        </li>
                        <li style = {{minWidth: "200px", background : "#f1f1f1" ,cursor : "pointer", display : "inline-block",listStyle : "none", padding : "10px", margin : "10px"}}>
                            Most Popuar
                        </li>
                        <li style = {{minWidth: "200px", background : "#f1f1f1" ,cursor : "pointer", display : "inline-block", listStyle : "none", padding : "10px", margin : "10px" }}>
                            Award winning
                        </li>
                    </ul>
                </div>
                <div>
                {books.map(books => (
                    <Booknew  author = {books.author}  ISBN = {books.ISBN} url = {books.image} name = {books.title}  route = "Home"/>  ))}

                   
                </div>
            </div>
        )
}
