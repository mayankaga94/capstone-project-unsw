import React, {useState} from 'react';


export default function WishList() {

    const [wishList, setWishlist] = useState([]);

    return (
        <div className ="wihlishtouterWrap goalset col-xs-12 col-lg-4 col-md-4">
               
            <span className =" addwishlist"><i className="fa fa-heart" aria-hidden="true"><span className="fa-text">Add To Wishlist</span></i> 
                </span>
        </div>
    )
}
