import React, { useState, useContext} from 'react'
import UserContext from '../../context/usercontext'
import styled, {css} from 'styled-components'
import { redirect, Redirect} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthOptions from './authoptions'

export const Nav = styled.div`

background : none;
color: white;
font-weight : 600;
margin-bottom :30px;
position : absolute;
top: -1px;
width:100%;
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

export default function  Headerwrap () {

    const [email, setEmail] = useState();
    const [password, setPassword]  = useState();
    let history = useHistory();
    const { userData, setUserData } = useContext(UserContext);

    // React.useEffect( () => {

    // }, [])

    const loginSubmit = async(e) => {
        e.preventDefault()
        let loginUser = { email, password }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" ,  
            },
            body: JSON.stringify(loginUser),
        }
        fetch('http://localhost:5000/login',options)
        .then((response) => {
                      response.json().then((data) => {
                      localStorage.setItem("auth-token", data.auth_token);
                      history.push("/home");

                      setUserData({
                        token : data.auth_token,
                        user : data.userEmail
                    })
                    setEmail('');
                    setPassword('');
                });
            });
    }

    const logout = () =>{
        localStorage.clear()
        setUserData({
            token : undefined,
            user : undefined
        })
        history.push("/")
    }
    return(
        // creating header
        <header style = {{position : "relative"}}>
                <div style={{height: "150px", overflow: "hidden"}}>
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style= {{height: "100%", width: "100%"}}>
                        <path d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z" style={{stroke: "none", fill: "rgb(184 184 184)"}}></path>
                    </svg>
                </div>
                {userData.user ? (
                                <Nav>
                                    <Logo> Bookshelf</Logo>
                                        <ul className = "float-right">

                                        <Link to  ={'/home' }>
                                            <li  className = "headerItems float-left"><div><i className="fa fa-home" aria-hidden="true"></i></div><span className = "">Home</span></li>
                                        </Link>
                                        <Link to = {'/dashboard'}>
                                            <li className = " headerItems float-left"><div><i className="fa fa-tachometer" aria-hidden="true"></i></div><span className = "">Dashboard</span></li>
                                        </Link>   
                                            
                                             <li className = "headerItems float-left">
                                              <div  className =" "><i className="fa fa-shopping-cart" aria-hidden="true"></i> 
                                                <p>Cart</p>
                                                </div>   
                                             </li>
                                            <li className = "headerItems float-left">                
                                            <div>                            
                                                 <span className =" "><i className="fa fa-heart" aria-hidden="true"></i> 
                                                 <p>Wishlist</p>
                                                 </span>   
                                                 </div>
                                            </li>

                                            <li className = " headerItems float-left"> <button className = " logoutButton" onClick =  { logout }>Log out</button></li>
                                        </ul>
                                </Nav>
                 ) :  
                 (
                        <>
                          <Nav>
                          <Logo> Bookshelf</Logo>
                                 <LoginSection >     
                                    <form onSubmit = {loginSubmit}>
                                            <input  placeholder ="Enter Your Email ID" className ="credentials" id="loginID" onChange = {(e) =>setEmail(e.target.value)}></input>   
                                            <input  placeholder ="Enter Password" className ="credentials" type = "password" id="loginPassword"  onChange = {(e) =>setPassword(e.target.value)}></input> 
                                            <input  className = "loginButton" type="submit" value="Login" />
                                        </form>    
                                </LoginSection>
                            </Nav>
                        </>
          )}
        </header>
    );
 }
