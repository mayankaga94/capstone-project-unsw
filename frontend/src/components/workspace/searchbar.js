import React, { useState } from 'react'
import Booknew from './booknew'
import styled from 'styled-components'
import { useParams} from 'react-router-dom'
import Allbooks from './Allbooks'

import Book  from './bookPage'


    // fetch the particular id of the book

export const SearchbarInput = styled.input`
    width :400px;
    min-height :50px;
    border : 1px solid #c2c2c2;
    padding-left : 5px;
    outline : none;

`
export const Seatchbutton = styled.button`

min-height :50px;
color: white;
padding : 15px;
font-weight  : 600;
border : 2px solid #ccc;
background  : #d1d1d1;
border : none;
outline  : none;
font-size: 14px;
transition: 0.3s;
&:hover  {
    
    background :#a6a1a1 ;
}

`

export  default function Searchbar() {

        const [search, setSearch]  = useState([])
        const[bookFound, setBookfound] = useState([])
        const { itemSeatched }= search



        // const id  = useParams();
        // const bookreviewid = id

        
        
       
        const searchBook =(search) =>{
            let booktitle = search
            const url = "http://localhost:5000/searchbytitle"
            fetch(url,
                {
                method : "POST",
                headers : {
                    "Content-type": "application/json"
                },
                body : JSON.stringify({booktitle})
                })
                .then((response) => {          
                    response.json().then((data) => {
                        setBookfound(data.result)
                        });
                    });
        }
        return (
            <div>     
                <SearchbarInput  type="text" placeholder="Search for a book" aria-label="Search" onChange =  {(e) =>setSearch(e.target.value)} />
                <Seatchbutton color="unique" onClick = {() => searchBook(search)}>Search  </Seatchbutton>
                <div style={{marginBottom: '50px'}}>
                <div>{bookFound && bookFound.length>0?`${bookFound.length} books found`: ''}</div>
                {bookFound.map((bookFound,index) => (                   
                   <Booknew key = {"allBookfound"+ index} author = {bookFound.author}  ISBN = {bookFound.ISBN} url = {bookFound.image} name = {bookFound.title}  route = "Home"/>  )
                        
                    )
                }
                </div>
            </div>
        )
    }
