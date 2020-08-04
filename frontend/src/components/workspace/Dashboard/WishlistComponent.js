import React, {useState} from 'react'

export default function WishlistComponent(props) {


    const [bookRead, setbookRead] =useState({delete:0})

    const wishlistName = props.category
    const index = props.index
    const user = props.user

    const [subList, setsubList] = useState()



    const expandList = () =>{

        console.log("hi")
        // var raw = JSON.stringify({"userid":user, "wishlistName" : wishlistName});
        var requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`,
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

    const deleteitem = (name, isbn, user, index, state)=>{

        setbookRead({delete:1})

        const wishlistName = name
        const userid = user
        const ISBN = isbn
        console.log(userid)


        // wishlistName,userid,ISBN

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
        <>
            <div className = "list_header clearfix" onClick = {()=>expandList()}>
                 <span className = "wishliName"> {wishlistName}</span> <span></span>
                <button className = "todoDelete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                <div>
                {subList && subList.map((subList,index) =>(    

                    
                       <div className = "wishlistContainer clearfix">  

                        {bookRead.delete ===1 ? null :
                        <>
                            <div className ="listcontainer"> {subList.ISBN}</div>
                            <button   onClick = {()=>deleteitem(wishlistName, subList.ISBN,user, index, 1) }  className = "todoDelete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            <button  className = "tobuy"><i class="fa fa-shopping-cart" aria-hidden="true"></i> Buy</button>
                                                    </>
                            }
                        </div>
                   
                ))}
            </div>
           
          


            {/* {(bookRead.read === 0 &&  readbook === 0)  ? <button  className = "markRead" 
            onClick = { ()=> markRead(id,1)}>Mark as read</button>  :<div><i className="fa fa-check" aria-hidden="true"></i></div> } */}
        </>
    )
}
