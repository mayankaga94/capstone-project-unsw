import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom'

export default function Sublist(props) {

    const [bookRead, setbookRead] =useState({delete:0})
    const wishlistName = props.name
    const index = props.index
    const user = props.user
    const title = props.title
    const author = props.author
    
    const deleteitem = (name, isbn, user, index, state)=>{
        setbookRead({delete:1})
        const wishlistName = name
        const userid = user
        const ISBN = isbn

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
          })
    }

    return (
          <div>
            <div className = "wishlistContainer clearfix">  
                  {bookRead.delete === 1 ? null :
                  <>
                          <div className ="listcontainer"> <div>{author}</div>
                          <div>
                           By:  {title}
                            </div></div>
                          <button   onClick = {()=>deleteitem(wishlistName,props.isbn,user, index, 1) }  className = "todoDelete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                          <Link to  ={'/bookdetails/' + props.isbn}>  <button className = "tobuy"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Buy</button></Link>
                  </> 
                  }
                  </div>
            </div>
             )
        }