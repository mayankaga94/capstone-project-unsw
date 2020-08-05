import React, { useEffect, useState, useContext  } from 'react'
import { useParams} from 'react-router-dom'
import Book  from './bookPage'
import UserContext from '../../context/usercontext'



export default function Bookdetails() {



    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid



    // fetch the particular id of the book
        const id  = useParams();
        const bookreviewid = id
        const [book, setbook] = useState([]);
        const [review, setReview] =  useState([]);

        useEffect(() => {
            getBook()
        }, [id])

        const  callupFunction = (newvote, reviewID) =>{
            let updatedReview = review.map(reviews=>{
                if(reviews.reviewID === reviewID){
                    reviews.votes = newvote.votes
                }
                return reviews
            }) 
            setReview(updatedReview)
        }

        const  calldownFunction = (newvote, reviewID) =>{

                let updatedReview = review.map(reviews=>{
                    if(reviews.reviewID === reviewID){
                        reviews.votes = newvote.votes
                    }
                    return reviews
                }) 
                 setReview(updatedReview)
    }

        const callReviewFunction = (newReview)=>{
            const createdObject = {
                user : newReview.userID,
                comment: newReview.comment,
                votes : newReview.votes

            }
            setReview([...review, createdObject])

        }
        // Delete the posts made by the user

        const callreviewDeleteFunction = (newReview)=>{

            console.log(newReview.delete)
            console.log(review)
            setReview(review.filter((k, index) => k.reviewID !== newReview.delete ))
        }
        // ---------------------------------
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
                {book.map((book,index) => (
                <Book key = {"dookDetails"+index} callReviewFunction = {callReviewFunction}  callreviewDeleteFunction  = {callreviewDeleteFunction} callupFunction = {callupFunction}  calldownFunction = {calldownFunction} bookReview = {review} Likes = {book.Likes}  pagecount = {book.pagecount}  ISBN = {book.ISBN}  genre = {book.genre}  description = {book.description}  rating = {book.rating} author = {book.author} url = {book.image} name = {book.title} /> 
                ))} 
            </div>
        )
}