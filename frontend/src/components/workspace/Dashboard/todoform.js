import { useState , useContext} from 'react';
import React from 'react'
import UserContext from '../../../context/usercontext';


const useInputValue = (initialValue)=>{
        
    const [value , setValue] = useState(initialValue)
    const cd = 1
    return {
        onChange : e =>setValue(e.target.value),
        resetValue : () => setValue("")
    }
}
const submitz = (text, loggedINUser, callReviewidFunction )=>{
    const  name  = {
        userid: loggedINUser,
        task: text
     }
        const url = "http://localhost:5000/user/task"
        fetch(url,
            {
            method : "POST",
            headers : {
                "Content-type": "application/json"
            },

            body : JSON.stringify(name)
             })
             .then((response) => {          
                response.json().then((data) => {

                     {
                        callReviewidFunction({
                        reviewid: data.tasklistid,
                        }); 
                        }
                    });
                });
    }
    
export default ({submit, callReviewidFunction}) =>{

    // console.log(props)

    let check  = true 
    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid
    const {resetValue, ...text} = useInputValue(""); 

    return (
        <div>
                <div className = "">
                        <div className = " todoheader">
                                Enter your goals
                        </div>
                        <div className = "todoContent">
                            <form id = "todolist" onSubmit = {e =>{
                                e.preventDefault();
                                submit(text.value)
                                resetValue()
                            }} >
                                {/* <button   disabled={text.value.length===0}  onClick ={()=> submitz(text.value, loggedINUser, callReviewidFunction)} >Submit</button> */}
                              <input {...text} />
                            </form >    
                        </div>
                </div>
        </div>
    )
}
