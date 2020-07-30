import React, {useContext} from 'react'
import UserContext from '../../../context/usercontext';


export default function Bookshelf(props) {

    const empty = props.empty
            const genre = props.library.genre
            const ISBN = props.library.ISBN
            const read = props.library.read
            const key = props.library.key
            const readbook = props.readBook
            const id = props.library.bookshelfID

    const readFunction =  () =>{

    }

    const { userData, setUserData } = useContext(UserContext);
    const userid =  userData && userData.user && userData.user.userid

     const handleClick = (e, id) => {
        // access to e.target here
        console.log(id);
    }
    const markRead =(id) =>{

        let updateSatus = {
            userid: "2",
            readBook: "0",
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
                                    <span>{readbook}</span><span>{read}</span> 
                                    <button  className = "markRead" onClick = { ()=> markRead(id)}>Mark as read</button> 
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
