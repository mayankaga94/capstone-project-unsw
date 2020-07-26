import React, {useEffect, useState , useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Comments from './comments.js'
import Searchbar from './searchbar'
import Quotes from './Quotes'
import CustomWishlist from '../workspace/Dashboard/customWishlist'
import '../../Styling.css'
import Review from './Review'
import UserContext from '../../context/usercontext'
import { useParams} from 'react-router-dom'


export const Wrapper = styled.div`
font-size:20px;
text-align :left;
display:inline-block;
transition: transform .3s;
margin:15px 0 15px 0;
// &:hover  {
//     transform: scale(1.1);
// }
`
export const Book = styled.div`
margin-top : ${props => props.author ? 0 : "10px" };
color: ${props => props.author ? "#292929" : "#2c2828"};
padding: ${props => props.author ? "0" : "0"};
font-size: ${props => props.author ? "16px" : "16px"};
line-height: ${props => props.author ? "1.1" : "1"};
`
export const Bookimg = styled.img`
    // width: 100%;
    padding-left:20%;
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

export default function Bookpage (props){

    const [quotes, setquotes]  = useState([]);
    const [comp, setComp] = useState({
        show:false
    })
    useEffect(() => {
        
        getQuotes();
    }, [])
    const getQuotes = async() =>{

        const url = "https://type.fit/api/quotes";
        const response = await fetch(url);
        const data = await response.json();
        setquotes(data[0])
        }
        // adding items to wishlist
        const id  = useParams();
        // const wishlistOpen =(id) =>{
          const   rendercom =() =>{
                setComp({
                    show : !comp.show
                })
          }
        const { userData, setUserData } = useContext(UserContext);
        const renderReviews = () => {
            const reviews  = props.bookReview;
        }


        return (
             <Wrapper>
                 <div className = "bookdetailHeader">

                     {comp.show ? <CustomWishlist />:null}
                    <div className = "searchbar">
                        <Searchbar />
                    </div>
                 </div>
                 <div className = "categoryList">
                     </div>
                 {/* <Link to  ={'/bookdetails/' + props.name}> */}
                   <h1 className = "bookHeadingWrap"> {props.name} </h1>
                  <section className = "row">
                      <div className = "col-sm-5 col-xs-5 col-lg-5 left-subSection">
                             <div><Bookimg src ={props.url}></Bookimg></div>
                             
                      </div>
                      <div className = "col-sm-7 col-xs-7 col-lg-7 right-subSection">
                          <Book><span className = "bookHeading">Title:</span>{props.name}</Book>
                          <Book ><span className = "bookHeading">Author: </span>{props.author}</Book> 
                          <Book><span className = "bookHeading">Rating</span>{props.rating} {props.Likes}</Book>
                            <Book><span className = "bookHeading">No.of pages</span>{props.pagecount}</Book>
                            <Book><span className = "bookHeading">Genre:</span>{props.genre} <span className = "bookHeading"> ISBN: </span>{props.ISBN}</Book>
                            <div className=" bookHeading">
                                    <span>Description</span>
                                    <Book className = "description">{props.description}</Book>
                            </div>

                            <div className ="productFeedback bookHeading">
                                <div className= "userrating"> Rate this book
                                            <span><i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                            </span>
                                 </div>

                                <div className= ""> 
                                    <span className ="booklist addwishlist" ><i class="fa fa-shopping-cart" aria-hidden="true"><span class="fa-text">Buy Book</span></i> 
                                    </span>
                                    <span className =" addwishlist" onClick={() => rendercom()} ><i class="fa fa-heart" aria-hidden="true"><span class="fa-text">Add To Wishlist</span></i> 
                                    </span>
                                </div>
                            </div>
                      </div>
                  </section>

                <div className = "row ">
                    <div className = "col-lg-12 line-divide">
                        <div className = "col-lg-5 col-md-5 col-sm-5 float-left">                     
                           <div className = "reviewsWrap">
                                Reviews

                            <div className ="review">
                                <div className = "reviewWrapper">
                                 </div>
                                 { props.bookReview && props.bookReview.map((review,index) =>(
                                        <><Review  comment = {review.comment} user = {review.userID} votes = {review.votes}/></>        
                             ))}
                          
                                 {userData.user ? ( <Comments  callReviewFunction = {props.callReviewFunction}/>) :(<></>)}
                            </div>    
                            </div>
                        </div>
                        <div className = "col-lg-2 col-md-2 col-sm-2 col-md-offset-2 float-left">
                        </div>
                        <div className = "col-lg-5 col-md-5 col-sm-5 float-left">                     
                           <div className = "api-call">
                                Quote of the day
                           {!userData.user ? (

                                    <div className = "quotes">
                                            <img src = "https://inspirationfeed.com/wp-content/uploads/2015/04/blurred-background.jpg">
                                            </img>
                                            <div className = "lock">
                                               <div> <i class="fa fa-lock" aria-hidden="true"></i></div>
                                                <span>Login to view the Quote of the Day</span>
                                            </div>
                                    </div>
                                    ):(<>
                                            <div>
                                                <div className ="quote">
                                                {quotes.text}
                                                </div>
                                                <div className = "quoteAuthor">
                                               - {quotes.author}
                                                </div>
                                          </div>                                
                                    </>)}
                            </div>
                        </div>
                    </div>
                  </div>
            </Wrapper>
        )
    }
