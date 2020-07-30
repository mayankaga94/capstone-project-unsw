import { useState , useContext} from 'react';
import React from 'react'
import UserContext from '../../../context/usercontext';


const useInputValue = (initialValue)=>{
        
    const [value , setValue] = useState(initialValue)
    return {
        value,
        onChange : e =>setValue(e.target.value),
        resetValue : () => setValue("")
    }
}
const submitz = (task, loggedINUser,  )=>{
    const  name  = {
        userid: loggedINUser,
        task: task
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

                    console.log(data)
                    //  {
                    //     callReviewidFunction({
                    //     reviewid: data.tasklistid,
                    //     }); 
                    //     }
                    });
                
                });
    }
    
export default ({submit}) =>{

    // console.log(props)

    let check  = true 
    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid
    const {resetValue, ...task} = useInputValue(""); 

    return (
        <div>
                <div className = "">
                        <div className = " todoheader">
                                Enter your goals
                        </div>
                        <div className = "todoContent">
                            <form id = "todolist" onSubmit = {e =>{
                                e.preventDefault();
                                submit(task.value)
                                resetValue()
                            }} >
                                <button   disabled={task.value.length===0}  onClick ={()=> submitz(task.value, loggedINUser)} ></button>
                              <input {...task} />
                            </form >    
                        </div>
                </div>
        </div>
    )
}
