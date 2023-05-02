import React, { useEffect,useState } from 'react';
import axios from 'axios';
const UserReservations = ({user, auth}) => {
    const [allReservations , setAllReservations]=useState([])
    // need to pass this down through props for both add resrvation and user reservations
    useEffect(() => {
        getReservations()
    }, []);

    async function getReservations(){
        let results= await axios.get(`http://127.0.0.1:5000/api/all_reservations`)
        setAllReservations(results.data)
        
    }
    
    function userReservations(){
        return (  
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Table Size</th>
                    </tr>
                </thead>
                <tbody>
                    {allReservations.map((res,index)=>{
                        if(user.id==res.costumer_id){
                            return(
                                <tr>
                                    <td>{res.date}</td>
                                    <td>{res.time}</td>
                                    <td>{res.party_count}</td>
                                </tr>
                            )
                        }
                        
                    })}
                </tbody>

            </table>
        );
    }
    return (  
        <div>{userReservations()}</div>
    );
}
 
export default UserReservations;