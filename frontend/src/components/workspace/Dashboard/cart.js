import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/usercontext';
import Bookshelf from './bookshelf'


export default function Cart(props) {

    let  genre = props.genre
    const [library, setLibrary ] =useState([])

    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid



    useEffect(() => {
        if (loggedINUser){
              console.log(loggedINUser)
        const shelfDetails = {"userid":loggedINUser}
        var raw = JSON.stringify(shelfDetails);

            var requestOptions = {
            method: 'POST',
            headers : {
                "Content-type": "application/json"
            },
            body: raw,
            redirect: 'follow'
            };

            fetch("http://localhost:5000/user/library/cart", requestOptions)
            .then(response => response.json())
            // ((data) => {
            .then((result) =>{
                // console.log(result)
                        setLibrary(result.userShelf)
                       
            })
            .catch(error => console.log('error', error));
        }
        },[])


      

    return (
                <div className ="library">    
                      {library.map((library,index)=>(           
                            <Bookshelf  key  = {"library" + index } library = {library}/ >
                        ))}
                 </div>

    )
}
