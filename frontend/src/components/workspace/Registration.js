import React, { Component , useState, useContext} from 'react'
import UserContext from '../../context/usercontext'
import styled from 'styled-components'
import '../../Styling.css'
export const Register = styled.div`
display: inline-block;
padding-left :  10px; 
background: #f1f1f1;
color:white;
width:25%;
padding: 35px 0 50px 0;
z-index :999;

`
export default function Registration () {

        const [firstName, setfirstname] = useState();
        const [lastName, setlastname] = useState();
        const [password, setpassword] = useState();
        const [password2, setpasswordCheck] = useState();
        const [dob, setdob] = useState();
        const [emailID, setemail] = useState();
        const submit = async (e) =>{

                e.preventDefault();
                const newUser = { firstName, lastName ,emailID, password, password2, dob}
                fetch('http://localhost:5000/register',
                { method : "POST",
                headers: {
                    "Content-type": "application/json"
                 },
                 body: JSON.stringify(newUser),
             })
            .then((response) => {
             response.json().then((data) => {
                     console.log(data);
                 });
             });
        }

        return (
            <div>
                    <Register>
                        <div className = "registrationHeading">Register</div>
                        <form onSubmit = {submit} >
                            <input  placeholder ="Enter Your First Name" id="firstnam"  className = "registerDetails" onChange = {(e) =>setfirstname(e.target.value)}></input>
                            <input placeholder ="Enter your Last name" id="lastname" className = "registerDetails"  onChange = {(e) =>setlastname(e.target.value)}></input>
                            <input  placeholder ="Enter Password"type = "password" className = "registerDetails" id="registerPassword"  onChange = {(e) =>setpassword(e.target.value)}></input>
                            <input  placeholder ="Enter Password Again"type = "password" className = "registerDetails" id="registerPassword2" onChange = {(e) =>setpasswordCheck(e.target.value)} ></input>                    
                            <input  placeholder ="Enter DOB in (yyy-mm-dd) "id="dob" className = "registerDetails" onChange = {(e) =>setdob(e.target.value)} ></input>
                            <input  placeholder ="Enter Your Email ID" id="emailID"  className = "registerDetails"onChange = {(e) =>setemail(e.target.value)} ></input>        
                            <input  className = "registrationButton" type="submit" value="Register" />
                        </form >          
                    </Register>
            </div>
        )
}