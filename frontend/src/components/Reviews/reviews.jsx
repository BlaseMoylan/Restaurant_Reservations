import React, { useState } from 'react';
import axios from 'axios';
import "./reviews.css"
const Reviews = ({allReviews,yourReviews,getAllReviews,deleteYourReview,getYourReviews}) => {
    // function reviews(){
        
    //     console.log(allReviews)
    //   return(
    //     <div>
    //         {allReviews.map((review)=>{
    //             <div>
    //                 <div>{review.user_name}</div>
    //                 <div>{review.review_text}</div>
    //                 <div>{review.rating}</div>

    //             </div>
    //         })}
    //     </div>
    //   ) 
    // }
    // function yourReview(){
    //     // getYourReviews()
    //     console.log(yourReviews)
    //     return (
    //         <div>
    //             {yourReviews.map((yourReview)=>{
    //                 <div>
    //                     <div>{yourReview.user_name}</div>
    //                     <div>{yourReview.review_text}</div>
    //                     <div>{yourReview.rating}</div>
    //                     <div><button onClick={()=>{deleteYourReview(yourReview.id)}}>Remove</button></div>
    //                 </div>
    //             })}
    //         </div>
    //     )
    // }
    return ( 
        <section>
                <div className='head'>See What our Costumers have to say!</div>
            {allReviews.map((review)=>
                <div className='display'>
                    <p className='text'>{review.user_name}</p>
                    <p className='text'>{review.review_text}</p>
                    <p className='text'>{review.rating}</p>

                </div>
            )}
            
            
            {/* {console.log(yourReviews)} */}
            <div className='title'>Your Reviews</div>
            {yourReviews.map((yourReview)=>
                    <div className='display'>
                        
                        {console.log(yourReview)}
                        
                        <p className='text'>{yourReview.user_name}</p>
                        <p className='text'>{yourReview.review_text}</p>
                        <p className='text'>{yourReview.rating}</p>
                        <div><button onClick={()=>{deleteYourReview(yourReview.id)}}>Remove</button></div>
                    </div>
                )}
            
        </section>
    );
}
 
export default Reviews;