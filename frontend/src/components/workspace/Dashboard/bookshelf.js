import React, {useContext, useState} from 'react'
import UserContext from '../../../context/usercontext';


export default function Bookshelf(props) {


    const [bookRead, setbookRead] =useState({read:0})

    const empty = props.empty
            const genre = props.library.genre
            const ISBN = props.library.ISBN
            const read = props.library.read
            const key = props.library.key
            const readbook = props.library.readBook
            const id = props.library.bookshelfID
            // const readbook = props.readBook
    const readFunction =  () =>{

    }

    const { userData, setUserData } = useContext(UserContext);
    const userid =  userData && userData.user && userData.user.userid

     const handleClick = (e, id) => {
        // access to e.target here
        console.log(id);
    }
    const markRead =(id,read) =>{

        setbookRead({read:1})

        let updateSatus = {
            userid: userid,
            readBook: read,
            bookshelfID:  id
        }
        console.log(updateSatus)
        var raw = JSON.stringify(updateSatus);
        var requestOptions = {
        method: 'PUT',
        headers : {
            "Content-type": "application/json"
        },
        body: raw,
        redirect: 'follow'
        };

        fetch("http://localhost:5000/user/library", requestOptions)
        .then(response => response.json())
        .then(result => 
            console.log(props.markRead)
            )
        .catch(error => console.log('error', error));
            }

    return (
       
        <div id = {`${id}`} >   
                <div className  = "cartItems">
                        {empty ? 
                        (<span>the cart is empty</span>) : (
                            <> 
                            <div className = "row" >
                                <div className = "col-xs-8 col-lg-8 col-md-8 col-md-8">
                                    <div>{ISBN} </div> 
                                    <div className ="read_genre">{genre}</div>
                                    {/* <span>{readbook}</span><span>{read}</span>  */}

                                    {(bookRead.read === 0 &&  readbook === 0)  ? <button  className = "markRead" onClick = { ()=> markRead(id,1)}>Mark as read</button>  :<div><i className="fa fa-check" aria-hidden="true"></i></div> }
                                    
                                    </div>
                            <div className = "col-xs-4 col-lg-4 col-md-4 col-md-4">
                                <button  value={id} className = "readBook"  onClick={((e) => handleClick(e, id))}> Read</button>
                            </div>
                            </div>
                        </>)
                        }
                        </div>
        </div>
    )
}
