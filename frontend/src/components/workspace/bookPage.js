import React, {useEffect, useState , useContext } from 'react'
import ReactStars from "react-rating-stars-component";
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Comments from './comments.js'
import Searchbar from './searchbar'
import Quotes from './Quotes'
import CustomWishlist from '../workspace/customWishlist'
import Wishlist from '../workspace/Dashboard/wishlist'
import '../../Styling.css'
import Review from './Review'
import UserContext from '../../context/usercontext'
import { useParams} from 'react-router-dom'
// import WishList from './Dashboard/wishlist.js'
import RecommededBooks from './RecommededBooks'
import listContext from '../../context/list_context';



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

    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid
    const reviewmade   = props.loggedInuser
    const [quotes, setquotes]  = useState([]);
    const [comp, setComp] = useState({show:false})
    const [purchase, setPurchase] = useState({purchased:false});
    const [addedtoWishlist, setaddedtoWishlist] = useState(true);
    const [bookpurchased, setbookpurchased] = useState(true)
    const id  = useParams();

    useEffect(() => {
    const cartDetails = {"userid":loggedINUser,"ISBN":id.id}        
    var raw = JSON.stringify(cartDetails);

        var requestOptions = {
        method: 'POST',
        headers : {
            "Content-type": "application/json"
        },
        body: raw,
        redirect: 'follow'
        };

    fetch("http://localhost:5000/user/library", requestOptions)
            .then(response => {

                if (response.status !== 200){
                  
                    setbookpurchased(false)
                }
                else{
                response.text()}
            }
                )
            .then(result => console.log("hiiiii",result)
            )
            .catch(error => {
                console.log('error', error)
               
            }
           );
    },[])
    useEffect(() => {
          
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [props.ISBN])

    useEffect(() => {
        getQuotes();
    }, [])


        //       ------------- wiishlist--------------//

        const addedtowishlist = () =>{
            setaddedtoWishlist(false)
        }


    const callclosefunction = () =>{



        setCreateList({list:"inactive"})
                }



    const [createList, setCreateList] = useState({list:"inactive"})
    const [bookwishlist, setbookwishlist] = useState(true)
        
    const createWishlist = () =>{
        if (createList.length ===0){
        
        }
        else{
        }
        const myList = {
            list:"",
            items:[[["neel"],["horror"]]]
    }
        setCreateList({list:"active",
            myList});

        return  <h1>hiiiii</h1>
        
    }
    const addingTowishlist = () =>{
        createWishlist()
    }
    const alreadyadded = () =>{
        alert("item already in your shelf")
    }
    const getQuotes = async() =>{

            const url = "https://type.fit/api/quotes";
            const response = await fetch(url);
            const data = await response.json();
            setquotes(data[0])
            }
            const   rendercom =() =>{
                    setComp({
                        show : !comp.show
                    })
            }

            const buybooknotlogged =() =>{
                alert("you need to login")
            }
            const postRating = (x) =>{

            const ratingDetails = {
                "bookid":id.id,
                "userid": loggedINUser,
                "rating": x     
            }
                var requestOptions = {
                method: 'POST',
                headers : {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(ratingDetails),
                redirect: 'follow'
                };

                    fetch("http://localhost:5000/book/rating", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));

            }
            const buybook  = () =>{


                setbookpurchased(false)

                const cartDetails = {"userid":loggedINUser,"ISBN":id.id}        
                var raw = JSON.stringify(cartDetails);

                    var requestOptions = {
                    method: 'POST',
                    headers : {
                        "Content-type": "application/json"
                    },
                    body: raw,
                    redirect: 'follow'
                    };

                    fetch("http://localhost:5000/user/library", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    
                    .catch(error => console.log('error', error));
            }
            const ratingChanged = (newRating) => {
    
                const ratingDetails = {
                    "bookid":id.id,
                    "userid": loggedINUser,
                    "rating": newRating     
            }
                var requestOptions = {
                method: 'POST',
                headers : {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(ratingDetails),
                redirect: 'follow'
                };
    
                    fetch("http://localhost:5000/book/rating", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                
            };
            
        return (
             <Wrapper>
                 <div className = "categoryList">
                     </div>
                   <h1 className = "bookHeadingWrap"> {props.name} </h1>
                  <section className = "row">
                      <div className = "col-sm-5 col-xs-5 col-lg-5 left-subSection">
                             <div><Bookimg className = "bookimg" src ={props.url}></Bookimg></div>
                             
                      </div>
                      <div className = "col-sm-7 col-xs-7 col-lg-7 right-subSection">
                          <Book><span className = "bookHeading">Title:</span><span className = "bookDescprops">{props.name}</span></Book>
                          <Book ><span className = "bookHeading">Author: </span><span className = "bookDescprops"> {props.author} </span></Book> 
                          <Book><span className = "bookHeading">Rating: </span> <span className = "bookDescprops">{props.rating}  {props.Likes} </span></Book>
                            <Book><span className = "bookHeading">No.of pages: </span> <span className = "bookDescprops">{props.pagecount}</span></Book>
                            <Book><span className = "bookHeading">Genre:</span>{props.genre}<span className = "bookDescprops bookHeading d-none d-sm-block">ISBN: {props.ISBN}</span></Book>
                            <div className=" bookHeading">
                                    <span>Description</span>
                                    <Book className = "description">{props.description}</Book>
                            </div>

                            <div className ="productFeedback bookHeading">

                            {userData.user ?(

                                <div className= "userrating"> Rate this book

                                            <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700"
                                            />
                                 </div> ):null}

                                <div className= ""> 
                                {!userData.user ?  
                                
                                <span className ="booklist addwishlist"  onClick ={()=>buybooknotlogged()} ><i className="fa fa-shopping-cart" aria-hidden="true"><span className="fa-text">Buy Book</span></i></span>    
                                
                                : 
                                    <> 
                                        {bookpurchased ?
                                              <span className ="booklist addwishlist" onClick ={()=>buybook()} ><i className="fa fa-shopping-cart" aria-hidden="true"><span className="fa-text">Buy Book</span></i> </span>
                                        :  
                                        <span className ="booklist addwishlist" onClick ={()=>alreadyadded()}  ><i className="fa fa-shopping-cart" aria-hidden="true"><span className="fa-text">In Shelf</span></i> </span>     
                                        }
                                    </>
                                  }
                                  {/* ---------------------------------------book purchase ends --------------------------- */}
                                 
                                  {!userData.user ?  

                                   <span className =" addwishlist" onClick={() => buybooknotlogged()} ><i className="fa fa-heart" aria-hidden="true"><span className="fa-text">Add To Wishlist</span></i>   </span>
                                   : 
                                   <>

                                    {bookwishlist ?    
                                        <span className =" addwishlist" onClick={() =>addingTowishlist()} ><i className="fa fa-heart" aria-hidden="true"><span className="fa-text">Add To Wishlist</span></i>  </span>
                                  
                                        :    <span className =" addwishlist" onClick ={()=>alreadyadded()} ><i className="fa  fa-heart" aria-hidden="true"><span className="fa-text">Added</span></i>  </span> }
                                  </>                 
                                }
                                </div>

                                { createList.list ==="active" ?   <> <CustomWishlist   name = {props.name}  close  = {()=>callclosefunction} ISBN = {id.id} genre = {props.genre} />  </>: null }                          
                            </div>
                      </div>
                  </section>

                <div className = "row ">
                    <div className = "col-lg-12 line-divide ">
                        <div className = "col-lg-5 col-md-5 col-sm-5 float-left">                     
                           <div className = "reviewsWrap">
                                Reviews

                            <div className ="review">
                                <div className = "reviewWrapper">
                                 </div>
                                 { props.bookReview && props.bookReview.map((review,index) =>(
                                        <><Review  key ={"bookPage"+index}  callreviewDeleteFunction = { props.callreviewDeleteFunction} calldownFunction = {props.calldownFunction} callupFunction = {props.callupFunction}  user = {review.user} firstname  = {review.firstname}  comment = {review.comment} reviewid = {review.reviewid} userid= {review.userid} votes = {review.votes}/></>        
                                         ))  

                                }        
                            </div> 
                            {userData.user ? ( <Comments  userid =  {loggedINUser} callReviewFunction = {props.callReviewFunction}/>) :(<></>)}   
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
                                               <div> <i className="fa fa-lock" aria-hidden="true"></i></div>
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

                  <div className = "clearfix">
                                        <RecommededBooks  bookName = {props.name}  ISBN = {props.ISBN} />
                  </div>
            
            </Wrapper>
        )
    }
