import React , { useContext, useState, useEffect}from 'react'
import UserContext from '../../../context/usercontext'

import WishlistComponent from './WishlistComponent'



export default function CustomWishlist(props) {




const { userData, setUserData } = useContext(UserContext);

const [wislistNamez, setWishlistNamez] = useState([])

const loggedINUser = userData && userData.user && userData.user.userid


const deleteWishlistz = (name) =>{

    alert("hi",name)


    setWishlistNamez(wislistNamez.filter((k, index) => k.reviewid !== wislistNamez.name ))
}

useEffect(() =>{
    const loggedINUser = userData && userData.user && userData.user.userid
    var raw = JSON.stringify({"userid":loggedINUser});
    var requestOptions = {
    method: 'POST',
    headers : {
        "Content-type": "application/json"
    },
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:5000/user/wishlistfetch", requestOptions)
    .then(response => response.json())
    .then(result =>{
              
                setWishlistNamez(result.result)
                },
        

        )
    .catch(error => console.log('error', error));


},[])

    return (
        <div className = "customWishlistx goalset col-xs-12 col-lg-6 col-md-6 col-sm-6">
            <div className = "common-marginborder">
            <div> <div className = "libraryHeader"> Your Collection</div></div>
                    <div className= "wishlistHeader">

                    </div>

                    {wislistNamez?  
                    <div>  
                   { wislistNamez && wislistNamez.map((wislistNamez,index) =>(
                        <div classNAme = "wishlist-heading">
                                  <WishlistComponent  user = {loggedINUser} index = {index}  deletewislist = {()=>deleteWishlistz} category = {wislistNamez.wishlistname}  noOfBooks = {wislistNamez.count} />
                        </div>
                   ))} 
                    </div> 
                    : 
                    <>
                    <div className = "wishlist-section">
                    Your wishlist is empty
                    <div className = "emptyCart">  <i class="fa fa-cart-plus" aria-hidden="true"></i></div>     
                    </div>
                        </>

                    }
            </div>
            </div>
 )}