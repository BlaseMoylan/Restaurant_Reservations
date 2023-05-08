import React, { useEffect,useState,useContext } from 'react';
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
const UserReservations = ({waitList,reservations,getReservations,getWaitList,usedTables,allTables,getAllTables,getUsedTables}) => {
    // const [allReservations , setAllReservations]=useState([])
    // need to pass this down through props for both add resrvation and user reservations
    // useEffect(() => {
    //     getReservations()
    // }, []);

    // async function getReservations(){
    //     let results= await axios.get(`http://127.0.0.1:5000/api/all_reservations`)
    //     setAllReservations(results.data)
        
    // }
    const { user, token } = useContext(AuthContext);
    // const [usedTables,setUsedTables]=useState([])
    // async function getUsedTables(){
    //     let results=await axios.get(`http://127.0.0.1:5000/api/used_tables`)
    //     setUsedTables(results.data)
    // }
    useEffect(() => {
        getUsedTables()
        addReservationFromWaitList()
        getWaitList()
        getReservations()
      }, []);
    async function deleteWaitList(pk){
        let results= await axios.delete(`http://127.0.0.1:5000/api/delete_wait_list_tabel/${pk}`)
        // getWaitList()
      }
    async function deleteUsedTable(pk){
        let results= await axios.delete(`http://127.0.0.1:5000/api/delete_used_tables/${pk}`)
        getUsedTables()
        
    }
    async function deleteReservation(pk){
    let results= await axios.delete(`http://127.0.0.1:5000/api/user_delete_reservation/${pk}`,
    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      getReservations()
    }
    async function addReservation(form) {
        try {
          let results = await axios.post(`http://127.0.0.1:5000/api/user_reservations`,form,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          getReservations()
        } catch (ex) {
          console.log("error in put");
        }
      }
      async function postUsedTable(form) {
        let results = await axios.post(
          `http://127.0.0.1:5000/api/used_tables`,
          form
        );
        getUsedTables()
      }

    function addReservationFromWaitList(){
    
        console.log("fired")
        waitList.map((item)=>{{
          let rightSize = allTables.filter((el)=>{
            if(item.table_size == el.party_size){
              return true
            }
          })
          console.log("Right Size", rightSize)
          let notAvaiable = usedTables.filter((el)=> el.date==item.date &&el.time ==item.time).map((el)=>el.table_id)
          console.log("Not available", notAvaiable)
          let avaialble = rightSize.filter((el)=> {
            if(notAvaiable.includes(el.id)){
              return false
            }
            else{
              return true
            }
          })
          console.log(avaialble)
          if((avaialble.length>0)&&(user.id==item.costumer_id)){
            let form = {
              time: item.time,
              date: item.date,
              table_id:avaialble[0].id,
            };
            let data={
                time:item.time,
                date:item.date,
                party_count:item.table_size,
                costumer_id:item.costumer_id,
                table_id:avaialble[0].id
            }
            addReservation(data)
            postUsedTable(form);
            console.log(item.id)
            deleteWaitList(item.id)
          }
        }})
      }
    function deleteLogic(info){
        usedTables.map((item)=>{
            if((item.table_id==info.table_id)&&(item.date==info.date)&&(item.time==info.time)){
                console.log(item.id)
                deleteUsedTable(item.id)
                deleteReservation(info.id)
                getWaitList()
                getUsedTables()
                addReservationFromWaitList()
            }
        })
    }
    function userReservations(){
        return (  
            <table className='Table'>
                <thead>
                    <tr className='titles'>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Table Size</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((res,index)=>{
                        
                        if(user.id==res.costumer_id){
                            return(
                                <tr className='data'>
                                    <td>{res.date}</td>
                                    <td>{res.time}</td>
                                    <td>{res.party_count}</td>
                                    <td><button className="delete" onClick={()=>deleteLogic(res)}>Cancel</button></td>
                                </tr>
                            )
                        }
                        
                    })}
                </tbody>

            </table>
        );
    }
    function waitListPositions(){

        return (  
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Table Size</th>
                        <th>Positioning</th>
                    </tr>
                </thead>
                <tbody>
                    {waitList.map((res,index)=>{
                        let position=1
                        if(user.id==res.costumer_id){

                            return(
                                <tr>
                                    <td>{res.date}</td>
                                    <td>{res.time}</td>
                                    <td>{res.table_size}</td>
                                    <td>{position}</td>
                                </tr>
                            )
                        }
                        else{
                            position++
                        }
                        
                    })}
                </tbody>

            </table>
        );
    }
    if(waitList||reservations){
        return (  
            <div>
                <div>{userReservations()}</div>
                <div>{waitListPositions()}</div>
            </div>
            
        );
    }
    else{
        return (  
            <div>
                <div>{userReservations()}</div>
                <div>{waitListPositions()}</div>
            </div>
            
        );
    }
    
}
 
export default UserReservations;