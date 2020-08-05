import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/usercontext';
import RecommdList from './RecommdList'
import { Book } from '../bookPage';

import {Bar} from 'react-chartjs-2';



export default function RecommendationList() {





    const [chartState, setchartState] =useState()


    const [reviewState, setreviewState] =useState()


    const [legends, setlegends] =useState()


    const [recommendisbns, setrecommendisbns] =useState([])


    const [recommendDetailsState, setrecommendDetailsState] =useState([])


    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid

    useEffect(() => {

       const  ISBN_arr = []
        if (loggedINUser){
              console.log(loggedINUser)
        const shelfDetails = {"userid":loggedINUser}
        var raw = JSON.stringify(shelfDetails);

            var requestOptions = {
            method: 'POST',
            headers : {
                "Content-type": "application/json"
            },
            body: raw,
            redirect: 'follow'
            };

            fetch("http://localhost:5000/user/library/cart", requestOptions)
            .then(response => response.json())
            // ((data) => {
            .then((result) =>{
                // console.log("xcvvvcv",result)
                result  && result.userShelf && result.userShelf.forEach((result, index) =>{
        
                    ISBN_arr.push(result.ISBN)
                })

             setrecommendisbns(ISBN_arr)    
            
            })
            .catch(error => console.log('error', error));
        }

       
        },[])

    useEffect(() => {
        
       
        if (recommendisbns.length > 1){
            const  recommendDetails = []
            const labels = []
            const rating = []
            const reviewcount = []
            const lengeds= []
            // console.log("im asasa",recommendisbns)

        const isbns = recommendisbns

        // console.log(isbns)
        var requestOptions = {
            method: 'POST',
            headers : {
                "Content-type": "application/json"
            },
            body: JSON.stringify({"ISBN":isbns,"count":6}),
            redirect: 'follow'
            };
            fetch("http://localhost:5000/getRecommendation", requestOptions)
            .then(response => response.json())
            .then(result => {
                        //  console.log("ok im recommended",result)
                        result &&  result.result  &&  result.result.forEach((result,index) =>{
                            
                            recommendDetails.push(result[0])

                            labels.push(index)
                            lengeds.push((index, result[0].title))
                            rating.push(result[0].rating)
                            reviewcount.push(result[0].reviewcounts)

                           
                        })
                        const obj = {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Rating of the Books',
                                    backgroundColor: '#cadd94',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 0,
                                    data: rating
                                }
                            ],
       
                        }


                        const ratingcountsobj = {
                            labels: labels,
                            datasets: [
                                {
                                    label: 'Total Reviews',
                                    backgroundColor: '#59aeac',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 0,
                                    data: reviewcount
                                }
                            ],
       
                        }
                    setlegends(lengeds)
                    setrecommendDetailsState(recommendDetails)
                    recommendDetailsState &&  setreviewState(ratingcountsobj)
                      recommendDetailsState &&  setchartState(obj)

                      
                        console.log("dsds ",labels)
                })
            .catch(error => console.log('error', error));
          
        }        
         },[recommendisbns])  
         recommendDetailsState &&  console.log(recommendDetailsState)
    return (
        <div class = "row">  
        <div className =" col-xs-12 col-lg-4 col-md-4 col-sm-4">
                  <div className = "common-marginborder  chartheight library goalset">     
                  <div className = "libraryHeader">Recommended Books Based ON your Reads </div>
                  
                {recommendDetailsState && recommendDetailsState.map((book,index)=>(

                    <RecommdList  author = {book.author} title = { book.title} rating = {book.rating} genre = {book.genre} isbn = {book.ISBN}/>
                  ))}
                

                    </div>
                   
               </div>

               <div className ="col-xs-12 col-lg-8 col-md-8 col-sm-8">

                   <div className = " row   chartheight common-marginborder library goalset">

                       <div className = "col-xs-12 col-lg-6 col-md-6 col-sm-6">
                         <Bar 
                                data={chartState}
                                options = {{
                                    

                                    maintainAspectRatio: false,
                                    legend: {
                                        display: true,
                                        labels: {
                                            fontColor: 'rgb(255, 99, 132)'
                                        }
                                        },
                                    scales: {
                                        // xAxes: [{
                                        //     ticks: {
                                        //         display: false //this will remove only the label
                                        //     }
                                        // }],
                                        yAxes: [{
                                            ticks: {
                                                max: 5,
                                                min: 1,
                                                stepSize: 0.5
                                            }
                                        }]
                                    }
                                }}
                            />
                        </div>

                        <div className = "col-xs-12 col-lg-6 col-md-6 col-sm-6">
                         <Bar 
                                data={reviewState}
                                options = {{
                                    maintainAspectRatio: false,
                                    scales: {
                                        // xAxes: [{
                                        //     ticks: {
                                        //         display: false //this will remove only the label
                                        //     }
                                        // }],
                                        yAxes: [{
                                            ticks: {

                                                max: 15000,
                                                min: 0,
                                                stepSize: 1000
                                            }
                                        }]
                                    }
                                }}
                            />
                        </div>


                        <div>
                           {legends && legends.map((book,index)=>(

                             <div  className = "legends"> 
                             <span> {index}</span>
                              <span className = "legendDescription">{book}</span></div>
                                ))}
                           </div>
                   </div>
                           
                   
                   </div>
        </div>
    )
}
