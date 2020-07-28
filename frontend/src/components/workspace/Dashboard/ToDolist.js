// import React, { conte } from 'react'
import { useState, useEffect, useContext } from 'react';
import TodoForm from './todoform';
import React from 'react'
import Calendar from './Calendar';
import UserContext from '../../../context/usercontext';


export default function ToDolist({onSubmit}) {

    const { userData, setUserData } = useContext(UserContext);
    const [todos, setTodos] = useState([])
    const [reviewid, setReviewid] = useState([])
    const [check, setCheck] = useState([{checked : true}])

   const deleteTdo  = (i) =>{
        setTodos(todos.map((todo, k) =>k === i ? {
                        ...todo,

                        complete : !todo.complete
                    }: todo)
            )
        }

   const submitall  = () =>{
         const completedGoals = todos.filter(user => user.complete);
        setUserData({ 
        ...userData,
            goal :todos.length,
                complete : completedGoals.length
        })
        const  text  = todos.map(value => value.text);
        const  review  = todos.map(value => reviewid.reviewid);
        const  completed = todos.map(value => value.complete);
        const user = userData.user.userid

        // console.log( user, text, completed)

    }
    const handleChange = ()=>{
        setCheck({
        checked: !check.checked
        })
    } 
    const deltetodos = (i) =>{
        setTodos(todos.filter((k, index) => index !== i )
        )
        }


        const callReviewFunctionid =(idGenerated)=>{
            const createdObject = {
                reviewid : idGenerated
            }

            setReviewid([createdObject.reviewid,...reviewid])      
        }
    const checkValue =  check.checked
    return (
    <div className ="goalset col-xs-12 col-lg-4 col-md-4 col-sm-4">                       

        {/* <input type = "checkbox" checked = {setCheck.checked }    onChange={ handleChange }/>   
            {checkValue ? <Calendar/>   : null }   */}
                        {/*---------- passing props here---------------- */}


        <TodoForm  callReviewidFunction = {callReviewFunctionid}  submit = {text => setTodos([{text, complete :false, reviewid}, ...todos])} />
        <div>
            <div>
                {todos.map(({ text, complete ,reviewid}, i, ) => (
                    <div className = "todoitem">
                    <span className ="specificTask" key={text}  onClick={() => deleteTdo(i)} style={{textDecoration: complete ? "line-through" : ""}}  > 
                    {/* <span className = "innerWrapper"> */}
                        {text}
                    {/* </span>  */}
                     </span> 
                       <button onClick = {()=> deltetodos(i)}>x</button>
                   </div>
                    )
                )
                }
            </div>
        </div>
        </div>
    )
}
