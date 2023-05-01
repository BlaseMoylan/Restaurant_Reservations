import { useState } from "react";
import axios from 'axios';
const AddReservation = ({user, auth}) => {
    // const [addReservation, setAddReservation]=useState([])
    // turn this into a custom useState when there is time
    const [time, setTime]= useState("")
    const [date, setDate]= useState("")
    const [table_size,setTableSize]= useState("")
    const [tableId,setTableId]= useState(0)

    function handleSubmit(event){
        event.preventDefault();
        getAllTables()
        let reservationForm={
            time:time,
            date:date,
            party_count:table_size,
            costumer_id:user.id,
            table_id:tableId
        }
        console.log(reservationForm)
        addReservation(reservationForm)
    }

    async function addReservation(form){
        try{
            let results= await axios.post(`http://127.0.0.1:5000/api/user_reservations`,form,{
                headers: {
                    Authorization: auth,
                },
            })
        }catch(ex){
            console.log('error in put')
        }
    }

    async function getAllTables(){
        let results= await axios.get(`http://127.0.0.1:5000/api/all_tables`)
        let tables=results.data
        console.log(tables)
        // get this on the backend side connected to an end point
        let id=0
        let Id=tables.filter((item)=>{
            if(item.is_reserved==false && item.party_size==table_size){
                item.is_reserved=true
                
                id=item.id
                return true
            }
        })
        console.log("it is here")
        console.log(id)
        id=setTableId(id)
        console.log(tableId)
    }

    return (  
        <form onSubmit={handleSubmit}>
            <div>
                <label>Time</label>
                <input type="time" value={time} onChange={(event)=>setTime(event.target.value)}/>
            </div>
            <div>
                <label>Date</label>
                <input type="date" value={date} onChange={(event)=>setDate(event.target.value)}/>
            </div>
            <div>
                <label>Table Size</label>
                <input type="integer" value={table_size} onChange={(event)=>setTableSize(event.target.value)}/>
            </div>
            <div>
            <button type="submit" className="btn btn-primary "  >Make Reservation</button>
            </div>
        </form>
    );
}
 
export default AddReservation;