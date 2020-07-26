import { useState } from 'react';
import React from 'react'


const useInputValue = (initialValue)=>{
        
    const [value , setValue] = useState(initialValue)
    
    return {
        value,
        onChange : e =>setValue(e.target.value),
        resetValue : () => setValue("")
    }
}



// const handleChange = (check) =>{
//     const [check , setCheck] = useState(check)
//     return {
//         checktype : check 
//     }
//     if (check){
//         setCheck : true

//     }
//     else{
//         setCheck : false
//     }
//     this.setState({
//         checked: !this.state.checked
//       })
// }

export default ({submit}) =>{

    let check  = true 
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
                            {/* <input type="checkbox"  checked={ check }  onChange = { handleChange } /> */}
                              <input {...text} />
                            
                              
                                    {/* <button type = "submit"> Add</button> */}
                            </form >    
                            
                        </div>


                </div>
        </div>
    )
}
