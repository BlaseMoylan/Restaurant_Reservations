import React, { useEffect, useState , useContext} from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AuthContext from "../../context/AuthContext";
import AddReviews from '../../components/Reviews/add_review';
import Reviews from '../../components/Reviews/reviews';
const ReviewsPage = (props) => {
    const { user, token } = useContext(AuthContext);
    const [allReviews,setAllReviews]=useState([])
    const [yourReviews,setYourReviews]=useState([])
    const IP="35.87.21.157"
    async function getAllReviews(){
        let results=await axios.get(`http://${IP}:8000/api/all_reviews`)
        setAllReviews(results.data)
    }
    async function getYourReviews(){
        let results= await axios.get(`http://${IP}:8000/api/user_reviews`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })  
        setYourReviews(results.data)
    }

    async function deleteYourReview(pk){
        let results= await axios.delete(`http://${IP}:8000/api/user_delete_reviews/${pk}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            }
        })
        getYourReviews()
        getAllReviews()
    }
    useEffect(()=>{
        getAllReviews();
        getYourReviews();
    },[]);
    if(allReviews||yourReviews){return ( 
        <div>
            <Reviews getAllReviews={getAllReviews} deleteYourReview={deleteYourReview} getYourReviews={getYourReviews} yourReviews={yourReviews} allReviews={allReviews}/>
            <AddReviews getAllReviews={getAllReviews} allReviews={allReviews}/>
        </div>
    );}
    else{return ( 
        <div>
            <Reviews getAllReviews={getAllReviews} deleteYourReview={deleteYourReview} getYourReviews={getYourReviews} yourReviews={yourReviews} allReviews={allReviews}/>
            <AddReviews getAllReviews={getAllReviews} allReviews={allReviews}/>
        </div>
    );}
    
}
 
export default ReviewsPage;