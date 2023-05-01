import React, { useState } from 'react';
import axios from 'axios';
const UserReservations = ({username, auth}) => {
    const [allReservations , setAllReservations]=useState([])

    async function getReservations(){
        let results= await axios.get(`http://127.0.0.1:5000/api/all_tables`)
        setAllTables(results.data)
    }

    return (  
        <div></div>
    );
}
 
export default UserReservations;