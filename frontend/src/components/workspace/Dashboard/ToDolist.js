import { useState, useEffect, useContext } from 'react';
import TodoForm from './todoform';
import React from 'react'
import UserContext from '../../../context/usercontext';

export default function ToDolist({onSubmit}) {

    const { userData, setUserData } = useContext(UserContext);
    const [todos, setTodos] = useState([])
    const [reviewid, setReviewid] = useState([])


    useEffect(()=>{
     const userid =  userData && userData.user && userData.user.userid

     if (userid){
        const url = "http://localhost:5000/fetchTask"
        fetch(url,
            {
            method : "PUT",
            headers : {
                "Content-type": "application/json"
            },
            body : JSON.stringify({userid})
            })
            .then((response) => {          
                response.json().then((data) => {
                        setTodos(data.result)
                    });
                });
        }
    }, [])
   const completeTdo  = (i) =>{ 
        setTodos(todos.map((todo, k) =>todo.tasklistid === i ? {
                        ...todo,
                        complete : !todo.complete
                    }: todo)
        )
        const url = "http://localhost:5000/user/task"

        const todoComplete = {
            userid : userData.user.userid,
            tasklistid :i,
            status : "complete"
        }
        fetch(url,
            {
            method : "PUT",
            headers : {
                "Content-type": "application/json"
            },

            body : JSON.stringify({todoComplete})
             })
             .then((response) => {          
                response.json().then((data) => {
                        console.log(data)
                    });
                });
    }
    const deltetodos = (i, tasklistid) =>{


        console.log(tasklistid)

        var raw = JSON.stringify({tasklistid});
        var requestOptions = {
          method: 'DELETE',
          headers : {
            "Content-type": "application/json"
        },
          body: raw,
          redirect: 'follow'
        };
        fetch("http://localhost:5000/user/task", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

          setTodos(todos.filter((k, index) => index !== i )
          )
        }
        const callReviewFunctionid =(idGenerated)=>{
            const createdObject = {
                reviewid : idGenerated
            }
            setReviewid([createdObject.reviewid,...reviewid])      
        }
    return (
    <div className ="goalset col-xs-12 col-lg-4 col-md-4 col-sm-4">      
        < div className = "common-marginborder">                 
        <TodoForm  callReviewidFunction = {callReviewFunctionid}  submit = {task => setTodos([{task, complete :false,}, ...todos])} />
        <div>
            <div>
                {todos && todos.map(({ task, complete ,tasklistid}, i, ) => (
                    <div className = "todoitem">
                    <span className ="specificTask" key={task}  onClick={() =>completeTdo(tasklistid)} style={{textDecoration: complete ? "line-through" : ""}}  > 
                        {task}
                     </span> 
                       <button onClick = {()=> deltetodos(i, tasklistid)}>x</button>
                   </div>
                    )
                )
                }
            </div>
            </div>
        </div>
        </div>
    )
}