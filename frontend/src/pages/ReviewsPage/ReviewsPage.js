import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AddReviews from '../../components/Reviews/add_review';
const ReviewsPage = (props) => {
    const [allReviews,setAllReviews]=useState([])
    async function getAllReviews(){
        let results=await axios.get(`http://127.0.0.1:5000/api/user_reviews`)
        setAllReviews(results.data)
    }
    return ( 
        <div>
            <AddReviews getAllReviews={getAllReviews} allReviews={allReviews}/>
        </div>
    );
}
 
export default ReviewsPage;