import React from 'react'

import {useState} from 'react'
import { Link } from 'react-router-dom'


export default function Sublist(props) {


    const [bookRead, setbookRead] =useState({delete:0})

    const wishlistName = props.name
    const index = props.index
    const user = props.user
    
    const deleteitem = (name, isbn, user, index, state)=>{

        alert("hi")

        setbookRead({delete:1})

        const wishlistName = name
        const userid = user
        const ISBN = isbn

        console.log(wishlistName, userid, ISBN)
        

        var raw = JSON.stringify({wishlistName, userid, ISBN});

        var requestOptions = {
          method: 'DELETE',
          headers : {
            "Content-type": "application/json"
        },
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/user/wishlist/items", requestOptions)
          .then(response => response.text())
          .then((result) => {
            // setReview (...Review, )
          })




    }



    return (
        <div>
                                  <div className = "wishlistContainer clearfix">  

                                        {bookRead.delete === 1 ? null :
                                        <>
                                                <div className ="listcontainer"> {props.isbn}</div>
                                                <button   onClick = {()=>deleteitem(wishlistName,props.isbn,user, index, 1) }  className = "todoDelete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                                                <Link to  ={'/bookdetails/' + props.isbn}>  <button className = "tobuy"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Buy</button></Link>
                                        </> 
                                        }
                                        </div>
                                        </div>
                                        )
                             }




                    //          <Link to  ={'/bookdetails/' + this.props.ISBN}>
                    //          <div><Bookimg src ={this.props.url}></Bookimg></div>
                    //          <div className = "book_description">
                    //              <Bookname>{this.props.name}</Bookname> 
                    //              <Bookname author>{this.props.author}</Bookname>                       
                    //          </div>       
                    //  </Link> 