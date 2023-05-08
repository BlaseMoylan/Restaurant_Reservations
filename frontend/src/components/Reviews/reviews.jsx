import React, { useState } from 'react';
import axios from 'axios';
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
            
            {allReviews.map((review)=>
                <div>
                    <p>{review.user_name}</p>
                    <p>{review.review_text}</p>
                    <p>{review.rating}</p>

                </div>
            )}
            
            
            {/* {console.log(yourReviews)} */}
            {yourReviews.map((yourReview)=>
                    <div>
                        
                        {console.log(yourReview)}
                        <p>{yourReview.user_name}</p>
                        <p>{yourReview.review_text}</p>
                        <p>{yourReview.rating}</p>
                        <div><button onClick={()=>{deleteYourReview(yourReview.id)}}>Remove</button></div>
                    </div>
                )}
            
        </section>
    );
}
 
export default Reviews;