import { useState } from "react";

const add_reservation = ({username, auth}) => {
    // const [addReservation, setAddReservation]=useState([])
    // turn this into a custom useState when there is time
    const [time, setTime]=useState("")
    const [date, setDate]=useState("")
    const [party_count,setPartyCount]=useState("")
    const [table_id,setTableId]=useState("")

    function handleSubmit(event){
        event.preventDefault();
        let reservationForm={
            time:time,
            date:date,
            party_count:party_count,
            table_id:table_id
        }
        addReservation(reservationForm)
    }

    async function addReservation(form){
        try{
            let results= await axios.put(`http://127.0.0.1:5000/api/user_reservations`,form,{
                headers: {
                    Authorization: auth,
                },
            })
        }catch(ex){
            console.log('error in put')
        }
    }

    return (  
        <div></div>
    );
}
 
export default add_reservation;