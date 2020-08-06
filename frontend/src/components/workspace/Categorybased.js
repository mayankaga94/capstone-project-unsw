import React, { useState } from 'react'
import Booknew from './booknew'
import { Link } from 'react-router-dom'
export default function  Categorybased() {

        const [category, setCategory]  = useState([])
        const categoryBooks =(genre) =>{

            const url = "http://localhost:5000/searchbygenre"
            fetch(url,
                {
                method : "POST",
                headers : {
                    "Content-type": "application/json"
                },
                body : JSON.stringify({genre})
                 })
                 .then((response) => {          
                    response.json().then((data) => {
                            setCategory(data.result)
                        });
                    });
        }

        return (
            <div>
                <h1> Books based on Genres</h1>
                    <ul className = "genresWrap">
                    {/* <Link to  ={'/bookdetails/' + this.props.ISBN}> */}
                        <li className = "genresList" onClick = {()=> categoryBooks("Humor" +' ' +"and" + ' '+ "Comedy") }>
                            <div className = "genresBased">
                                <img src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1394178867l/4138.jpg"></img>
                                <div className = "genresBasedHeading" >
                                    <h1>Sci-fi</h1>
                                </div>                  
                            </div>
                        </li>
                        {/* </Link> */}
                        <li className = "genresList" onClick = {()=> categoryBooks("Art")}>
                            <div className = "genresBased" >
                                <img src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1429229158l/33457.jpg"></img>
                                <div className = "genresBasedHeading">
                                    <h1>Art</h1>
                                </div>                     
                            </div>
                        </li>
                        <li className = "genresList" onClick = {()=> categoryBooks("Horror") }>
                            <div className = "genresBased">
                                <img src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1473956249l/30268522._SY475_.jpg"></img>
                                <div className = "genresBasedHeading">
                                    <h1>Horror</h1>
                                </div>
                           
                            </div>
                        </li>
                        <li className = "genresList" onClick = {()=> categoryBooks("thriller") }>
                            <div className = "genresBased">
                                <img src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1558869586l/227443._SY475_.jpg"></img>
                                <div className = "genresBasedHeading">
                                    <h1>thriller</h1>
                                </div>
                            </div>
                        </li>

                        


                    </ul>
                    <div>
                    {category.map((category,index) => (
                    <Booknew key = {"category"+ index} author = {category.author}  ISBN = {category.ISBN} url = {category.image} name = {category.title}  route = "Home"/>  ))
                }
                    </div>
            </div>
        )
}


