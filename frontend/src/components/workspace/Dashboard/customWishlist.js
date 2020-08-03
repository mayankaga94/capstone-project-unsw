import React from 'react'
import UserContext from '../../context/usercontext'

export default function CustomWishlist(props) {

const { userData, setUserData } = useContext(UserContext);






export default function CustomWishlist() {




    const loggedINUser = userData && userData.user && userData.user.userid




    var raw = JSON.stringify({"userid":loggedINUser,"wishlistname": wishlistName.title});
    var requestOptions = {
    method: 'POST',
    headers : {
        "Content-type": "application/json"
    },
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:5000/user/wishlistName", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));




    return (
        <div className = "customWishlistx goalset col-xs-12 col-lg-6 col-md-6 col-sm-6">
            <div className = "common-marginborder">
            <div> <div className = "libraryHeader"> Your Collection</div></div>
            
                    <div className= "wishlistHeader">

                    </div>
                    <div className = "wishlist-section">
                        Your wishlist is empty

                  <div className = "emptyCart">  <i class="fa fa-cart-plus" aria-hidden="true"></i></div>     
                    </div>
                    </div>
        </div>
    )
}
