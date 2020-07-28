import React, {useContext} from 'react'
import UserContext from '../../../context/usercontext';


export default function Bookshelf(props) {

    const genre = props.library.genre
    const ISBN = props.library.ISBN
    const read = props.library.read
    const key = props.library.key
    const readbook = props.readBook

    const readFunction =  () =>{
    }

    const { userData, setUserData } = useContext(UserContext);
     const userid =  userData && userData.user && userData.user.userid


    return (
        <div>
         <div>
                    <span>{key}</span>
                     <span className ="read_genre">{genre}</span> <span>{ISBN} </span> 
                     <span>{readbook}</span><span>{read}</span> 
                     <button  className = "readBook" onClick = {()=>readFunction()}> Read</button>
                     </div>
                     <button className = "markRead">Mark as read</button> 

        </div>
    )
}
