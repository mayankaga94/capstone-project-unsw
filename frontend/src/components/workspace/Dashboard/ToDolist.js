import { useState, useEffect, useContext } from 'react';
import TodoForm from './todoform';
import React from 'react'
import UserContext from '../../../context/usercontext';
import {CircleProgress} from 'react-gradient-progress'


export default function ToDolist({onSubmit}) {

    const { userData, setUserData } = useContext(UserContext);
    const [todos, setTodos] = useState([])
    const [reviewid, setReviewid] = useState([])

    const [hack, setHack] = useState(false)

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
    }, [hack])
   const completeTdo  = (i) =>{ 
       setHack(!hack)
        setTodos(todos.map((todo, k) =>todo.tasklistid === i ? {
                        ...todo,
                        complete : !todo.complete
                    }: todo)
        )
        const url = "http://localhost:5000/user/task"
        const selectedTodo = todos.filter(todo=>todo.tasklistid ===i)
        const todoComplete = {
            userid : userData.user.userid,
            tasklistid :i,
            status : selectedTodo[0].status==="complete"?"To Do":"complete"
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

const badFunc = (task)=> {
         setTodos([{task, complete :false,}, ...todos])
        setHack(!hack)
}


// console.log(todos)
const completelength  = todos.filter(todo=>todo.status ==="complete")

let fraction = completelength.length*100/todos.length

let fractionRounded =  fraction.toFixed(2);
    return (
    <div className ="goalset col-xs-12 col-lg-12 col-md-12 col-sm-12">      
       
       
            <div className = "goal-summary">
                <div className= "libraryHeader">Goal Summary
                </div>               
                <CircleProgress percentage={fractionRounded} text = "completed" strokeWidth={12} secondaryColor="#ccc" />
                {todos.length <=1 ?<div><span>Task:</span> {todos.length}</div>: <div ><span className = "taskinfo">Total tasks:</span> {todos.length}</div> }
                <div><span className = "comletedTask">Completed Tasks:</span> {completelength.length}</div>

                {/* {todos.status =="complete" ? } */}
            </div>
            <div className = "common-marginborder">                 
            <TodoForm  callReviewidFunction = {callReviewFunctionid}  submit = {badFunc} />
            <div className = "todoitemslist">
                <div >
                    {todos && todos.map(({ task, status ,tasklistid}, i, ) => (
                        <div className = "todoitem">
                        <span className ="specificTask" key={task}  onClick={() =>completeTdo(tasklistid)} style={{textDecoration: status==="complete" ? "line-through" : "" }}  > 
                            {task}
                        </span> 
                        <button className = "todoDelete" onClick = {()=> deltetodos(i, tasklistid)}><i class="fa fa-trash" aria-hidden="true"></i></button>
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