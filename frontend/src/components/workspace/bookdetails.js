import React, { useEffect, useState  } from 'react'
import { useParams} from 'react-router-dom'
import Allbooks from './Allbooks'

import Book  from './bookPage'

export default function Bookdetails() {

    // fetch the particular id of the book
        const id  = useParams();
        const bookreviewid = id
        const [book, setbook] = useState([]);
        const [review, setReview] =  useState([]);


        useEffect(() => {
            getBook()
        }, [])


        const  callupFunction = (newvote) =>{
                console.log("fdgdfgdfg")
            const obj = {
                votes :newvote.votes
            }


            setReview([...review, obj])
        }
        const callReviewFunction = (newReview)=>{
            // let intiState = [...review]
            // console.log(review)
            const createdObject = {
                user : newReview.userID,
                comment: newReview.comment,
                votes : newReview.votes

            }
            setReview([...review, createdObject])

        }
        const getPost =async() =>{
            const url = "http://localhost:5000/fetchReviews"
            fetch(url,
                {
                method : "POST",
                headers : {
                    "Content-type": "application/json"
                },
                body : JSON.stringify(id)
                 })
                 .then((response) => {          
                    response.json().then((data) => {
                            // console.log(data);
                            setReview(data.bookReview)
                        });
                    });
        }
        const getBook = async() =>{
            const url = "http://localhost:5000/book"
            fetch(url,
            { method : "POST",
            headers: {
                "Accept": "application/json , text/plain ,*/*",
                "Content-type": "application/json"
             },
             body: JSON.stringify(id)

            })
            .then((response) => {
                response.json().then((data) => {
                        // console.log(data.result);
                        setbook(data.result)
                    });
                    getPost()
                });
            }
        return (
            <div>
                <h1> Book</h1>

                <div>
                </div>
                {book.map((book,index) => (
                <Book key = {"dookDetails"+index} callReviewFunction = {callReviewFunction} callupFunction = {callupFunction}  bookReview = {review} Likes = {book.Likes}  pagecount = {book.pagecount}  ISBN = {book.ISBN}  genre = {book.genre}  description = {book.description}  rating = {book.rating} author = {book.author} url = {book.image} name = {book.title} /> 
                ))} 


                <div className = "similarBooks">
                <div className = "row">
                      <div className = "similar">
                        <h1>
                            Books similar to this book
                        </h1>             
                      </div>
                      <div className= "similarbooks">
                              <Allbooks /> 
                          
                      </div>
                  </div>
                </div>
            </div>
        )
}