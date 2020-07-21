import React, { Component } from 'react'
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
export class Registration extends Component {

    state = {
        firstName : "",
        lastName : "",
        emailID : "",
        password : "",
        password2 : "",
        dob : ""
    
    }
    onChange = (e) =>{
        this.setState({
            [e.target.name] :e.target.value
         });
    }
    onSubmit = (e) =>{
        
        fetch('http://localhost:5000/user/register',
           { method : "POST",
                headers: {
                    "Accept": "application/json , text/plain ,*/*",
                    "Content-type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
       .then((response) => {
        response.json().then((data) => {
                console.log(data);
            });
        });
        
        
            // console.log(this.state)
    //    
    }
    render() {
        return (
            <div>
                    <Register>
                        <div className = "registrationHeading">Register</div>
                        <form>
                            <div className = "registrationFields"><input  name="firstName" id="registerfirstname"  placeholder="Enter First Name" onChange = {e =>this.onChange(e)} value = {this.state.firstname}></input></div>
                            <div className = "registrationFields"><input name="lastName" id="registerlastname"  placeholder="Enter Last name" onChange = {e =>this.onChange(e)} value = {this.state.lastname}></input></div>
                            <div className = "registrationFields"><input type = "password" name="password"  id="registerPassword"  placeholder="Enter Password" onChange = {e =>this.onChange(e)} value = {this.state.password}></input></div>
                            <div className = "registrationFields"><input type = "password" name="password2"  id="registerPassword2"  placeholder="reEnter Password" onChange = {e =>this.onChange(e)} value = {this.state.password2}></input></div>
                            <div className = "registrationFields"><input id="dob" name="dob" placeholder="Enter dob yyy/mm/dd" onChange = {e =>this.onChange(e)} value = {this.state.dob}></input></div>
                            <div className = "registrationFields"><input id="emailID" name="emailID" placeholder="Please enter your Email-id" onChange = {e =>this.onChange(e)} value = {this.state.emailID}></input></div>
                            {/* <div className = "registrationFields"><input type="tel" id="phone" name="phone" placeholder="Enter Email-id"></input></div> */}
                            <button className = "registrationButton"  type = "button" onClick = { () =>this.onSubmit()}>Submit</button>
                        </form>          
                    </Register>
            </div>
        )
    }
}

export default Registration
