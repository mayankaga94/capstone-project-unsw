import React, {useContext, useState} from 'react'
import UserContext from '../../../context/usercontext';
import Pdf from "../../../../src/book.pdf";
import { Link } from 'react-router-dom'

export default function Bookshelf(props) {

    const [bookRead, setbookRead] =useState({read:0})
    const { userData, setUserData } = useContext(UserContext);
    const userid =  userData && userData.user && userData.user.userid

    const empty = props.empty
    const title = props.library.title
    const idbnlink = props.library.ISBN
    const author = props.library.author
    const genre = props.library.genre
    const readbook = props.library.readBook
    const id = props.library.bookshelfID



    const handleClick = (e, id) => {
        //  books opening based on different ids
        window.open(Pdf);
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

                                 <Link to  ={'/bookdetails/' + idbnlink}>
                                        <div>{title} </div> 
                                        <div>{author}</div>
                                    </Link>
                                    <div className ="read_genre">{genre}</div>
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
