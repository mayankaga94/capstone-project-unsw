import React from 'react'
import { useState, useEffect, useContext} from 'react'
import WishList from './Dashboard/wishlist'
import UserContext from '../../context/usercontext'

export default function CustomWishlist(props) {



    // console.log(props)

const { userData, setUserData } = useContext(UserContext);
const loggedINUser = userData && userData.user && userData.user.userid
const isbn = props.ISBN
const [wishlist, setWishlist] = useState([])
const[wishlistName, setWishlistName] = useState({})

const createWishlist = () =>{

    console.log("how many times im cak")

    setWishlist([{created: "false",title:"ssd", list : []},...wishlist])
}

const handleChange = (e) =>{

    // e.preventDefault()
    setWishlistName({title: e.currentTarget.value})
}

var raw = JSON.stringify({"userid":loggedINUser});
var requestOptions = {
method: 'POST',
headers : {
    "Content-type": "application/json"
},
body: raw,
redirect: 'follow'
};

// -----------useEffect ------------------//
useEffect(() =>{
    console.log("hi")
    fetch("http://localhost:5000/user/wishlistfetch", requestOptions)
.then(response => response.json())
.then(result => {

    const lists = result.result
    const x = []
    lists.map((lists,index) =>{
        const newWishlistz = {
            title:lists.wishlistname,
            created: "true",
            list : []
        }
        x.push(newWishlistz)
    },
    setWishlist(x,  ...wishlist)
    )
}
)
.catch(error => console.log('error', error));



console.log(wishlist)

},[])

// --------useEffect------------//

const createWishlistTitle = () =>{

    console.log("biii")

    const newWishlist = {
        title: wishlistName.title,
        created: "true",
        list : []
    }
    setWishlist([newWishlist, ...wishlist])
}

const addTolist  = (i) =>{
    const name  = props.name 
  
    const isbn = props.ISBN
    const genre = props.genre
    const newWishlist = {
        title: wishlistName.title,
        created: "true",
        list : name
    }
    var raw = JSON.stringify({"userid": loggedINUser ,"wishlistName": wishlist[i].title, "ISBN" :isbn });
    var requestOptions = {
    method: 'POST',
    headers : {
        "Content-type": "application/json"
    },
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:5000/user/wishlist", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    }

    if(wishlist.length >1){
    console.log(wishlist)

    }

    return (
        <div className = "customWishlistx goalset col-xs-12 col-lg-6 col-md-6 col-sm-6">
            <div className = "common-marginborder">
            <div> <div className = "libraryHeader"> Your Collection</div></div> 
                    <div className= "wishlistHeader">
                            <div>
                                <div className = "exisitingWishlist">
                                </div>
                             <div className = "createWishlist">
                               <input  placeholder = "enter the name of your wishlist"  onChange = {handleChange}/> ,
                                <button className ="wishlist-button" onClick  = {()=>{   
                            createWishlistTitle()
                            }}>Click to creatre</button>
                            </div>
                            </div>
                    </div>
                    <div className = "wishlist-section">      
                            <div className = "wishlistWrapper">
                                <h1 className = "wishlistWrapper-heading"> -Or- </h1>
                                <h1 className = "wishlistWrapper-heading-add"> Add to your Existing List </h1>



                                
                                      {wishlist && wishlist.length >0 ?
                                         <>
                                             {wishlist && wishlist.map(({created, list, title}, i ) => (
                                                    <div>
                                                        <button onClick = {()=>addTolist(i)}>{title}</button>
                                                            <div>
                                                                {title}
                                                            </div>
                                                    </div> 
                                                ))}
                                        </>                                    
                                 :(<>Your wishlist is empty
                                    <div className = "emptyCart">  <i class="fa fa-cart-plus" aria-hidden="true"></i></div>
                                    </>)}   

                                    
                                    {/* {wishlist.map((wishlist, i ) => (
                                                    <div>
                                                             {wishlist.title}
                                                    </div> 
                                                ))}           */}
                            </div>
                       </div>
                    </div>
        </div>
    )
}
