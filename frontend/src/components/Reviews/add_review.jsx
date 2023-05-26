import React, { useState, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import "./reviews.css"
const AddReviews = ({getAllReviews,allReviews}) => {
    const { user, token } = useContext(AuthContext);
    const [AddReview,setAddReview]=useState([])
    const [addRating,setAddRating]=useState(0)
    const IP="35.87.21.157"
    async function makeReview(form){
    try{
        let results= await axios.post(`http://${IP}:5000/api/user_reviews`,form,
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
        <form onSubmit={handleSubmit}className='submit'>
            <label className='rate'>Rating</label>
            <input className='inputbox1' type="integer" value={addRating} onChange={(event)=>setAddRating(event.target.value)} />
            <label className='rate'>Write Review</label>
            <input className='inputbox' type="text" value={AddReview} onChange={(event)=>setAddReview(event.target.value)}/>
            <button type='submit' className="btn btn-primary">Add Review</button>
        </form>
    );
}
 
export default AddReviews;