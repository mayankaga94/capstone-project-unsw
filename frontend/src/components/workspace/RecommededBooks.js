import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Wrapper = styled.div`
font-size:20px;
text-align :left;
cursor :pointer;
display:inline-block;
transition: transform .3s;
max-width : 150px;
margin:15px 10px 15px 10px;
&:hover  {
    transform: scale(1.1);
    text-decoration: none;
    text-decoration-style:
}
`
export const Bookname = styled.div`
margin-top : ${props => props.author ? 0 : "10px" };
text-decoration: ${props => props.author ? "none" : "none" };
height: ${props => props.author ? 0 : "50px" };
word-spacing: ${props => props.author ? 0 : "1px" };
color: ${props => props.author ? "#292929" : "#b6b6b6"};
padding: ${props => props.author ? "2px" : "2px"};
font-size: ${props => props.author ? "14px" : "14px"};
line-height: ${props => props.author ? "1.1" : "1"};
&:hover  {
    text-decoration: none;
    text-decoration-style: none;
}
`
export const Bookimg = styled.img`
height: 210px;
width: 150px;
`
export const Price = styled.div`
    font-size :14px;
    // padding : 5px 5px 5px 0;
    color :#00bfc5;

`

export  const Rating = styled.div`
    font-size :16px;
    color :#ccc;
    padding :5px 5px 5px 0;
`

export default function RecommededBooks(props) {

    const ISBN = props.ISBN
    const [recommendedISBN, setRecommededISN] = useState([])
    const [similarbooks, setsimilarbooks] = useState([])
    
    useEffect(() => {
        let x = []

            var requestOptions = {
            method: 'POST',
            headers : {
                "Content-type": "application/json"
            },
            body: JSON.stringify({"ISBN":[ISBN],"count":10}),
            redirect: 'follow'
            };
            fetch("http://localhost:5000/getRecommendation", requestOptions)
            .then(response => response.json())
            .then(result => {
               result &&  result.result  &&  result.result.forEach((result,index) =>{
                    x.push(result[0])
                })
                setRecommededISN(x)
            
                })
            .catch(error => console.log('error', error));
        },[ISBN])
 
    return (
        <div className = "similar-books-wrap">

           <h1 className ="book-similar-heading"> Books similar to {props.bookName}

           <div className  = "clearfix">
               <div className = "col-xs-12 col-md-12 col-sm-12 col-lg-12">
                    { recommendedISBN && recommendedISBN.map((similarbooks,index) =>(

                                <Link  className = "recommendBookslink" to  ={'/bookdetails/' + similarbooks.ISBN}>
                                <div><Bookimg src ={similarbooks.image}></Bookimg></div>
                                <div className = "book_description">
                                    <Bookname>{similarbooks.name}</Bookname> 
                                    <Bookname author>{similarbooks.author}</Bookname>                       
                                </div>       
                                </Link> 
                            ))}
               </div>
           </div>
           </h1>            
        </div>
    )
}
