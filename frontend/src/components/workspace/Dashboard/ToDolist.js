// import React, { conte } from 'react'
import { useState, useEffect, useContext } from 'react';
import TodoForm from './todoform';
import React from 'react'
import Calendar from './Calendar';
import UserContext from '../../../context/usercontext';


export default function ToDolist({onSubmit}) {

    const { userData, setUserData } = useContext(UserContext);
    const [todos, setTodos] = useState([])
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
        const  completed = todos.map(value => value.complete);
        const user = userData.user.userid

        console.log( user, text, completed)
    //     const newUser = { firstName, lastName ,emailID, password, password2, dob}
    //     fetch('http://localhost:5000/todolist',
    //     { method : "POST",
    //     headers: {
    //         "Content-type": "application/json"
    //      },
    //      body: JSON.stringify(newUser),
    //  })

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
    const checkValue =  check.checked
    return (
    <div className ="">                       

        <input type = "checkbox" checked = {setCheck.checked }    onChange={ handleChange }/>   
            {checkValue ? <Calendar/>   : null }  
                        {/*---------- passing props here---------------- */}
        <TodoForm  submit = {text => setTodos([{text, complete :false}, ...todos])} />
        <div>
            <div>
                {todos.map(({ text, complete }, i, ) => (
                    <div className = "todoitem">
                    <span key={text}  onClick={() => deleteTdo(i)} style={{textDecoration: complete ? "line-through" : ""}}  > <span>{text}</span> 
                     </span> 
                       <button onClick = {()=> deltetodos(i)}>x</button>
                   </div>
                    )
                )
                }
            </div>
            <button onClick ={() =>submitall()}>click</button>
        </div>
        </div>
    )
}
