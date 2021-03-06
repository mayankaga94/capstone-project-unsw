import React from 'react'
import { useState, useEffect, useContext} from 'react'
import WishList from './Dashboard/wishlist'
import UserContext from '../../context/usercontext'

export default function CustomWishlist(props) {

    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid


    const userLevel = userData && userData.level && userData.user.level


    const isbn = props.ISBN
    const [wishlist, setWishlist] = useState([])
    const [wishlistName, setWishlistName] = useState({})

    const createWishlist = () =>{
        setWishlist([{created: "false",title:"ssd", list : []},...wishlist])
    }

    const handleChange = (e) =>{
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
        fetch("http://localhost:5000/user/wishlistfetch", requestOptions)
    .then(response => response.json())
    .then(result => {

        const lists = result.result
        const x = []
        lists.map((list,index) =>{
            const newWishlistz = {
                title:list.wishlistname,
                created: "true",
                list : []
            }
            x.push(newWishlistz)
        }
        )
        setWishlist(x,  ...wishlist)
    }
    )
    .catch(error => console.log('error', error));

    },[])

    // --------useEffect------------//

    const createWishlistTitle = () =>{
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
        
        return (
            <div className = "customWishlistx goalset col-xs-12 col-lg-6 col-md-6 col-sm-6">
                <div className = "common-marginborder">
               
                <div> <div className = "libraryHeader"> Your Collection</div></div> 
                <div className = "closebtn pull-right" onClick = {props.close()}> x</div>
                        <div className= "wishlistHeader">
                                <div>
                                    <div className = "exisitingWishlist">
                                    </div>
                                <div className = "createWishlist">
                                <input  placeholder = "enter the name of your wishlist"  onChange = {handleChange}/>
                                    <button className ="wishlist-button" onClick  = {()=>{   
                                createWishlistTitle()
                                }}>Creatre</button>
                                </div>
                                </div>
                        </div>
                        <div className = "wishlist-section">      
                             
                                <div className = "wishlistWrapper">
                                    <div className = "heading-wrapper">
                                        <h1 className = "wishlistWrapper-heading"> -Or- </h1>
                                        <h1 className = "wishlistWrapper-heading-add"> Add to your Existing List </h1>
                                    </div>
                                        {wishlist && wishlist.length >0 ?
                                            <>
                                                {wishlist && wishlist.map(({created, list, title}, i ) => (
                                                        <div>
                                                            <button className = "addtowishlist-button" onClick = {()=>addTolist(i)} style={{color:'red'}}>                                                    
                                                                {title}</button>     
                                                        </div> 
                                                    ))}
                                            </>                                    
                                    :(<>Your wishlist is empty
                                        <div className = "emptyCart">  <i class="fa fa-cart-plus" aria-hidden="true"></i></div>
                                        </>)}   
                                </div>
                        </div>
                        </div>
            </div>
        )
}
