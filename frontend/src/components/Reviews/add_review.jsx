import React, { useState, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
const AddReviews = ({getAllReviews,allReviews}) => {
    const { user, token } = useContext(AuthContext);
    const [AddReview,setAddReview]=useState([])
    const [addRating,setAddRating]=useState(0)
    async function makeReview(form){
    try{
        let results= await axios.post(`http://127.0.0.1:5000/api/user_reviews`,form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getAllReviews()}
        
    catch (ex) {
      console.log("error in put");
    }
    }
    function handleSubmit(){
        console.log(user.id)
        let form={
            review_text:AddReview,
            rating:addRating,
            user_name:user.username
            // customer_id:+user.id
        }
        makeReview(form)
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <label>Rating</label>
            <input type="integer" value={addRating} onChange={(event)=>setAddRating(event.target.value)} />
            <input type="text" value={AddReview} onChange={(event)=>setAddReview(event.target.value)}/>
            <button type='submit' className="btn btn-primary">Add Review</button>
        </form>
    );
}
 
export default AddReviews;