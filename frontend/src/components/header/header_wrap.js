import React, { Component } from 'react'
import styled, {css} from 'styled-components'
// import Auth from './auth'

export const Nav = styled.div`

background : none;
color: white;
font-weight : 600;
margin-bottom :30px;
`
export const Tabs =styled.li`

display : inline-block;
font-size : 14px;
padding: 10px;
cursor : pointer;
`

export const Logo = styled.div`
position : absolute;
top : 0;
left : 20px;
padding 20px;
font-family : cursive;
font-size : 32px;
letter-spacing : 3px;
color: white;
font-weight: 600;
text-align : left;
`
export const LoginSection = styled.div`
    position : absolute;
    top : 20px;
    right : 20px;
    font-size:15px;
` 
export const Input = styled.span`
    padding :10px;
    min-height : 40px;
` 
export const Button = styled.span`
    padding :10px;
    min-height : 40px;
    font-size : 12px;
    min-width :100px;
    background: rgb(144,144,144);
    background: linear-gradient(90deg, rgba(144,144,144,1) 0%, rgba(214,214,214,1) 35%, rgba(255,255,255,1) 100%);
    color:black;
    padding : 10px 40px  10px 40px ;
    cursor:pointer;
` 

class Headerwrap extends Component {

render(){

    return(
        <header style = {{position : "relative"}}>
                <div style={{height: "150px", overflow: "hidden"}}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style= {{height: "100%", width: "100%"}}>
                        <path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z" style={{stroke: "none", fill: "rgb(119, 119, 119"}}></path>
                    </svg>
                </div>
                <Nav>
                    <Logo> Bookshelf</Logo>
                    <div> 
                        <ul>
                            <Tabs>Home</Tabs>
                            <Tabs>Contact US</Tabs>
                            <Tabs>Sign up</Tabs>
                        </ul>
                    </div>
                    <LoginSection >   
                    <Input><input style = {{minHeight : "30px", border:"none", outline: "none",padding: "10px 0 10px 5px", fontSize: "12px", minWidth : "200px" }} type="tel" id="username"  placeholder="Enter Username"></input></Input>
                    <Input><input  style = {{minHeight : "30px", border:"none", outline: "none", padding: "10px 0 10px 5px", fontSize: "12px", minWidth : "200px"}} type="tel" id="password" placeholder="Enter Password"></input></Input>
                        <Button>Login </Button>
                    </LoginSection>
                </Nav>
        </header>
    );
 }
}
export default Headerwrap;