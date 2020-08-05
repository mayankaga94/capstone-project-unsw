import React, {useState} from 'react'
import Sublist  from './Sublist';

export default function WishlistComponent(props) {

    const wishlistName = props.category
    const user = props.user
    const [subList, setsubList] = useState()

    const expandList = () =>{
        var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "userid": user,
            "wishlistname" : wishlistName
        }
        };
        fetch("http://localhost:5000/user/wishlist/items", requestOptions)
        .then(response => response.json())
        .then(result =>{
                  setsubList(result.result)
                    },
            )
        .catch(error => console.log('error', error));
    }
    return (
        <>
                 <div className = "list_header clearfix" onClick = {()=>expandList()}>
                        <span className = "wishliName"> {wishlistName}</span> <span></span>
                        <button className = "todoDelete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                <div>
                    {subList && subList.map((subList,index) =>(    
                        <Sublist  title = { subList.title} author = {subList.author} name = {wishlistName}  user = {user} isbn  = {subList.ISBN} index = {index} />
                    ))}
                </div>

        </>
    )
}
