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

    return (
        <div id = "" >
       
             {empty ? (<span>the cart is empty</span>) : (
                  <> <div >
                    <span>{key}</span>
                     <span className ="read_genre">{genre}</span> <span>{ISBN} </span> 
                     <span>{readbook}</span><span>{read}</span> 
                     <button  value={id} className = "readBook"  onClick={((e) => handleClick(e, id))}> Read</button>
                     </div>
                     <button className = "markRead">Mark as read</button> 
             </>)
             }
        </div>
    )
}
