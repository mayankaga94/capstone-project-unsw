import React from 'react'
import { useState } from 'react'
import WishList from './Dashboard/wishlist'



export default function CustomWishlist() {


const [wishlist, setWishlist] = useState([])
const[wishlistName, setWishlistName] = useState({})

const createWishlist = () =>{

    setWishlist([{created: "false",title:"ssd", list : []},...wishlist])
}

const handleChange = (e) =>{

    e.preventDefault()
    setWishlistName({title: e.currentTarget.value})
}

const createWishlistTitle = () =>{

    const newWishlist = {
        title: wishlistName.title,
        created: "true",
        list : []
    }
    setWishlist([newWishlist, ...wishlist])
}


const addTolist  = (i) =>{
   alert("hi")
}

    return (
        <div className = "customWishlistx goalset col-xs-12 col-lg-6 col-md-6 col-sm-6">
            <div className = "common-marginborder">
            <div> <div className = "libraryHeader"> Your Collection</div></div> 
                    <div className= "wishlistHeader">
                            <div>
                               <input  placeholder = "enter the name of your wishlist"  onChange = {handleChange}/> ,
                                <button onClick  = {()=>{
                       
                            createWishlistTitle()
                            }}>Click to creatre</button>

                            <div>
                                   {wishlist.map(({created, list, title}, i ) => (

                                       <div>
                                            <input type = "checkbox" onClick= {addTolist(i)} /> <h2> {title}</h2>
                                            <div>
                                                list goes here
                                                </div>
                                           </div> 
                                   ))}
                            </div>
                            </div>
                    </div>
                    <div className = "wishlist-section">
                        Your wishlist is empty
                        <button onClick = {() =>createWishlist()}> Create a new wishlist</button>

                         <div className = "emptyCart">  <i class="fa fa-cart-plus" aria-hidden="true"></i></div>     
                       </div>
                    </div>
        </div>
    )
}
